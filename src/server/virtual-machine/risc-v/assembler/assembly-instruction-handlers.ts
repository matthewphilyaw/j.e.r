import * as astat from '../../grammar/assembly-statements';
import * as instrHelpers from '../instructions/risc-v-instruction-helpers';
import {binWord, Chunk} from '../../utils/binary-string-formatter';
import {I_TYPE_PATTERN, R_TYPE_PATTERN} from '../instructions/risc-v-instruction-builders';
import {Token} from 'moo';
import {Offset, PseudoRelocation} from '../../grammar/assembly-statements';
import {REGISTERS} from '../instructions/risc-v-instruction-helpers';

export class AssemblerError {
  constructor(
    public reason: string,
    public formattedInstruction: string,
    public ctx: astat.AssemblyStatement
) {}
}

export class AssemblerResult {
  constructor(
    public encodedInstruction: number,
    public formattedBinary: string,
    public formattedInstruction: string
  ) {}
}

export interface InstructionAssembler {
  (instruction: astat.Instruction): AssemblerResult | AssemblerError;
}

/* eslint-disable */
// @ts-ignore
function printArg(arg: Token | PseudoRelocation | Offset): string {
  if ('line' in arg) {
    return `${arg.type}: ${arg.value}`;
  }
  else if (arg instanceof PseudoRelocation) {
    if (arg.offset) {
      return `${arg.type.value}: ( offset: ${arg.offset}, base: ${arg.base} )`;
    }
    else {
      return `${arg.type.value}: ( base: ${arg.base} )`;
    }
  }
  else if (arg instanceof Offset) {
    return `offset: ( offset: ${arg.offset}, base: ${arg.base} )`;
  }
}

function formatInstruction(instruction: astat.Instruction): string {
  if (!instruction.argTokens) {
    return '';
  }

  const args = instruction.argTokens.map(printArg);

  let argList = '';
  if (args.length > 0) {
    argList = `(${args.join(', ')})`;
  }

  return `opcode: ${instruction.opcodeToken.value} ${argList}`;
}

const instructionAssemblers: Record<string, InstructionAssembler> = {
  'NOP': (instr) => {
    const formattedInstruction = formatInstruction(instr);
    if (instr.argTokens && instr.argTokens.length > 0) {
      return new AssemblerError(
        'NOP should have no parameters',
        formattedInstruction,
        instr
      );
    }

    const word = instrHelpers.ADDI(REGISTERS.zero, REGISTERS.zero, 0);
    const formatted = binWord(word, Chunk.CUSTOM, I_TYPE_PATTERN);

    return new AssemblerResult(word, formatted, formattedInstruction);
  },
  'ADD': (instr) => {
    const formattedInstruction = formatInstruction(instr);
    if (!instr.argTokens || instr.argTokens.length === 0) {
      return new AssemblerError(
        'ADD requires arguments but found none',
         formattedInstruction,
         instr
      );
    }

    const rd = instr.argTokens[0] as Token;
    const rs1 = instr.argTokens[1] as Token;
    const rs2 = instr.argTokens[2] as Token;

    const word = instrHelpers.ADD(rd.value, rs1.value, rs2.value);
    const formatted = binWord(word, Chunk.CUSTOM, R_TYPE_PATTERN);

    return new AssemblerResult(word, formatted, formattedInstruction);
  },
  'ADDI': (instr) => {
    const formattedInstruction = formatInstruction(instr);
    if (!instr.argTokens || instr.argTokens.length === 0) {
      return new AssemblerError(
        'ADDI requires arguments but found none',
        formattedInstruction,
        instr
      );
    }

    const rd = instr.argTokens[0] as Token;
    const rs1 = instr.argTokens[1] as Token;
    const imm = instr.argTokens[2] as Token;

    // TODO: Value on Token should be uknown - the lexer explicitly parses this value as number
    const word = instrHelpers.ADDI(rd.value, rs1.value, (imm.value as unknown) as number);
    const formatted = binWord(word, Chunk.CUSTOM, I_TYPE_PATTERN);

    return new AssemblerResult(word, formatted, formattedInstruction);
  }
};

function getInstructionMetaData(instruction: astat.Instruction): InstructionAssembler | undefined {
  return instructionAssemblers[instruction.opcodeToken.value.toUpperCase()];
}

export function assembleStatement(instruction: astat.Instruction): AssemblerResult | AssemblerError {
  const instrAssembler = getInstructionMetaData(instruction);

  if (!instrAssembler) {
    return new AssemblerError(
      'Instruction not supported',
      formatInstruction(instruction),
      instruction
    );
  }

  return instrAssembler(instruction);
}