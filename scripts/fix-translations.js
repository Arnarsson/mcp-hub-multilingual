#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

// Replace the entire inline translations object with a minimal fallback
const startPattern = 'const fallbackTranslations = {';
const endPattern = '        };';

const startIndex = content.indexOf(startPattern);
if (startIndex === -1) {
    console.error('❌ Could not find translations start');
    process.exit(1);
}

// Find the end of the translations object (line with just "        };")
const lines = content.split('\n');
let endLineIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(startPattern)) {
        // Found start, now look for the end
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].trim() === '};' && lines[j].startsWith('        ')) {
                endLineIndex = j;
                break;
            }
        }
        break;
    }
}

if (endLineIndex === -1) {
    console.error('❌ Could not find translations end');
    process.exit(1);
}

// Create the replacement content
const replacement = `        const fallbackTranslations = {
            da: { siteName: "MCP Hub", loading: "Indlæser..." },
            en: { siteName: "MCP Hub", loading: "Loading..." },
            de: { siteName: "MCP Hub", loading: "Laden..." },
            es: { siteName: "MCP Hub", loading: "Cargando..." }
        };`;

// Split content and replace
const beforeLines = lines.slice(0, lines.findIndex(line => line.includes(startPattern)));
const afterLines = lines.slice(endLineIndex + 1);

const newContent = [...beforeLines, replacement, ...afterLines].join('\n');

fs.writeFileSync(htmlPath, newContent);
console.log('✅ Fixed duplicate translations declaration');
console.log(`📊 Removed ${endLineIndex - beforeLines.length} lines of duplicate translation data`);