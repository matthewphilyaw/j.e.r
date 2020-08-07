import * as fs from 'fs';
import { assemble } from './risc-v/assembler/assembler';
import { ProtoCore } from './risc-v/cpu-cores/proto-core';

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

const cpu = new ProtoCore();

cpu.loadProgram(ctx.programMemoryBuffer);
cpu.dumpMemories();

cpu.tick();
cpu.tick();
cpu.tick();
cpu.tick();
cpu.tick();
