import { iData, iError } from '../models/Auth';

function isEmpty(input: any) {
  if (input === '') return true;
  if (input === 0) return true;
  else return false;
}

function isEmail(email: string) {
  // eslint-disable-next-line
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
}

export function validateLoginData(data: iData) {
  let errors: iError = {} as iError;

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (!isEmail(data.email)) errors.email = 'Must be a valid email address';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password?.length < 6) errors.password = 'Must be longer than 7 characters';
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

export function validateSignUpData(data: iData) {
  let errors: iError = {} as iError;

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  }
  if (!isEmail(data.email)) {
    errors.email = 'Must be valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password?.length < 6) errors.password = 'Must be longer than 7 characters';
  // if (data.password !== data.passwordConfirm) errors.passwordConfirm = "Passwords must be the same";
  if (isEmpty(data.fn)) errors.fn = 'Must not be empty';
  if (isEmpty(data.ln)) errors.ln = 'Must not be empty';
  if (isEmpty(data.addr)) errors.addr = 'Must not be empty';
  if (isEmpty(data.cell)) errors.cell = 'Must not be empty';
  if (data.cell?.length < 10) errors.cell = 'Cell number must be 10 digests long';
  if (data.cell?.length > 10) errors.cell = 'Cell number must be 10 digests long';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

export function validateInput(type: 'email' | 'password' | 'tel' | 'text' | 'number', input: string) {
  let errorString: string = '';

  if (isEmpty(input) && type === 'email') errorString = 'Must not be empty';
  if (!isEmail(input) && type === 'email') errorString = 'Must be valid email address';

  if (isEmpty(input) && type === 'password') errorString = 'Must not be empty';
  if (input?.length < 8 && type === 'password') errorString = 'Must be longer than 8 characters';

  if (input.length < 10 && type === 'tel') errorString = 'Cell number must be 10 digests long';
  if (input.length > 10 && type === 'tel') errorString = 'Cell number must be 10 digests long';

  if (isEmpty(input && type === 'text')) errorString = 'Must not be empty';
  if (isEmpty(input && type === 'number')) errorString = 'Must not be empty';

  return {
    error: errorString,
    valid: errorString.length === 0 ? true : false,
  };
}
