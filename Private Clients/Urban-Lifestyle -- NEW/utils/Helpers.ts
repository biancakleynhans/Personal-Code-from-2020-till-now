export function isArrayOfStrings(v: any): v is string[] {
  return v && Array.isArray(v) && v.every((e) => typeof e === 'string');
}

export function generateArr(length: number, isOne: boolean, currday: number = -1) {
  let arr: string[] = [];

  for (let i = 0; i < length; i++) {
    let text = isOne ? i + 1 : i;
    // let isCurr = currday !== -1 ? (Number(text) === currday ? 'curr' : '') : '';
    arr.push(`${text}`);
  }
  return arr;
}

export function generateYears(currYear: number, totalYears: number = 12) {
  // console.log('curr', currYear);
  let arr: number[] = [];

  for (let i = 0; i < totalYears; i++) {
    // console.log('>>', currYear + i);
    arr.push(currYear + i);
  }
  return arr;
}
