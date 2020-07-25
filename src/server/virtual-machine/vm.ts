import * as fs from 'fs';
import { binByte } from './utils/binary-string-formatter';
import { assemble } from './risc-v/assembler/assembler';

if (process.argv.length !== 3) {
  console.log('Please provide path to program file');
  process.exit(1);
}

const programFile = process.argv[2];

if (!fs.existsSync(programFile)) {
  console.log(`Please provide path to program file. ${programFile} is not a valid path`);
}

const programBuffer = fs.readFileSync(programFile);
const ctx = assemble(programBuffer, 2**6);

const columns = 4;

const programMemory = new DataView(ctx.programMemoryBuffer);
for (let i = 0; i < programMemory.byteLength; i+=columns) {

  const columnValues: string[] = [];
  for (let colNum = 0; colNum < columns; colNum++) {
    const offset = i + colNum;
    const byte = programMemory.getUint8(offset);
    columnValues.push(binByte(byte));
  }

  console.log(`0x${i.toString(16).padStart(4, '0')}: ${columnValues.join(' ')}`);
}

