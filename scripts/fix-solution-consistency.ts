import * as fs from 'fs';
import * as path from 'path';

interface Inconsistency {
  problemId: string;
  problemTitle: string;
  issues: string[];
}

// Read inconsistencies
const inconsistenciesPath = path.join(__dirname, 'inconsistencies.json');
const inconsistencies: Inconsistency[] = JSON.parse(
  fs.readFileSync(inconsistenciesPath, 'utf-8')
);

console.log(`Found ${inconsistencies.length} problems with inconsistencies\n`);

// Process in batches
const BATCH_SIZE = 25;
const batches: Inconsistency[][] = [];

for (let i = 0; i < inconsistencies.length; i += BATCH_SIZE) {
  batches.push(inconsistencies.slice(i, i + BATCH_SIZE));
}

console.log(`Split into ${batches.length} batches of ~${BATCH_SIZE} problems each\n`);

for (let i = 0; i < batches.length; i++) {
  console.log(`Batch ${i + 1}:`);
  for (const issue of batches[i]) {
    console.log(`  - ${issue.problemId}: ${issue.problemTitle}`);
  }
  console.log();
}

export { batches, inconsistencies };
