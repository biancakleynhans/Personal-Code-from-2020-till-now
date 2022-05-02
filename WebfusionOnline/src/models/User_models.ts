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

export interface ProductEmail {
  email: string;
  cell: string;
  name: string;
  content: {
    Name: string;
    Sides: string;
    Color: string;
    Processing: string;
    Design: string;
    Proof: string;
    Paper: string;
    Size: string;
    Quantity: Number | string;
    art: any;
  };
  type: string;
}

export interface ContactEmail {
  email: string;
  cell: string;
  name: string;
  msg: string;
}
