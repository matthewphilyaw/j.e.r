@preprocessor typescript

@{%
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
%}

@lexer lexer

program     -> statement (%nl statement):* {%
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
%}

statement   -> _ instruction eol {% ([, inst,]) => inst %}
             | _ label eol {% ([, label, ]) => label %}
             | _ label _ instruction eol {% ([, label, , instr]) => [label, instr] %}
             | _ label _ directive eol {% ([, label, , dir]) => [label, dir] %}
             | _ directive eol {% ([, directive, ]) => directive %} 
             | eol {% empty %}
           
directive   -> directiveId {% rule => ({ type: "directive", nameToken: rule[0], argTokens: [] }) %}
             | directiveId __ (dirArg sep):* dirArg {%
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
%}

instruction -> %ident {% rule => ({ type: "instruction", opcodeToken: rule[0], argTokens: [] }) %}
             | %ident __ (instrArg sep):* instrArg {%
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
%}

instrArg    -> %int
             | %hex
             | %bin
             | %ident
             | offset
             | reloc
       
dirArg      -> %int
             | %hex
             | %bin
             | %ident
             | directiveId
             | %string
              
# Line Fragments
directiveId -> "." %ident {% rule => rule[1] %}
label       -> (%ident | %int) ":" {% rule => ({ type: "label", nameToken: rule[0][0] }) %}
offset      -> (%ident | %int | %hex | %bin):? "(" %ident ")" {%
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
%}
reloc       -> "%" %ident "(" %ident ")" {%
  rule => {
  return {
    type: "reloc",
    relocType: rule[1],
    arg: rule[3]
  };
  }
%}
sep         -> _ "," _ {% empty %}
eol         -> _ %comment:? {% empty %}

# Whitespace
__          -> %ws:+ {% empty %}
_           -> %ws:* {% empty %}