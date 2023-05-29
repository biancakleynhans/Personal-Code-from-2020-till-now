import moment from 'moment';

export function generateArr(length: number, isOne: boolean) {
  let arr: string[] = [];
  for (let i = 0; i < length; i++) {
    let text = isOne ? i + 1 : i;
    arr.push(`${text}`);
  }
  return arr;
}

export function formatDate(value: string) {
  // console.log('FORMAT', value, moment(value), moment(value).isValid);
  return moment(new Date(value)).format('DD/MM/YYYY');
}

// 'pending' | 'started' | 'in progress' | 'completed' | 'overdue' | 'TODO'
export function setColor(prog: string) {
  //"medium", "tertiary,"warning","success", "danger",
  // prog = props.data.task.progress
  if (prog === 'pending' || prog === 'TODO') {
    return 'medium';
  } else if (prog === 'started') {
    return 'secondary';
  } else if (prog === 'in progress') {
    return 'warning';
  } else if (prog === 'completed') {
    return 'success';
  } else if (prog === 'overdue') {
    return 'danger';
  } else {
    return 'none';
  }
}

export function isArrayOfStrings(v: any): v is string[] {
  return v && Array.isArray(v) && v.every((e) => typeof e === 'string');
}
