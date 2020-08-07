import {MemoryController, MemoryRegion} from './peripherals/memory';

const protoMemoryLayout: MemoryRegion[] = [
  {
    regionName: 'program',
    startAddress: 0x0,
    lengthInBytes: 128,
    accessWidthInBytes: 1,
    clockCyclesForWrite: 4,
    clockCyclesForRead: 4,
    readonly: false
  },
  {
    regionName: 'ram',
    startAddress: 0x80,
    lengthInBytes: 64,
    accessWidthInBytes: 1,
    clockCyclesForWrite: 1,
    clockCyclesForRead: 1,
    readonly: false
  }
];

enum InstructionFormat {
  R,
  I,
  S,
  SB,
  U,
  J
}

class DecodedInstruction {
  constructor(
    public instructionFormat: InstructionFormat,
    public fullOpcode: number, // combines opcode, func3 and func7 for  easy comparison
    public destinationRegisterIndex: number,
    public firstRegisterValue: number,
    public secondRegisterValue: number,
    public immediate: number
  ) {}
}

class ExecutionResult {
  OperationType: string;
}

class MemoryAccessResult {
}

export class ProtoCore {
  private memoryController: MemoryController;
  private pc: number;
  private registers: number[] = new Array(32).fill(0);

  constructor() {
    this.memoryController = new MemoryController(protoMemoryLayout);
    this.pc = 0;
    console.log(this.registers);
  }

  tick(): void {
    /**
     * Pipeline examples
     *
     *   1 2 3 4 5 6 7 8 9 A B C D E F G
     *   F D X M M W
     *     F D X - M M W
     *       F D - X - M M W
     *         F - D - X - M M W
     *           - F - D - X - M M W
     *               - F - D - x - M M W
     *                   - F - D - X - M M W
     *                       - F - D - X - M W
     *                           - F - D - X M W
     *                               - F - D X M W
     *                                   - F D X M W
     *                                       F D X M W
     *
     *   1 2 3 4 5 6 7 8
     *   | | | | | | | |
     *   F D X M W                   - NOP
     *     F D X M W                 - NOP
     *       F D X M M W             - LW
     *         F D X - M W           - ADD
     *           F D - X M W         - ADD
     *             F - D X M W       - ADD
     *               - F D X M W     - ADD
     *
     *
     *   1 2 3 4 5 6 7 8
     *   | | | | | | | |
     *   F D X M W                               - NOP
     *     F D X M M W                           - LW
     *       F D X - M M W                       - LW
     *         F D - X - M M W                   - LW
     *           F - D - X - M M W               - LW
     *             - F - D - X - M M W           - LW
     *                   - F - D - X - M M W     - LW
     *
     *
     *
     * DONE every tick to simulate pipeline
     *
     * const fr = fetch.tick(this.pc);
     *
     * if (decode.stalled) {
     *   fetch.stall(); // will produce the same result next tick - effectively persisting to next tick
     *                  // and PC will not be incremented.
     * }
     *
     * const dr = decode.tick(fr); // if stalled nothing is done with fr
     *
     * if (execute.stalled) {
     *   decode.stall();
     * }
     *
     * const er = execute.tick(dr);
     *
     * if (mem.stalled) { // should stall on second tick for mem not first
     *  execute.stall();
     * }
     *
     * const mr = mem.tick(er);
     *
     * if (wb.stalled) {
     *  mem.stall();
     * }
     *
     * mb.tick(mr);
     *
     */

    // Stage 1
    const [instruction, cycleCount] = this.fetch(this.pc);
    console.log(instruction.toString(2).padStart(32, '0'));
    console.log('memory cycles:', cycleCount);

    // Stage 2
    const decoded = this.decode(instruction);
    console.log(decoded);
    /*
    // Stage 3
    const exResult = this.execute(decoded);

    // Stage 4
    const memResult = this.accessMemory(exResult);

    // Stage 5
    this.writeRegisters(memResult);
     */

    this.pc += 4;
  }

  fetch(address: number): [number, number] {
    return this.memoryController.readWord(address);
  }

  decode(instruction: number): DecodedInstruction {
    // 0x7F
    // 0111 1111
    const opcode = instruction & 0x7F;
    const funct3 = (instruction >>> 12) & 0x7;

    console.log(opcode.toString(2));

    // the patterns below may not be correct for all opcodes

    const funct7 = (instruction >>> 25) & 0x7F;
    const rd = (instruction >>> 7) & 0x1f;
    const r1 = (instruction >>> 15) & 0x1f;
    const r2 = (instruction >>> 20) & 0x1f;

    let decoded = null;
    let immediate = 0;
    switch (opcode) {
      case 0b0010011:
      case 0b0000011:
        immediate = (instruction >>> 20) & 0xfff;
        decoded = new DecodedInstruction(
          InstructionFormat.I,
          (funct3 << 7) | opcode,
          rd,
          this.registers[r1],
          0,
          immediate
        );
        break;
      case 0b0100011:
        immediate = (funct7 << 5) | rd;
        decoded = new DecodedInstruction(
          InstructionFormat.S,
          (funct3 << 7) | opcode,
          0,
          this.registers[r1],
          0,
          immediate
        );
        break;
      case 0b0110011:
        decoded = new DecodedInstruction(
          InstructionFormat.R,
          (funct7 << 10) | (funct3 << 7) | opcode,
          rd,
          this.registers[r1],
          this.registers[r2],
          0
        );
        break;
      default:
        throw Error('Opcode not recognized!');
    }

    return decoded;
  }

  execute(_instruction: DecodedInstruction): ExecutionResult {
    throw new Error('Not implemented');
  }

  accessMemory(_exResult: ExecutionResult): MemoryAccessResult {
    throw new Error('Not implemented');
  }

  writeRegisters(_memoryAccessResult: MemoryAccessResult): void {
    throw new Error('Not implemented');
  }

  loadProgram(programBuffer: ArrayBuffer): void {
    const dv = new DataView(programBuffer);

    for (let address = 0; address < programBuffer.byteLength; address++) {
      const byte = dv.getUint8(address);
      this.memoryController.writeByte(address, byte);
    }
  }

  dumpMemories(): void {
    this.memoryController.dumpMemories(4);
  }
}

/*

|- IF
|  - 1 cycle
|  - 2 cycle
|

- ID
- EX
- ME
- WB

*/