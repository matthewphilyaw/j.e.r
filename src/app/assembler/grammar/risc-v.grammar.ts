// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var nl: any;
declare var ident: any;
declare var int: any;
declare var hex: any;
declare var bin: any;
declare var string: any;
declare var comment: any;
declare var ws: any;

  import * as moo from 'moo';
  const empty = x => null;

  const lexer = moo.compile({
    ws:         /[ \t]/,
    hex:        { match: /0[xX][0-9a-fA-F]+/, value: (m) => parseInt(m.slice(2).toLowerCase(), 16) },
    bin:        { match: /0b[01]+/, value: (m) => parseInt(m.slice(2), 2) },
    ident:      /[_0-9A-Za-z]*[_A-Za-z]+[_0-9A-Za-z]*/,
    int:        { match: /[-+]?[0-9]+/, value: m => parseInt(m) },
    string:     /"(?:\\['\\nt]|[^\n'\\])*"/,
    special:    /[\.:,\(\)%]/,
    comment:    /#[^\n]*/,
    nl: { match: /\n/, lineBreaks: true }
  });

interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), "statement"]},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "program$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "program", "symbols": ["statement", "program$ebnf$1"], "postprocess": 
        rule => {
          const statements = [];
          if (rule[0]) {
            statements.push(rule[0]);	
          }
          
          for (const statement of rule[1]) {
            if (!statement[1]) { continue; }
            
              if (Array.isArray(statement[1])) {
                const toPush = statement[1].flatMap(s => s);
                statements.push(...toPush);
              }
            else {
              statements.push(statement[1]);  
            }
          }
          
          return statements;
        }
        },
    {"name": "statement", "symbols": ["_", "instruction", "eol"], "postprocess": ([, inst,]) => inst},
    {"name": "statement", "symbols": ["_", "label", "eol"], "postprocess": ([, label, ]) => label},
    {"name": "statement", "symbols": ["_", "label", "_", "instruction", "eol"], "postprocess": ([, label, , instr]) => [label, instr]},
    {"name": "statement", "symbols": ["_", "label", "_", "directive", "eol"], "postprocess": ([, label, , dir]) => [label, dir]},
    {"name": "statement", "symbols": ["_", "directive", "eol"], "postprocess": ([, directive, ]) => directive},
    {"name": "statement", "symbols": ["eol"], "postprocess": empty},
    {"name": "directive", "symbols": ["directiveId"], "postprocess": rule => ({ type: "directive", nameToken: rule[0], argTokens: [] })},
    {"name": "directive$ebnf$1", "symbols": []},
    {"name": "directive$ebnf$1$subexpression$1", "symbols": ["dirArg", "sep"]},
    {"name": "directive$ebnf$1", "symbols": ["directive$ebnf$1", "directive$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "directive", "symbols": ["directiveId", "__", "directive$ebnf$1", "dirArg"], "postprocess": 
        rule => {
          const nameToken = rule[0];
          const args = [];
          
          for (const arg of rule[2]) {
            args.push(arg[0][0]);	
          }
        
          args.push(rule[3][0]);
        
          return {
            type: "directive",
            nameToken: nameToken,
            argTokens: args
          };
        }
        },
    {"name": "instruction", "symbols": [(lexer.has("ident") ? {type: "ident"} : ident)], "postprocess": rule => ({ type: "instruction", opcodeToken: rule[0], argTokens: [] })},
    {"name": "instruction$ebnf$1", "symbols": []},
    {"name": "instruction$ebnf$1$subexpression$1", "symbols": ["instrArg", "sep"]},
    {"name": "instruction$ebnf$1", "symbols": ["instruction$ebnf$1", "instruction$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "instruction", "symbols": [(lexer.has("ident") ? {type: "ident"} : ident), "__", "instruction$ebnf$1", "instrArg"], "postprocess": 
        rule => {
          const opCodeToken = rule[0];
          const args = [];
          
          for (const arg of rule[2]) {
            args.push(arg[0][0]);	
          }
        
          args.push(rule[3][0]);
        
          return {
            type: "instruction",
            opcodeToken: opCodeToken,
            argTokens: args
          };
        }
        },
    {"name": "instrArg", "symbols": [(lexer.has("int") ? {type: "int"} : int)]},
    {"name": "instrArg", "symbols": [(lexer.has("hex") ? {type: "hex"} : hex)]},
    {"name": "instrArg", "symbols": [(lexer.has("bin") ? {type: "bin"} : bin)]},
    {"name": "instrArg", "symbols": [(lexer.has("ident") ? {type: "ident"} : ident)]},
    {"name": "instrArg", "symbols": ["offset"]},
    {"name": "instrArg", "symbols": ["reloc"]},
    {"name": "dirArg", "symbols": [(lexer.has("int") ? {type: "int"} : int)]},
    {"name": "dirArg", "symbols": [(lexer.has("hex") ? {type: "hex"} : hex)]},
    {"name": "dirArg", "symbols": [(lexer.has("bin") ? {type: "bin"} : bin)]},
    {"name": "dirArg", "symbols": [(lexer.has("ident") ? {type: "ident"} : ident)]},
    {"name": "dirArg", "symbols": ["directiveId"]},
    {"name": "dirArg", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "directiveId", "symbols": [{"literal":"."}, (lexer.has("ident") ? {type: "ident"} : ident)], "postprocess": rule => rule[1]},
    {"name": "label$subexpression$1", "symbols": [(lexer.has("ident") ? {type: "ident"} : ident)]},
    {"name": "label$subexpression$1", "symbols": [(lexer.has("int") ? {type: "int"} : int)]},
    {"name": "label", "symbols": ["label$subexpression$1", {"literal":":"}], "postprocess": rule => ({ type: "label", nameToken: rule[0][0] })},
    {"name": "offset$ebnf$1$subexpression$1", "symbols": [(lexer.has("ident") ? {type: "ident"} : ident)]},
    {"name": "offset$ebnf$1$subexpression$1", "symbols": [(lexer.has("int") ? {type: "int"} : int)]},
    {"name": "offset$ebnf$1$subexpression$1", "symbols": [(lexer.has("hex") ? {type: "hex"} : hex)]},
    {"name": "offset$ebnf$1$subexpression$1", "symbols": [(lexer.has("bin") ? {type: "bin"} : bin)]},
    {"name": "offset$ebnf$1", "symbols": ["offset$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "offset$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "offset", "symbols": ["offset$ebnf$1", {"literal":"("}, (lexer.has("ident") ? {type: "ident"} : ident), {"literal":")"}], "postprocess": 
        rule => {
        let offset = null;
        if (rule[0]) {
          offset = rule[0][0];
        }
          
        return {
          type: "offset",
          offset: offset,
          arg: rule[2]
        };
        }
        },
    {"name": "reloc", "symbols": [{"literal":"%"}, (lexer.has("ident") ? {type: "ident"} : ident), {"literal":"("}, (lexer.has("ident") ? {type: "ident"} : ident), {"literal":")"}], "postprocess": 
        rule => {
        return {
          type: "reloc",
          relocType: rule[1],
          arg: rule[3]
        };
        }
        },
    {"name": "sep", "symbols": ["_", {"literal":","}, "_"], "postprocess": empty},
    {"name": "eol$ebnf$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "eol$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "eol", "symbols": ["_", "eol$ebnf$1"], "postprocess": empty},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": empty},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": empty}
  ],
  ParserStart: "program",
};

export default grammar;
