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
  bookings?: iBooking[];
}

export interface ContactEmail {
  email: string;
  cell: string;
  name: string;
  msg: string;
  sub: string;
}

export const COMPANY_DETAILS = {
  tel: "+27 87 094 4654",
  cel: "+27 83 658 3312",
  email: "info@verblyfhuis-Fraserburg.co.za",
  bookemail: "bookings@verblyfhuis-Fraserburg.co.za"
};

export interface ReviewEmail {
  email: string;
  cell: string;
  name: string;
  msg: string;
  sub: string;
}

export interface iBooking {
  name: string;
  email: string;
  cell: string;
  ref: string;
  payed: boolean;
  startDate: string;
  endDate: string;
  guestCount: string;
  typeOfBooking: string;
  // new
  uid: string;
  pop: any;
  inv: any;
  totalcost: string;
}
