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

export class ProtoCore {
  private memoryController: MemoryController;
  /*
  private pc: number
  private registers: DataView;
  */

  constructor() {
    this.memoryController = new MemoryController(protoMemoryLayout);
    /*
    this.pc = 0;
    this.registers = new DataView(new ArrayBuffer(32 * 4));
    */
  }

  tick(): void {
    throw new Error('Not implemented yet');
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