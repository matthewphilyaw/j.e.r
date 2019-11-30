export const validHDirs = ['left', 'right'];
export const validVDirs = ['top', 'bottom'];

export function attributeOutOfRange(component: string, attr: string, currentValue: string, expectedValues: string[]) {
  return `attribute ${attr} for ${component} is invalid. Provided value is: ${currentValue} and expected values are: ${expectedValues.join(',')}`
}