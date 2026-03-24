#!/usr/bin/env node
/**
 * generate-index.js
 * Generates a JSON index of all prompts in the repository.
 *
 * Output: prompt-index.json (root directory)
 *
 * Usage: node scripts/generate-index.js
 */

const fs = require('fs');
const path = require('path');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');
const OUTPUT_FILE = path.join(__dirname, '..', 'prompt-index.json');

function getPromptFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getPromptFiles(fullPath));
    } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)/);
    if (kv) {
      let value = kv[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
      } else if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      fields[kv[1]] = value;
    }
  }
  return fields;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractDescription(content) {
  const match = content.match(/^>\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

// Main
const files = getPromptFiles(PROMPTS_DIR);
const index = {
  generated: new Date().toISOString(),
  totalPrompts: files.length,
  prompts: [],
};

for (const filePath of files) {
  const relPath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(content);
  const title = extractTitle(content);
  const description = extractDescription(content);

  index.prompts.push({
    id: fm?.id || null,
    title,
    description,
    path: relPath,
    category: fm?.category || null,
    complexity: fm?.complexity || null,
    tags: fm?.tags || [],
    dependsOn: fm?.['depends-on'] || [],
    overlayCompatible: fm?.['overlay-compatible'] ?? false,
    version: fm?.version || null,
  });
}

// Sort by path for stable output
index.prompts.sort((a, b) => a.path.localeCompare(b.path));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2) + '\n');
console.log(`✅ Generated ${OUTPUT_FILE}`);
console.log(`   ${index.totalPrompts} prompts indexed.`);
