const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Function to convert HTML tables to MDX tables
function convertHtmlTableToMdx(htmlTable) {
  // Extract table headers
  const headerMatch = htmlTable.match(/<thead><tr><th[^>]*>([^<]+)<\/th><th>([^<]+)<\/th><\/tr><\/thead>/);
  if (!headerMatch) return htmlTable;
  
  const [, fieldHeader, descriptionHeader] = headerMatch;
  
  // Extract table rows
  const rowMatches = htmlTable.match(/<tr><td>([^<]+)<br\/>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g);
  if (!rowMatches) return htmlTable;
  
  let mdxTable = `| ${fieldHeader} | ${descriptionHeader} |\n|-------|-------------|\n`;
  
  rowMatches.forEach(row => {
    const match = row.match(/<tr><td>([^<]+)<br\/>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/);
    if (match) {
      const [, field, type, description] = match;
      mdxTable += `| \`${field}\` [Required]<br/>${type} | ${description} |\n`;
    }
  });
  
  return mdxTable;
}

// Function to fix broken Google search links
function fixBrokenLinks(content) {
  // Fix Google search links to proper anchor links
  content = content.replace(
    /`\{https:\/\/www\.google\.com\/search\?q=%23([^}]+)\}`/g,
    '## $1'
  );
  
  // Fix other broken links
  content = content.replace(
    /<a href="https:\/\/www\.google\.com\/search\?q=%23([^"]+)"><i>([^<]+)<\/i><\/a>/g,
    '[$2](#$1)'
  );
  
  return content;
}

// Function to remove HTML tags but preserve content
function cleanHtmlTags(content) {
  // Remove <p> tags but preserve content
  content = content.replace(/<p>([^<]*(?:<[^>]+>[^<]*)*)<\/p>/g, '$1');
  
  // Remove <B> tags
  content = content.replace(/<B>([^<]*)<\/B>/g, '$1');
  
  // Remove <i> tags but preserve content
  content = content.replace(/<i>([^<]*)<\/i>/g, '$1');
  
  // Remove <code> tags but preserve content
  content = content.replace(/<code>([^<]*)<\/code>/g, '`$1`');
  
  // Remove <a> tags but preserve href as markdown links
  content = content.replace(/<a href="([^"]+)">([^<]*)<\/a>/g, '[$2]($1)');
  
  return content;
}

// Function to convert HTML tables to MDX tables
function convertTables(content) {
  // Find HTML tables and convert them
  const tableRegex = /<table class="table">\s*<thead><tr><th[^>]*>Field<\/th><th>Description<\/th><\/tr><\/thead>\s*<tbody>([\s\S]*?)<\/tbody>\s*<\/table>/g;
  
  content = content.replace(tableRegex, (match, tbody) => {
    let mdxTable = '| Field | Description |\n|-------|-------------|\n';
    
    // Extract rows from tbody
    const rowRegex = /<tr><td>([^<]+)<br\/>([^<]+)<\/td><td>([^<]*(?:<[^>]+>[^<]*)*)<\/td><\/tr>/g;
    let rowMatch;
    
    while ((rowMatch = rowRegex.exec(tbody)) !== null) {
      const [, field, type, description] = rowMatch;
      const cleanDescription = cleanHtmlTags(description);
      mdxTable += `| \`${field}\` [Required]<br/>${type} | ${cleanDescription} |\n`;
    }
    
    return mdxTable;
  });
  
  return content;
}

// Function to fix section headers
function fixHeaders(content) {
  // Convert broken section headers
  content = content.replace(
    /^([A-Za-z]+) `\{https:\/\/www\.google\.com\/search\?q=%23([^}]+)\}`/gm,
    '## $1'
  );
  
  content = content.replace(
    /^([A-Za-z]+) \{https:\/\/www\.google\.com\/search\?q=%23([^}]+)\}/gm,
    '## $1'
  );
  
  return content;
}

// Main function to process a file
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Apply fixes
    content = fixBrokenLinks(content);
    content = cleanHtmlTags(content);
    content = convertTables(content);
    content = fixHeaders(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

// Main execution
async function main() {
  const mdxFiles = await glob('docs/**/*.mdx');
  
  console.log(`Found ${mdxFiles.length} MDX files to process`);
  
  mdxFiles.forEach(processFile);
  
  console.log('MDX processing complete!');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  processFile,
  convertHtmlTableToMdx,
  fixBrokenLinks,
  cleanHtmlTags,
  convertTables,
  fixHeaders
};
