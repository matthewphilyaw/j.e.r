import {Grammar, Parser} from 'nearley';
import riscVGrammar from '../../grammar/risc-v-grammar';
import * as fs from 'fs';
import * as astat from '../../grammar/assembly-statements';
import * as ainst from '../assembler/assembly-instruction-handlers';

import {AssemblerError, AssemblerResult} from '../assembler/assembly-instruction-handlers';
import {binWord} from '../../utils/binary-string-formatter';


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
function printLabel(label: astat.Label): void {
  const labelName = `label: ${label.nameToken.value}`;
  console.log(labelName);
}

/* eslint-disable */
// @ts-ignore
function printDirective(directive: astat.Directive): void {
  const name = `directive: ${directive.nameToken.value}`;
  /* eslint-disable */
  // @ts-ignore
  const args = directive.argTokens.map(at => `${at.type}: ${at.value}`);

  let argList = '';
  if (args.length > 0) {
    argList = `(${args.join(', ')})`;
  }

  console.log(name, argList);
}

function run(): void {
  const parser = new Parser(Grammar.fromCompiled(riscVGrammar));
  const program = fs.readFileSync(programFile);


  const buffer = new ArrayBuffer(2**8);
  const programMemory = new DataView(buffer);

  let pc = 0;
  try {
    parser.feed(program.toString());
    const parsedProgram = parser.results[0] as astat.AssemblyStatement[];

    for (const statement of parsedProgram) {
      if (statement instanceof astat.Instruction) {
        const assembled = ainst.assembleStatement(statement);

        if (assembled instanceof AssemblerError) {
          console.log(assembled);
        }
        else if (assembled instanceof AssemblerResult) {
          console.log(assembled.formattedInstruction);
          console.log('\t', assembled.formattedBinary)

          programMemory.setUint32(pc, assembled.encodedInstruction, true);
          pc += 4;
        }
        else {
          throw new Error('Invalid state.');
        }
      }
      else if (statement instanceof astat.Label) {
        printLabel(statement);
      }
      else if (statement instanceof astat.Directive) {
        printDirective(statement);
      }
      else {
        console.log(`statement type: ${typeof statement} is not supported`);
      }
    }
  } catch (err) {
    console.log(err);
  }

  console.log('program:')
  for (let i = 0; i < programMemory.byteLength; i+=4) {
    console.log(`0x${i.toString(16).padStart(4, '0')}:`, binWord(programMemory.getUint32(i, true)));
  }
}

run();