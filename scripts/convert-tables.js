#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * Convert HTML tables to Docusaurus-compatible markdown tables
 */
class TableConverter {
    constructor() {
        this.patterns = {
            // Match HTML table elements
            htmlTable: /<table[^>]*>[\s\S]*?<\/table>/gi,
            // Match broken markdown tables with extra long separators
            brokenTable: /\|\s*[-=]{10,}\s*\|/g,
            // Match table rows that span multiple lines incorrectly
            multiLineRow: /\|[^|\n]*\n[^|\n]*\|/g
        };
    }

    /**
     * Convert HTML table to markdown
     */
    htmlToMarkdown(htmlTable) {
        const dom = new JSDOM(htmlTable);
        const table = dom.window.document.querySelector('table');
        
        if (!table) return htmlTable;

        const rows = Array.from(table.querySelectorAll('tr'));
        if (rows.length === 0) return htmlTable;

        let markdown = '';
        let isFirstRow = true;

        rows.forEach((row, index) => {
            const cells = Array.from(row.querySelectorAll('td, th'));
            const rowData = cells.map(cell => {
                // Clean up cell content
                return cell.textContent
                    .trim()
                    .replace(/\n/g, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\|/g, '\\|'); // Escape pipes in content
            });

            // Add table row
            markdown += '| ' + rowData.join(' | ') + ' |\n';

            // Add separator after first row (headers)
            if (isFirstRow && cells.length > 0) {
                const separator = '| ' + Array(cells.length).fill('-----').join(' | ') + ' |';
                markdown += separator + '\n';
                isFirstRow = false;
            }
        });

        return markdown;
    }

    /**
     * Fix broken markdown table separators
     */
    fixTableSeparators(content) {
        // Replace long separator lines with standard markdown separators
        return content.replace(/\|\s*[-=]{3,}\s*\|/g, (match) => {
            const pipes = (match.match(/\|/g) || []).length;
            if (pipes >= 2) {
                const cells = pipes - 1;
                return '| ' + Array(cells).fill('-----').join(' | ') + ' |';
            }
            return match;
        });
    }

    /**
     * Fix multi-line table rows
     */
    fixMultiLineRows(content) {
        const lines = content.split('\n');
        const fixedLines = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            
            // Check if this is a table row that might be broken across lines
            if (line.includes('|') && !line.trim().startsWith('#')) {
                let fullRow = line;
                let j = i + 1;

                // Look for continuation lines
                while (j < lines.length && 
                       !lines[j].includes('|') && 
                       lines[j].trim() !== '' &&
                       !lines[j].trim().startsWith('#') &&
                       !lines[j].trim().startsWith('**')) {
                    fullRow += ' ' + lines[j].trim();
                    j++;
                }

                // If we found continuation lines, merge them
                if (j > i + 1) {
                    fixedLines.push(fullRow);
                    i = j;
                } else {
                    fixedLines.push(line);
                    i++;
                }
            } else {
                fixedLines.push(line);
                i++;
            }
        }

        return fixedLines.join('\n');
    }

    /**
     * Ensure proper table structure
     */
    validateTableStructure(content) {
        const lines = content.split('\n');
        const fixedLines = [];
        let inTable = false;
        let expectedColumns = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('|') && line.trim() !== '') {
                const columns = (line.match(/\|/g) || []).length - 1;
                
                if (!inTable) {
                    // Starting a new table
                    inTable = true;
                    expectedColumns = columns;
                    fixedLines.push(line);
                    
                    // Check if next line is a separator
                    if (i + 1 < lines.length && lines[i + 1].includes('-')) {
                        fixedLines.push(lines[i + 1]);
                        i++; // Skip the separator line
                    } else {
                        // Add separator
                        const separator = '| ' + Array(expectedColumns).fill('-----').join(' | ') + ' |';
                        fixedLines.push(separator);
                    }
                } else {
                    // Continuing table - ensure column count matches
                    if (columns === expectedColumns) {
                        fixedLines.push(line);
                    } else {
                        // Try to fix column count
                        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
                        while (cells.length < expectedColumns) {
                            cells.push('');
                        }
                        cells.length = expectedColumns; // Truncate if too many
                        fixedLines.push('| ' + cells.join(' | ') + ' |');
                    }
                }
            } else {
                // Not a table line
                if (inTable && line.trim() === '') {
                    // End of table
                    inTable = false;
                    expectedColumns = 0;
                }
                fixedLines.push(line);
            }
        }

        return fixedLines.join('\n');
    }

    /**
     * Process a single file
     */
    processFile(filePath) {
        console.log(`Processing: ${filePath}`);
        
        try {
            let content = fs.readFileSync(filePath, 'utf-8');
            let modified = false;

            // Convert HTML tables to markdown
            const htmlMatches = content.match(this.patterns.htmlTable);
            if (htmlMatches) {
                htmlMatches.forEach(htmlTable => {
                    const markdownTable = this.htmlToMarkdown(htmlTable);
                    if (markdownTable !== htmlTable) {
                        content = content.replace(htmlTable, markdownTable);
                        modified = true;
                        console.log(`  ✓ Converted HTML table to markdown`);
                    }
                });
            }

            // Fix broken table separators
            const originalContent = content;
            content = this.fixTableSeparators(content);
            if (content !== originalContent) {
                modified = true;
                console.log(`  ✓ Fixed table separators`);
            }

            // Fix multi-line rows
            const beforeMultiLine = content;
            content = this.fixMultiLineRows(content);
            if (content !== beforeMultiLine) {
                modified = true;
                console.log(`  ✓ Fixed multi-line table rows`);
            }

            // Validate and fix table structure
            const beforeValidation = content;
            content = this.validateTableStructure(content);
            if (content !== beforeValidation) {
                modified = true;
                console.log(`  ✓ Fixed table structure`);
            }

            // Write back if modified
            if (modified) {
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`  ✅ File updated successfully`);
            } else {
                console.log(`  ⏭️  No changes needed`);
            }

            return modified;
        } catch (error) {
            console.error(`  ❌ Error processing file: ${error.message}`);
            return false;
        }
    }

    /**
     * Process all markdown files in a directory
     */
    processDirectory(dirPath, recursive = true) {
        const files = fs.readdirSync(dirPath);
        let totalModified = 0;

        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && recursive) {
                totalModified += this.processDirectory(fullPath, recursive);
            } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
                if (this.processFile(fullPath)) {
                    totalModified++;
                }
            }
        });

        return totalModified;
    }
}

// CLI usage
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
Usage: node convert-tables.js <path> [options]

Options:
  --no-recursive    Process only files in the specified directory (not subdirectories)
  --backup         Create backup files before modifying

Examples:
  node convert-tables.js docs/
  node convert-tables.js docs/cloudnative-pg.v1.mdx
  node convert-tables.js docs/ --backup
        `);
        process.exit(1);
    }

    const targetPath = args[0];
    const options = {
        recursive: !args.includes('--no-recursive'),
        backup: args.includes('--backup')
    };

    if (!fs.existsSync(targetPath)) {
        console.error(`❌ Path does not exist: ${targetPath}`);
        process.exit(1);
    }

    const converter = new TableConverter();
    const stat = fs.statSync(targetPath);

    console.log('🔄 Starting table conversion...\n');

    if (stat.isFile()) {
        // Create backup if requested
        if (options.backup) {
            const backupPath = targetPath + '.backup';
            fs.copyFileSync(targetPath, backupPath);
            console.log(`📋 Backup created: ${backupPath}\n`);
        }
        
        const modified = converter.processFile(targetPath);
        console.log(`\n✨ Conversion complete. ${modified ? '1 file' : 'No files'} modified.`);
    } else if (stat.isDirectory()) {
        const totalModified = converter.processDirectory(targetPath, options.recursive);
        console.log(`\n✨ Conversion complete. ${totalModified} files modified.`);
    }
}

if (require.main === module) {
    main();
}

module.exports = TableConverter;
