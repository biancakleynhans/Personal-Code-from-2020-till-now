import moment from 'moment';

export function DateToString(date: any): string {
  let final: string = '';
  // console.log('DATE: ', date, typeof date, moment(date).isValid());

  if (typeof date === 'object') {
    // console.log('UT', date.seconds, new Date(date.seconds * 1000), moment(date.seconds * 1000));
    final = moment(new Date(date.seconds * 1000)).format('DD/MM/YYYY');
  }

  if (typeof date === 'string') {
    // console.log('string let it be', date);
    final = date;
  }

  if (date === 'Invalid date') {
    // console.log('Invalid date ', date);
    final = moment(new Date()).format('DD/MM/YYYY');
  }

  return final;
}

export function StringToDate(date: any): Date {
  // console.log('DATE:', date, typeof date);
  let final: Date = new Date();

  if (typeof date === 'string') {
    let arr = date.split('/');
    // console.log('DATE:', date, arr);

    if (isNaN(Number(arr[0]))) {
      final = new Date();
      // console.log('Sting as date', arr, final);
    } else {
      let y = Number(arr[2]);
      let m = Number(arr[1]) - 1;
      let d = Number(arr[0]);

      final = new Date(y, m, d);
      // console.log('????', arr, final);
    }
  }

  if (typeof date === 'object') {
    if (date.seconds) {
      // console.log('UT', date.seconds, new Date(date.seconds * 1000), moment(date.seconds * 1000));
      final = new Date(date.seconds * 1000);
    } else {
      // console.log('got a date object that is a date ', date);
      final = date;
    }
  }

  if (date === 'Invalid date') {
    // console.log('Invalid date ', date);
    final = new Date();
  }

  return final;
}
