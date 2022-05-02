export const TypesOfUsers: string[] = ["Employee", "Company", "Contractor", "Super Admin"];

export interface SiteInspection {
  "Inspected by": string;
  Signature: any;
  "Store Number & Location": string;
  "Project Name": string;
  "Copies to": string;
  "Contractor Name": string;
  "Inspection Date": Date;
  "Overall Inspection Score": "Good" | "Acceptable" | "Unacceptable" | " ";
}

export interface Employee {
  name: string;
  pass: string;
  role: "Employee";
}
export interface Company {
  name: string;
  pass: string;
  role: "Company";
  employeesList: string[];
}
export interface Contractor {
  name: string;
  pass: string;
  role: "Contractor";
  companiesList: string[];
}
