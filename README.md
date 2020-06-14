# J.E.R

J.E.R is a fictitious processor family. The intent of this project is to provide a VM that models/approximates micro-controllers. The processor family implements the risc-v instruction set and the corresponding assembler is based on the gnu assembler for risc-v. 

Goals:

- [ ] In Browser code editor/file management (using browser local storage)
- [x] Generated `assembly` parser utilizing nearley.js
- [ ] Assembler to transform assembly in VM instrucitons
- [ ] VM that executes the assembly instructions

End result is being able to write assembly and simulate the CPU executing it entirely in the browser.