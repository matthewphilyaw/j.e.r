import {Grammar, Parser} from 'nearley';
import riscVGrammar from '../../grammar/risc-v-grammar';
import * as fs from 'fs';

import * as instrHelpers from './risc-v-instruction-helpers';
import {binWord, Chunk} from '../../utils/binary-string-formatter';
import {I_TYPE_PATTERN, R_TYPE_PATTERN} from './risc-v-instruction-builders';

if (process.argv.length !== 3) {
  console.log('Please provide path to program file');
  process.exit(1);
}

const programFile = process.argv[2];

if (!fs.existsSync(programFile)) {
  console.log(`Please provide path to program file. ${programFile} is not a valid path`);
}

/* eslint-disable */
// @ts-ignore
function printArg(arg): string {
  switch (arg.type) {
    case 'reloc':
      return `${arg.type}: ( base: ${arg.base} )`;
      break;
    case 'offset':
    case 'reloc-offset':
      return `${arg.type}: ( offset: ${arg.offset}, base: ${arg.base} )`;
      break;
    default:
      return `${arg.type}: ${arg.value}`;
  }
}

/* eslint-disable */
// @ts-ignore
function printInstruction(statement: any): void {
  const opcode = `opcode: ${statement.opcodeToken.value}`;

  /* eslint-disable */
  // @ts-ignore
  const args = statement.argTokens.map(printArg);

  let argList = '';
  if (args.length > 0) {
    argList = `(${args.join(', ')})`;
  }

  console.log(opcode, argList);


  switch (statement.opcodeToken.value.toUpperCase()) {
    case 'ADD': {
      const rd = statement.argTokens[0];
      const rs1 = statement.argTokens[1];
      const rs2 = statement.argTokens[2];

      const word = instrHelpers.ADD(rd.value, rs1.value, rs2.value);
      const formatted = binWord(word, Chunk.CUSTOM, R_TYPE_PATTERN);
      console.log(formatted);

      break;
    }
    case 'ADDI': {
      const rd = statement.argTokens[0];
      const rs1 = statement.argTokens[1];
      const imm = statement.argTokens[2];

      const word = instrHelpers.ADDI(rd.value, rs1.value, imm.value);
      const formatted = binWord(word, Chunk.CUSTOM, I_TYPE_PATTERN);
      console.log(formatted);

      break;
    }
    default:
      console.log(`${statement.opcodeToken} is not supported`);
      break;
  }
}

/* eslint-disable */
// @ts-ignore
function printLabel(statement: any): void {
  const labelName = `label: ${statement.nameToken.value}`;
  console.log(labelName);
}

/* eslint-disable */
// @ts-ignore
function printDirective(statement: any): void {
  const name = `directive: ${statement.nameToken.value}`;
  /* eslint-disable */
  // @ts-ignore
  const args = statement.argTokens.map(at => `${at.type}: ${at.value}`);

  let argList = '';
  if (args.length > 0) {
    argList = `(${args.join(', ')})`;
  }

  console.log(name, argList);
}

function run(): void {
  const parser = new Parser(Grammar.fromCompiled(riscVGrammar));
  const program = fs.readFileSync(programFile);


  try {
    parser.feed(program.toString());
    const parsedProgram = parser.results[0];

    for (const statement of parsedProgram) {
      switch (statement.type.toLowerCase()) {
        case 'instruction':
          printInstruction(statement);
          break;
        case 'label':
          printLabel(statement);
          break;
        case 'directive':
          printDirective(statement);
          break;
        default:
          console.log(`statement type: ${statement.type} is not supported`);
          return;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

run();