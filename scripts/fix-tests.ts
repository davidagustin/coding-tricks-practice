#!/usr/bin/env npx ts-node

/**
 * Auto-fix broken tests using Claude API
 *
 * This script:
 * 1. Reads test output to find failing tests
 * 2. Identifies the relevant problem files
 * 3. Uses Claude to analyze and fix issues
 * 4. Writes fixes back to the files
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const client = new Anthropic();

interface FailingTest {
  testFile: string;
  testName: string;
  error: string;
  problemFile?: string;
}

async function parseTestOutput(): Promise<FailingTest[]> {
  const testOutputPath = path.join(process.cwd(), 'test-output.txt');

  if (!fs.existsSync(testOutputPath)) {
    console.log('No test-output.txt found, running tests...');
    const { execSync } = require('child_process');
    try {
      execSync('npm test 2>&1 | tee test-output.txt', { stdio: 'pipe' });
    } catch {
      // Tests failed, which is expected
    }
  }

  const output = fs.readFileSync(testOutputPath, 'utf-8');
  const failingTests: FailingTest[] = [];

  // Parse Jest output for failing tests
  const failRegex = /FAIL\s+(.+\.tsx?)/g;
  const testNameRegex = /✕\s+(.+?)(?:\s+\(\d+\s*ms\))?$/gm;
  const errorRegex = /●\s+(.+?)\n\n([\s\S]+?)(?=\n\n\s*●|\n\n\s*Test Suites:)/g;

  let match;
  while ((match = failRegex.exec(output)) !== null) {
    const testFile = match[1];

    // Find test names in this file's output
    const fileSection = output.substring(match.index);
    let nameMatch;
    while ((nameMatch = testNameRegex.exec(fileSection)) !== null) {
      if (nameMatch.index > 2000) break; // Only look within reasonable distance

      failingTests.push({
        testFile,
        testName: nameMatch[1].trim(),
        error: '',
      });
    }
  }

  // Parse error details
  while ((match = errorRegex.exec(output)) !== null) {
    const testName = match[1].trim();
    const error = match[2].trim();

    const existing = failingTests.find(t => testName.includes(t.testName));
    if (existing) {
      existing.error = error;
    }
  }

  // Map to problem files if applicable
  for (const test of failingTests) {
    const problemMatch = test.testName.match(/Problem:\s*([a-z-]+)/i) ||
                         test.error.match(/problems\/([a-z-]+)\.ts/i);
    if (problemMatch) {
      test.problemFile = `lib/problems/${problemMatch[1]}.ts`;
    }
  }

  return failingTests;
}

async function fixProblemFile(problemPath: string, error: string): Promise<boolean> {
  const fullPath = path.join(process.cwd(), problemPath);

  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${problemPath}`);
    return false;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');

  console.log(`\nAnalyzing ${problemPath} with Claude...`);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [
      {
        role: 'user',
        content: `You are fixing a coding problem file for a JavaScript/TypeScript practice app.

The file has a failing test. Analyze the issue and provide ONLY the fixed file content.

## File Path
${problemPath}

## Current File Content
\`\`\`typescript
${fileContent}
\`\`\`

## Test Error
\`\`\`
${error}
\`\`\`

## Instructions
1. Analyze why the test is failing
2. Fix the solution and/or testCases to make the test pass
3. Make sure the solution properly implements what the starterCode asks for
4. Ensure testCases have valid input/expectedOutput that match the solution

Return ONLY the complete fixed TypeScript file content, nothing else. No markdown code blocks, no explanations - just the raw file content.`
      }
    ]
  });

  const fixedContent = (response.content[0] as { type: string; text: string }).text.trim();

  // Basic validation - check it looks like valid TypeScript
  if (!fixedContent.includes('export const problem') && !fixedContent.includes('export interface Problem')) {
    console.log('Claude response does not look like valid problem file, skipping');
    return false;
  }

  // Write the fixed content
  fs.writeFileSync(fullPath, fixedContent);
  console.log(`Fixed: ${problemPath}`);

  return true;
}

async function fixTestFile(testPath: string, failingTests: FailingTest[]): Promise<boolean> {
  const fullPath = path.join(process.cwd(), testPath);

  if (!fs.existsSync(fullPath)) {
    console.log(`Test file not found: ${testPath}`);
    return false;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const errors = failingTests
    .filter(t => t.testFile.includes(path.basename(testPath)))
    .map(t => `Test: ${t.testName}\nError: ${t.error}`)
    .join('\n\n');

  if (!errors) return false;

  console.log(`\nAnalyzing test file ${testPath} with Claude...`);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [
      {
        role: 'user',
        content: `You are fixing a test file for a JavaScript/TypeScript practice app.

Some tests are failing. Analyze and fix the test file.

## File Path
${testPath}

## Current File Content
\`\`\`typescript
${fileContent}
\`\`\`

## Failing Tests
${errors}

## Instructions
1. Analyze why tests are failing
2. Fix the test assertions or test logic
3. Keep tests meaningful - don't just make them pass trivially

Return ONLY the complete fixed TypeScript file content, nothing else. No markdown code blocks, no explanations.`
      }
    ]
  });

  const fixedContent = (response.content[0] as { type: string; text: string }).text.trim();

  if (!fixedContent.includes('test(') && !fixedContent.includes('it(') && !fixedContent.includes('describe(')) {
    console.log('Claude response does not look like valid test file, skipping');
    return false;
  }

  fs.writeFileSync(fullPath, fixedContent);
  console.log(`Fixed: ${testPath}`);

  return true;
}

async function main() {
  console.log('🔍 Parsing test output...\n');

  const failingTests = await parseTestOutput();

  if (failingTests.length === 0) {
    console.log('✅ No failing tests found!');
    return;
  }

  console.log(`Found ${failingTests.length} failing test(s):\n`);
  for (const test of failingTests) {
    console.log(`  - ${test.testName}`);
    if (test.problemFile) {
      console.log(`    Problem file: ${test.problemFile}`);
    }
  }

  // Group by problem file
  const problemFiles = new Set(
    failingTests
      .filter(t => t.problemFile)
      .map(t => t.problemFile!)
  );

  // Group by test file
  const testFiles = new Set(
    failingTests.map(t => t.testFile)
  );

  let fixedCount = 0;

  // Fix problem files first
  for (const problemFile of problemFiles) {
    const relatedErrors = failingTests
      .filter(t => t.problemFile === problemFile)
      .map(t => t.error)
      .join('\n\n');

    try {
      const fixed = await fixProblemFile(problemFile, relatedErrors);
      if (fixed) fixedCount++;
    } catch (error) {
      console.error(`Error fixing ${problemFile}:`, error);
    }
  }

  // Fix test files if problem files didn't resolve the issue
  for (const testFile of testFiles) {
    const testsInFile = failingTests.filter(t => t.testFile === testFile);
    const hasProblemFile = testsInFile.some(t => t.problemFile);

    // Only fix test file if it's not related to a problem file
    if (!hasProblemFile) {
      try {
        const fixed = await fixTestFile(testFile, testsInFile);
        if (fixed) fixedCount++;
      } catch (error) {
        console.error(`Error fixing ${testFile}:`, error);
      }
    }
  }

  console.log(`\n✨ Fixed ${fixedCount} file(s)`);
}

main().catch(console.error);
