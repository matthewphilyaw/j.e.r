export const validHDirs = ['left', 'right'];
export const validVDirs = ['top', 'bottom'];
export const validLayouts = ['vertical', 'horizontal'];

export function attributeOutOfRange(component: string, attr: string, currentValue: string, expectedValues: string[]) {
  return `attribute ${attr} for ${component} is invalid. Provided value is: ${currentValue} and expected values are: ${expectedValues.join(',')}`
}

export function validVDir(vdir: string) {
  vdir = vdir.toLowerCase();
  return validVDirs.includes(vdir);
}

export function validHDir(hdir: string) {
  hdir = hdir.toLowerCase();
  return validHDirs.includes(hdir);
}

export function validLayout(layout: string) {
  layout = layout.toLowerCase();
  return validLayouts.includes(layout);
}