
import { Input } from '@angular/core';

const validHDirs = ['left', 'right'];
const validVDirs = ['top', 'bottom'];
const validLayouts = ['vertical', 'horizontal'];

function attributeOutOfRange(component: string, attr: string, currentValue: string, expectedValues: string[]) {
  return `attribute ${attr} for ${component} is invalid. Provided value is: ${currentValue} and expected values are: ${expectedValues.join(',')}`
}

export interface UiDirectionOptions {
  vdirRequired?: boolean;
  hdirRequired?: boolean;
  layoutRequired?: boolean; 
}

export class UiDirectional {
  @Input() hdir?: string;
  @Input() vdir?: string;
  @Input() layout?: string;
  

  protected validateDirectionalInput(
    componentSelector: string,
    options: UiDirectionOptions = { hdirRequired: true, vdirRequired: true, layoutRequired: true }
  ) {
    this.validate(componentSelector, 'hdir', validHDirs, options.hdirRequired, this.hdir)
    this.validate(componentSelector, 'vdir', validVDirs, options.vdirRequired, this.vdir)
    this.validate(componentSelector, 'layout', validLayouts, options.layoutRequired, this.layout)
  }

  private validate(componentSelector: string, name: string, validValues: string[], required?: boolean, value?: string): void {
    if (
      // default to required if required is not defined
      ((required === undefined || required) && !value) ||
      (value && !validValues.includes(value.toLowerCase()))
    ) {
      throw new Error(attributeOutOfRange(componentSelector, name, value, validValues));
    }
  }
}