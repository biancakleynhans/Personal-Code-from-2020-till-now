import { iData, iError } from "../models/Forms";

function isEmpty(input: any) {
  if (input === "") return true;
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

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (!isEmail(data.email)) errors.email = "Must be a valid email address";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password?.length < 6) errors.password = "Must be longer than 7 characters";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
}

export function validateSignUpData(data: iData) {
  let errors: iError = {} as iError;

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  }
  if (!isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }

  if (isEmpty(data.fn)) errors.fn = "Must not be empty";
  if (isEmpty(data.ln)) errors.ln = "Must not be empty";
  if (isEmpty(data.cell)) errors.cell = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.cell?.length < 10) errors.cell = "Cell number must be 10 digests long";
  if (data.cell?.length > 10) errors.cell = "Cell number must be 10 digests long";
  if (data.password?.length < 6) errors.password = "Must be longer than 7 characters";

  // if (data.password !== data.passwordConfirm) errors.passwordConfirm = "Passwords must be the same";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
}

// const validateNewProductData = (data) => {
//   let errors = {};
//   let keys = Object.keys(data);

//   for (let i = 0; i < keys.length; i++) {
//     if (isEmpty(data[keys[i]])) errors[keys[i]] = "Must not be empty";
//   }

//   if (isNaN(data.price)) errors.price = "Must be a number";

//   return {
//     errors,
//     valid: Object.keys(errors).length === 0 ? true : false
//   };
// };

// const validateNewCategoryData = (data) => {
//   let errors = {};

//   if (isEmpty(data.description)) errors.description = "Must not be empty";
//   if (isEmpty(data.name)) errors.name = "Must not be empty";

//   return {
//     errors,
//     valid: Object.keys(errors).length === 0 ? true : false
//   };
// };
