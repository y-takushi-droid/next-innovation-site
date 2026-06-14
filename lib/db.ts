import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export function readData<T>(fileName: string): T {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return [] as unknown as T;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

export function writeData<T>(fileName: string, data: T): void {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
