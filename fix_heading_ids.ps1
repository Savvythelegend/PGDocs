# PowerShell script to remove custom heading ID syntax from markdown files
# Removes {#...} patterns from heading lines to make them Docusaurus compatible

$docsPath = "docs"
$files = Get-ChildItem -Path $docsPath -Recurse -Filter "*.md"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Remove custom heading IDs - pattern: {#...} at the end of heading lines
        $content = $content -replace '^(#{1,6}\s+.*?)\s*\{#[^}]*\}\s*$', '$1'
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        
        Write-Host "Fixed heading IDs in: $($file.Name)"
    }
    catch {
        Write-Host "Error processing $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "Heading ID syntax fix completed!"
