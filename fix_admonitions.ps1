# PowerShell script to fix admonition syntax in markdown files
# Converts !!! syntax to ::: syntax for Docusaurus compatibility

$docsPath = "docs"
$files = Get-ChildItem -Path $docsPath -Recurse -Filter "*.md"

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Fix admonition syntax
    $content = $content -replace '!!!\s+Note\s*\n\s*', ':::note' + "`n"
    $content = $content -replace '!!!\s+Warning\s*\n\s*', ':::warning' + "`n"
    $content = $content -replace '!!!\s+Important\s*\n\s*', ':::important' + "`n"
    $content = $content -replace '!!!\s+Info\s*\n\s*', ':::info' + "`n"
    $content = $content -replace '!!!\s+IMPORTANT\s*\n\s*', ':::important' + "`n"
    $content = $content -replace '!!!\s+WARNING\s*\n\s*', ':::warning' + "`n"
    $content = $content -replace '!!!\s+INFO\s*\n\s*', ':::info' + "`n"
    $content = $content -replace '!!!\s+NOTE\s*\n\s*', ':::note' + "`n"
    
    # Fix Seealso admonitions
    $content = $content -replace '!!!\s+Seealso\s+"([^"]+)"\s*\n\s*', ':::info "$1"' + "`n"
    $content = $content -replace '!!!\s+Seealso\s+([^\n]+)\s*\n\s*', ':::info "$1"' + "`n"
    
    # Fix Recommendation admonitions
    $content = $content -replace '!!!\s+Recommendation\s*\n\s*', ':::tip' + "`n"
    
    # Fix any remaining !!! patterns
    $content = $content -replace '!!!\s+([A-Za-z]+)\s*\n\s*', ':::info' + "`n"
    
    # Fix indentation - remove leading spaces from admonition content
    $content = $content -replace '(:::.*\n)(\s{4,})', '$1'
    
    # Add closing ::: for admonitions that don't have them
    $content = $content -replace '(:::.*\n)((?!:::).*\n)*?(?=\n|$)', '$1$2:::' + "`n"
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    
    Write-Host "Fixed admonitions in: $($file.Name)"
}

Write-Host "Admonition syntax fix completed!"
