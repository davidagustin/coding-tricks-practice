const fs = require('fs');
const path = require('path');

const problemsDir = path.join(__dirname, '..', 'lib', 'problems');
const files = fs
  .readdirSync(problemsDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort();

// Generate imports
const imports = files
  .map((file) => {
    const problemId = file.replace('.ts', '');
    const varName = problemId.replace(/-/g, '_');
    return `import { problem as ${varName} } from './${problemId}';`;
  })
  .join('\n');

// Generate problems array
const problemIds = files.map((file) => file.replace('.ts', '').replace(/-/g, '_'));
const problemsArray = `export const problems: Problem[] = [\n  ${problemIds.map((id) => `${id}.problem`).join(',\n  ')}\n];`;

// Read interface from first file
const firstFile = fs.readFileSync(path.join(problemsDir, files[0]), 'utf8');
const interfaceMatch = firstFile.match(/export interface Problem \{[\s\S]*?\n\}/);
const interfaceCode = interfaceMatch ? interfaceMatch[0] : '';

// Generate helper functions
const helperFunctions = `export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter((p) => p.category === category);
}

export function getProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return problems.filter((p) => p.difficulty === difficulty);
}`;

// Combine everything
const indexContent = `${interfaceCode}

${imports}

${problemsArray}

${helperFunctions}
`;

fs.writeFileSync(path.join(problemsDir, 'index.ts'), indexContent, 'utf8');
console.log(`Generated index.ts with ${files.length} problems`);
