import {
  buildBType,
  buildIType,
  buildJType, buildRType, buildSType,
  buildUType,
} from './risc-v-instruction-builders';

export enum Instruction {
  'LUI' = 0b0110111,
  'AUIPC' = 0b0010111,
  'JAL' = 0b1101111,
  'JALR' = 0b1100111,
  'BEQ' = 0b1100011,
  'BNE' = 0b1100011,
  'BLT' = 0b1100011,
  'BGE' = 0b1100011,
  'BLTU' = 0b1100011,
  'BGEU' = 0b1100011,
  'LB' = 0b0000011,
  'LH' = 0b0000011,
  'LW' = 0b0000011,
  'LBU' = 0b0000011,
  'LHU' = 0b0000011,
  'SB' = 0b0100011,
  'SH' = 0b0100011,
  'SW' = 0b0100011,
  'ADDI' = 0b0010011,
  'SLTI' = 0b0010011,
  'SLTIU' = 0b0010011,
  'XORI' = 0b0010011,
  'ORI' = 0b0010011,
  'ANDI' = 0b0010011,
  'SLLI' = 0b0010011,
  'SRLI' = 0b0010011,
  'SRAI' = 0b0010011,
  'ADD' = 0b0110011,
  'SUB' = 0b0110011,
  'SLL' = 0b0110011,
  'SLT' = 0b0110011,
  'SLTU' = 0b0110011,
  'XOR' = 0b0110011,
  'SRL' = 0b0110011,
  'SRA' = 0b0110011,
  'OR' = 0b0110011,
  'AND' = 0b0110011,
  'FENCE' = 0b0001111,
  'FENCE.I' = 0b0001111,
  'ECALL' = 0b1110011,
  'EBREAK' = 0b1110011,
  'CSRRW' = 0b1110011,
  'CSRRS' = 0b1110011,
  'CSRRC' = 0b1110011,
  'CSRRWI' = 0b1110011,
  'CSRRSI' = 0b1110011,
  'CSRRCI' = 0b1110011,
}

const registerMap: Readonly<Record<string, number>> = {
  'x0': 0,
  'x1': 1,
  'x2': 2,
  'x3': 3,
  'x4': 4,
  'x5': 5,
  'x6': 6,
  'x7': 7,
  'x8': 8,
  'x9': 9,
  'x10': 10,
  'x11': 11,
  'x12': 12,
  'x13': 13,
  'x14': 14,
  'x15': 15,
  'x16': 16,
  'x17': 17,
  'x18': 18,
  'x19': 19,
  'x20': 20,
  'x21': 21,
  'x22': 22,
  'x23': 23,
  'x24': 24,
  'x25': 25,
  'x26': 26,
  'x27': 27,
  'x28': 28,
  'x29': 29,
  'x30': 30,
  'x31': 31,
  'x32': 32,
};

export function validInstruction(instruction: string): boolean {
  const instructionKey = instruction as keyof typeof Instruction;
  return Instruction[instructionKey] !== undefined;
}


export function LUI(rd: string, imm: number): number {
  return buildUType(Instruction.LUI, registerMap[rd], imm);
}

export function AUIPC(rd: string, imm: number): number {
  return buildUType(Instruction.AUIPC, registerMap[rd], imm);
}

export function JAL(rd: string, imm: number): number {
  return buildJType(Instruction.JAL, registerMap[rd], imm);
}

export function JALR(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.JALR, registerMap[rd], registerMap[rs1], imm, 0b000);
}

export function BEQ(rs1: string, rs2: string, imm: number): number {
  return buildBType(Instruction.BEQ, registerMap[rs1], registerMap[rs2], imm, 0b000);
}

export function BNE(rs1: string, rs2: string, imm: number): number {
  return buildBType(Instruction.BNE, registerMap[rs1], registerMap[rs2], imm, 0b001);
}

export function BLT(rs1: string, rs2: string, imm: number): number {
  return buildBType(Instruction.BLT, registerMap[rs1], registerMap[rs2], imm, 0b100);
}

export function BGE(rs1: string, rs2: string, imm: number): number {
  return buildBType(Instruction.BGE, registerMap[rs1], registerMap[rs2], imm, 0b101);
}

export function BLTU(rs1: string, rs2: string, imm: number): number {
  return buildBType(Instruction.BLTU, registerMap[rs1], registerMap[rs2], imm, 0b110);
}

export function BGEU(rs1: string, rs2: string, imm: number): number {
  return buildBType(Instruction.BGEU, registerMap[rs1], registerMap[rs2], imm, 0b111);
}

export function LB(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.LB, registerMap[rd], registerMap[rs1], imm, 0b000);
}

export function LH(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.LH, registerMap[rd], registerMap[rs1], imm, 0b001);
}

export function LW(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.LW, registerMap[rd], registerMap[rs1], imm, 0b010);
}

export function LBU(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.LBU, registerMap[rd], registerMap[rs1], imm, 0b100);
}

export function LHU(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.LHU, registerMap[rd], registerMap[rs1], imm, 0b101);
}

export function SB(rs1: string, rs2: string, imm: number): number {
  return buildSType(Instruction.SB, registerMap[rs1], registerMap[rs2], imm, 0b000);
}

export function SH(rs1: string, rs2: string, imm: number): number {
  return buildSType(Instruction.SH, registerMap[rs1], registerMap[rs2], imm, 0b001);
}

export function SW(rs1: string, rs2: string, imm: number): number {
  return buildSType(Instruction.SW, registerMap[rs1], registerMap[rs2], imm, 0b010);
}

export function ADDI(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.ADDI, registerMap[rd], registerMap[rs1], imm, 0b000);
}

export function SLTI(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.SLTI, registerMap[rd], registerMap[rs1], imm, 0b010);
}

export function SLTIU(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.SLTIU, registerMap[rd], registerMap[rs1], imm, 0b011);
}

export function XORI(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.XORI, registerMap[rd], registerMap[rs1], imm, 0b100);
}

export function ORI(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.ORI, registerMap[rd], registerMap[rs1], imm, 0b110);
}

export function ANDI(rd: string, rs1: string, imm: number): number {
  return buildIType(Instruction.ANDI, registerMap[rd], registerMap[rs1], imm, 0b111);
}

export function SLLI(rd: string, rs1: string, shiftAmount: number): number {
  const imm =  (shiftAmount & 0x1f);
  return buildIType(Instruction.SLLI, registerMap[rd], registerMap[rs1], imm, 0b001);
}

export function SRLI(rd: string, rs1: string, shiftAmount: number): number {
  const imm =  (shiftAmount & 0x1f);
  return buildIType(Instruction.SRLI, registerMap[rd], registerMap[rs1], imm, 0b101);
}

export function SRAI(rd: string, rs1: string, shiftAmount: number): number {
  const imm =  (0x400) | (shiftAmount & 0x1f); // 010000XXXXX where XXXXX is the shift amount
  return buildIType(Instruction.SRAI, registerMap[rd], registerMap[rs1], imm, 0b101);
}

export function ADD(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.ADD, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b000, 0b0000000);
}

export function SUB(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SUB, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b000, 0b0100000);
}

export function SLL(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SLL, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b001, 0b0000000);
}

export function SLT(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SLT, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b010, 0b0000000);
}

export function SLTU(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SLTU, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b011, 0b0000000);
}

export function XOR(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.XOR, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b100, 0b0000000);
}

export function SRL(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SRL, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b101, 0b0000000);
}

export function SRA(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SRA, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b101, 0b0100000);
}

export function OR(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SRA, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b110, 0b0000000);
}

export function AND(rd: string, rs1: string, rs2: string): number {
  return buildRType(Instruction.SRA, registerMap[rd], registerMap[rs1], registerMap[rs2], 0b111, 0b0000000);
}
