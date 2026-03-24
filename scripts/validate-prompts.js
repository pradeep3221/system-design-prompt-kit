#!/usr/bin/env node
/**
 * validate-prompts.js
 * Validates all prompt files in the repository against the prompt standard.
 *
 * Checks:
 * 1. YAML frontmatter presence and required fields
 * 2. Required sections (Metadata, Context, Prompt, Variables, Example Output, Composition)
 * 3. ID uniqueness across all prompts
 * 4. depends-on references point to existing IDs
 *
 * Usage: node scripts/validate-prompts.js
 */

const fs = require('fs');
const path = require('path');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');

const REQUIRED_FRONTMATTER = ['id', 'version', 'category', 'complexity', 'tags'];
const VALID_COMPLEXITIES = ['basic', 'intermediate', 'advanced'];
const REQUIRED_SECTIONS = ['## Metadata', '## Prompt'];
const RECOMMENDED_SECTIONS = ['## Context', '## Variables', '## Example Output', '## Composition'];

let errors = 0;
let warnings = 0;
const allIds = new Map(); // id -> filePath

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
      }
      fields[kv[1]] = value;
    }
  }
  return fields;
}

function validateFile(filePath) {
  const relPath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileErrors = [];
  const fileWarnings = [];

  // Check frontmatter
  const fm = parseFrontmatter(content);
  if (!fm) {
    fileErrors.push('Missing YAML frontmatter');
  } else {
    for (const field of REQUIRED_FRONTMATTER) {
      if (!fm[field]) {
        fileErrors.push(`Missing required frontmatter field: ${field}`);
      }
    }
    if (fm.complexity && !VALID_COMPLEXITIES.includes(fm.complexity)) {
      fileErrors.push(`Invalid complexity "${fm.complexity}" (must be: ${VALID_COMPLEXITIES.join(', ')})`);
    }
    if (fm.id) {
      if (allIds.has(fm.id)) {
        fileErrors.push(`Duplicate ID "${fm.id}" (also in ${allIds.get(fm.id)})`);
      } else {
        allIds.set(fm.id, relPath);
      }
    }
  }

  // Check required sections
  for (const section of REQUIRED_SECTIONS) {
    if (!content.includes(section)) {
      fileErrors.push(`Missing required section: ${section}`);
    }
  }

  // Check recommended sections
  for (const section of RECOMMENDED_SECTIONS) {
    if (!content.includes(section)) {
      fileWarnings.push(`Missing recommended section: ${section}`);
    }
  }

  if (fileErrors.length > 0) {
    console.log(`\n❌ ${relPath}`);
    for (const e of fileErrors) {
      console.log(`   ERROR: ${e}`);
      errors++;
    }
  }
  if (fileWarnings.length > 0) {
    if (fileErrors.length === 0) console.log(`\n⚠️  ${relPath}`);
    for (const w of fileWarnings) {
      console.log(`   WARN:  ${w}`);
      warnings++;
    }
  }
  if (fileErrors.length === 0 && fileWarnings.length === 0) {
    console.log(`✅ ${relPath}`);
  }
}

function validateCrossReferences() {
  // Second pass: check depends-on references
  for (const filePath of getPromptFiles(PROMPTS_DIR)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = parseFrontmatter(content);
    if (!fm) continue;

    const depsMatch = content.match(/depends-on:\s*\[([^\]]*)\]/);
    if (depsMatch && depsMatch[1].trim()) {
      const deps = depsMatch[1].split(',').map(d => d.trim().replace(/"/g, ''));
      for (const dep of deps) {
        if (dep && !allIds.has(dep)) {
          const relPath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
          console.log(`\n❌ ${relPath}`);
          console.log(`   ERROR: depends-on references unknown ID "${dep}"`);
          errors++;
        }
      }
    }
  }
}

// Main
console.log('🔍 Validating prompt files...\n');

const files = getPromptFiles(PROMPTS_DIR);
console.log(`Found ${files.length} prompt files.\n`);

for (const file of files) {
  validateFile(file);
}

console.log('\n🔗 Checking cross-references...');
validateCrossReferences();

console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${files.length} files, ${errors} errors, ${warnings} warnings`);

if (errors > 0) {
  console.log('\n❌ Validation FAILED');
  process.exit(1);
} else {
  console.log('\n✅ Validation PASSED');
  process.exit(0);
}
