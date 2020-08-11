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
  B,
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

export interface CoreState {
  pipelineState:  'fetch' | 'decode' | 'execute' | 'memory-access' | 'write-back';
  programCounter: number;
  fetchedInstruction: number;
  decodedInstruction?: DecodedInstruction;
  ALUResult: number;
  memoryAccessResult: number;
  registers: number[];

}

export class ProtoCore {
  public  memoryController: MemoryController;
  private pc: number;
  private registers: number[] = new Array(32).fill(0);

  instruction: number;
  private decodedInstruction?: DecodedInstruction;
  private executionResult: number;
  private memoryAccessResult: number;

  private state: 'fetch' | 'decode' | 'execute' | 'memory-access' | 'write-back';

  constructor() {
    this.memoryController = new MemoryController(protoMemoryLayout);
    this.pc = 0;
    this.state = 'fetch';
  }

  loadProgram(programBuffer: ArrayBuffer): void {
    const dv = new DataView(programBuffer);

    this.memoryController.writeWord(0x00, 0);
    this.memoryController.writeWord(0x04, 10);

    for (let address = 0; address < programBuffer.byteLength; address++) {
      const byte = dv.getUint8(address);
      this.memoryController.writeByte(address + 8, byte);
    }

    this.pc = 8;
  }

  getState(): CoreState {
    return {
      pipelineState:  this.state,
      programCounter: this.pc,
      fetchedInstruction: this.instruction,
      decodedInstruction: this.decodedInstruction,
      ALUResult: this.executionResult,
      memoryAccessResult: this.memoryAccessResult,
      registers: this.registers
    };
  }

  tick(): void {

    switch (this.state) {
      case 'fetch':
        this.fetch();
        this.state = 'decode';
        break;
      case 'decode':
        this.decode();
        this.state = 'execute';
        break;
      case 'execute':
        this.execute();
        this.state = 'memory-access';
        break;
      case 'memory-access':
        this.accessMemory();
        this.state = 'write-back';
        break;
      case 'write-back':
        this.writeRegisters();
        this.state = 'fetch';

        this.instruction = 0;
        this.decodedInstruction = undefined;
        this.executionResult = 0;
        this.memoryAccessResult = 0;
        this.pc += 4;
        break;
      default:
        throw new Error('Invalid state');
    }

  }

  fetch(): void {
    this.instruction = this.memoryController.readWord(this.pc);
  }

  decode(): void {
    const instruction = this.instruction;

    // 0x7F
    // 0111 1111
    const opcode = instruction & 0x7F;
    const funct3 = (instruction >>> 12) & 0x7;

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
          r1 === 0 ? 0 : this.registers[r1],
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
          r1 === 0 ? 0 : this.registers[r1],
          r2 === 0 ? 0 : this.registers[r2],
          immediate
        );
        break;
      case 0b0110011:
        decoded = new DecodedInstruction(
          InstructionFormat.R,
          (funct7 << 10) | (funct3 << 7) | opcode,
          rd,
          r1 === 0 ? 0 : this.registers[r1],
          r2 === 0 ? 0 : this.registers[r2],
          0
        );
        break;
      default:
        throw Error('Opcode not recognized!');
    }

    this.decodedInstruction = decoded;
  }

  execute(): void {
    const instruction = this.decodedInstruction!;

    switch (instruction.fullOpcode) {
      case 0b0100100011: // sw
      case 0b0010011: // addi
      case 0b0100000011: // lw
        this.executionResult = instruction.firstRegisterValue + instruction.immediate;
        break;
      case 0b0110011: // add
        this.executionResult = instruction.firstRegisterValue + instruction.secondRegisterValue;
        break;
      default:
        throw new Error('unknown instruction');
    }

  }

  accessMemory(): void {
    const opcode = this.decodedInstruction!.fullOpcode & 0x3f;
    // If no memory operation is needed then forward the value in execution along
    if (opcode !== 0b0000011 && opcode !== 0b0100011) {
      this.memoryAccessResult = this.executionResult;
      return;
    }

    const address = this.executionResult;
    switch (this.decodedInstruction!.fullOpcode) {
      case 0b0100000011:
        // execution result will be a memory address
        this.memoryAccessResult = this.memoryController.readWord(address);
        break;
      case 0b0100100011:
        this.memoryController.writeWord(address, this.decodedInstruction!.secondRegisterValue);
        break;
      default:
        throw new Error('Opcode not supported');
    }
  }

  writeRegisters(): void {
    // These formats don't modify registers
    if (this.decodedInstruction!.instructionFormat === InstructionFormat.S ||
        this.decodedInstruction!.instructionFormat === InstructionFormat.B) {
      return;
    }

    // this could be either a true value from memory or the result of an operation which was forwarded
    // along the pipeline for simplicity
    this.registers[this.decodedInstruction!.destinationRegisterIndex] = this.memoryAccessResult;
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

/**
 * Pipeline examples Notes
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
