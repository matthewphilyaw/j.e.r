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



try {
  const programBuffer = fs.readFileSync(programFile);
  const ctx = assemble(programBuffer, 2 ** 6);

  const cpu = new ProtoCore();

  cpu.loadProgram(ctx.programMemoryBuffer);
  cpu.memoryController.dumpMemories(4);

  function executeFullStage(): void {
    cpu.tick();
    cpu.tick();
    cpu.tick();
    cpu.tick();
    cpu.tick();
    cpu.getState();

    console.log(cpu.memoryController.getRegionDump('ram'));
  }

  while (true) {
    executeFullStage();
  }

} catch (e) {
  console.log('Failed:', e.message);
}
