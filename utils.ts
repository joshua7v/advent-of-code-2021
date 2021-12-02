import fs from 'fs';
import path from 'path';

export function getInput() {
  const text = fs.readFileSync(path.resolve(process.cwd(), 'input.txt'), 'utf8');
  return text.trim().split('\n');
}
