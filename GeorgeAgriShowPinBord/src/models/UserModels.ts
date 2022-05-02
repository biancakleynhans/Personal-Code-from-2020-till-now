export interface Base_User {
  role: "user" | "admin" | "super";
  fn: string;
  ln: string;
  cell: string;
  email: string;
  profileUrl: string;
  displayName: string;
  adress: string;
  uid: string;
  company: "GAS" | "JAKALS" | "BOTH" | string;
  fmcToken: string;
}

export interface UserUpdate {
  fn: string;
  ln: string;
  cell: string;
  addr: string;
  email: string;
  profileImg: string;
  company: "GAS" | "JAKALS" | "BOTH" | string;
  fmcToken: string;
}

export const COMPANY_DETAILS = {
  tel: "",
  cel: "",
  email: ""
};
