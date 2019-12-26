import * as nearley from 'nearley';
import grammar from './grammar/risc-v.grammar';


function printInstruction(statement) {
  const opcode = `opcode: ${statement.opcodeToken.value}`;
  const args = statement.argTokens.map(at => `${at.type}: ${at.value}`);

  let argList = '';
  if (args.length > 0) {
    argList = `(${args.join(', ')})`;
  }

  console.log(opcode, argList);
}

function printLabel(statement) {
  const labelName = `label: ${statement.nameToken.value}`;
  console.log(labelName);
}

function printDirective(statement) {
  const name = `directive: ${statement.nameToken.value}`;
  const args = statement.argTokens.map(at => `${at.type}: ${at.value}`);

  let argList = '';
  if (args.length > 0) {
    argList = `(${args.join(', ')})`;
  }

  console.log(name, argList);
}


export function assemble(program: string) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(program);

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
          throw Error(`statement type: ${statement.type} is not supported`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
