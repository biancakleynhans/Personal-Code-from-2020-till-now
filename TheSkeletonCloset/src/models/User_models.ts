export interface Base_User {
  role: "user" | "admin";
  fn: string;
  ln: string;
  cell: string;
  email: string;
  profileUrl: string;
  displayName: string;
  adress: string;
  uid: string;
  orders: {};
  requests: {};
}

export interface UserUpdate {
  fn: string;
  ln: string;
  cell: string;
  addr: string;
  email: string;
  profileImg: string;
}

export interface ContactEmail {
  email: string;
  cell: string;
  name: string;
  msg: string;
}
