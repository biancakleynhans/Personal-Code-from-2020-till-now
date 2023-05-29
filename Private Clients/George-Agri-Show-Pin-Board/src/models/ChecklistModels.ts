export interface iCheckList {
  title: string;
  id: string;
  list: { [k: string]: iCheckTask[] };
}

export interface iCheckTask {
  name: string;
  startDate: string;
  endDate: string;
  personsAssigned: string | iAssigned[];
  notes: string;
  status: string;
}

export interface iAssigned {
  fn: string;
  dn: string;
  uid: string;
}

export const STATUS = ['pending', 'started', 'in progress', 'completed', 'overdue'];
