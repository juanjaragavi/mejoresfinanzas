#!/bin/bash

# Script to identify files with potential YAML frontmatter encoding issues
echo "Scanning for files with potential encoding issues..."

# Counter for problematic files
count=0

# Check all MDX files in financial-solutions
for file in src/content/financial-solutions/*.mdx; do
    if [[ -f "$file" ]]; then
        # Extract just the YAML frontmatter (between the first two --- lines)
        yaml_content=$(sed -n '/^---$/,/^---$/p' "$file" | head -n -1 | tail -n +2)

        # Check if the YAML contains corrupted characters
        if echo "$yaml_content" | grep -q 'ó\*\*\|é\*\*\|á\*\*\|í\*\*\|ú\*\*'; then
            echo "ENCODING ISSUE: $file"
            ((count++))
        fi
    fi
done

echo "Total files with potential encoding issues: $count"
