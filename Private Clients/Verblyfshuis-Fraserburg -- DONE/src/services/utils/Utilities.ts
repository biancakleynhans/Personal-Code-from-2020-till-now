import moment from "moment";

export function generateArr(length: number, isOne: boolean) {
  let arr: string[] = [];
  for (let i = 0; i < length; i++) {
    let text = isOne ? i + 1 : i;
    arr.push(`${text}`);
  }
  return arr;
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}

export function ConvertDaysToNumbersInfo(startDate: string, endDate: string, count: string) {
  let ans = { pT: 0, gT: 0, dT: 0 };

  let start = moment(startDate, "DD-MM-YYYY");
  let end = moment(endDate, "DD-MM-YYYY");
  let daysTotal = moment.duration(end.diff(start)).asDays();

  let personT = daysTotal * 449;
  let grandT = personT * Number(count);
  console.log("DAYS", Number(count), daysTotal, personT, grandT);

  ans.pT = personT;
  ans.gT = grandT;
  ans.dT = daysTotal;

  return ans;
}
