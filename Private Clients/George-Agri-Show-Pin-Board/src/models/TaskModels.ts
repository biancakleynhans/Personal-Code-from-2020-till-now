export const progArr = ["pending", "in progress", "completed", "overdue"];
export const compArr = ["upload file", "check box", "text response"];

export interface iTask {
  name: string;
  startDate: string;
  endDate: string;
  desc: string;
  progress: "pending" | "started" | "in progress" | "completed" | "overdue";
  completeBy: string[];
  users: string[];
  content: iTaskContentEntry[];
  company: "GAS" | "JAKALS";
  id: string;
  creator: {
    name: string;
    token: string;
  };
}

export interface iTaskContentEntry {
  [k: string]: { type: string; content: string[] | string }[];
}
