# J.E.R

J.E.R is a fictitious processor family. The intent of this project is to provide a VM that models/approximates micro-controllers. The processor family implements the risc-v instruction set and the corresponding assembler is based on the gnu assembler for risc-v. 

Goals:

- [ ] In Browser code editor/file management (using browser local storage)
- [x] Generated `assembly` parser utilizing nearley.js
- [ ] Assembler to transform assembly in VM instrucitons
- [ ] VM that executes the assembly instructions

End result is being able to write assembly and simulate the CPU executing it entirely in the browser.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
