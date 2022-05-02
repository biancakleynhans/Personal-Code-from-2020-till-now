export interface ContactEmail {
  email: string;
  cell: string;
  name: string;
  msg: string;
  sub: string;
}

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
}
