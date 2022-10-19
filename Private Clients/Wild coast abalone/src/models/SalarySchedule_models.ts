export interface iYearSpots {
  [k: string]: string[];
}

export interface iYearSpotsObj {
  [k: string]: { year: any; row: number; col: number };
}

export interface dataSpotsOBJ {
  years: iYearSpotsObj;
  id: { row: number; col: number };
  surname: { row: number; col: number };
  start: { row: number; col: number };
  end: { row: number; col: number };
  code: { row: number; col: number };
  otherTermTimes: { start: { row: number; col: number }; end: { row: number; col: number }; code: { row: number; col: number } }[];
}

export interface iError_entry {
  start: string;
  end: string;
  code: string;
}

export interface iPersonError {
  idNumber: string;
  name: string;
  surname: string;
  timespans_error_codes: iError_entry[];
}

export interface iSS_PERSON {
  type: string;
  ref: string;
  id: string;
  initial: string;
  fn: string;
  ln: string;
  personelNum: string;
  error_log: iError_entry[];
  employments: iEmpTimes[];
  years_COL_M: { [k: string]: iYearValues };
  years_COL_N: { [k: string]: iYearValues };
  years_COL_O: { [k: string]: iYearValues };
}

export interface iPerson {
  id: string;
  initial: string;
  fn: string;
  ln: string;
  personelNum?: string;
  error_log: iError_entry[];
  employments: iEmpTimes[];
  years_USE: { [k: string]: iYearValues };
  histYears: { [k: string]: iYearValues };
  perMonthData: { [k: string]: iRow_needed };
}

export interface iPersonUIContributions {
  idNumber: string;
  initial: string;
  name: string;
  surname: string;

  timespans_error_codes: iError_entry[];

  emp: string;
  term: string;
  termCode: string;
  termReason: string;

  emp2: string;
  term2: string;
  termCode2: string;
  termReason2: string;

  emp3: string;
  term3: string;
  termCode3: string;
  termReason3: string;

  years: {
    [k: string]: iYearValues;
  };

  emps?: string[];
  terms?: string[];
  flaged?: boolean;
}

export interface dataSpots {
  years: iYearSpots;
  id: string;
  surname: string;
  start: string;
  end: string;
  code: string;
}

export interface iRow_needed {
  startDate: string;
  end_date: string;
  non_cont: string;
  emp_status: string;
  uif: string;
  dob: string;
  gross: string;
  personelNum: string;
  type: string;
  ref: string;
}

export interface iEmpTimes {
  emp: string;
  term: string;
  termCode: string;
  termReason: string;
}

export interface BatchedData {
  zero: Record<string, iPerson>;
  Pre_2009_still_emp1: Record<string, iPerson>;
  Pre_2009_still_emp2: Record<string, iPerson>;
  Pre_2009_terminated1: Record<string, iPerson>;
  Pre_2009_terminated2: Record<string, iPerson>;

  Post_2009_still_emp1: Record<string, iPerson>;
  Post_2009_still_emp2: Record<string, iPerson>;
  Post_2009_terminated1: Record<string, iPerson>;
  Post_2009_terminated2: Record<string, iPerson>;
}

export interface BatchedDataData {
  [k: string]: Record<string, iPerson>;
}

export type iYearValues = string[];
