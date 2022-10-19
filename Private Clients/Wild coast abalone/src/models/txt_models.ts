export interface Entry {
  "Record type": "UIWK";
  "UIF Reference Number": string;
  "Identity Number": string;
  "Other Numbers": string;
  "Personnel/Clock Card Number": string;
  Surname: string;
  "First Name": string;
  "Date of Birth": string;
  "Employment Start Date": string;
  "Employment End Date": string;
  "Employment Status Code": string;
  "Reason for Non Contribution": string;
  "Gross Taxable Remuneration": number | string;
  "Remuneration subject to UIF": number | string;
  "2% - UIF Contribution"?: string | number;
}

export interface EntryPassport {
  "UIF Reference Number": number;
  Title: string;
  Initial: string;
  Names: string;
  Surname: string;
  "ID Type": number;
  "Identity Number": string;
  "Passport Number": string;
  "Physical Address Line 1": string;
  "Physical Address Line 2": string;
  "Physical Address Line 3": string;
  Suburb: string;
  City: string;
  "Postal Code": string;
  "Postal Address Line 1": string;
  "Postal Address Line 2": string;
  "Postal Address Line 3": string;
  "Suburb ": string;
  "City ": string;
  "Postal Code ": string;
  "Country of Issue": string;
  "Date of Birth": string | number;
  "Commencement date of Employment Date": string | number;
  "Employed To": string | number;
  "Total Hours Worked per Month": number | string;
  "Employment Status (Termination Reason)": number | string;
  "Reason for Non Contribution": number | string;
  "Gross Taxable Remuneration": number;
  "Remuneration subject to UIF": number;
  "UIF Contribution": number;
}
