import React, { Component } from "react";
import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import moment from "moment";
import { Entry, EntryPassport } from "../models/txt_models";
import { cleanUpNames, emp_status_maker, generate_ID, reason_for_non_cont_maker } from "../utils/Conversion_funcs";
import { date_std_format, setColor } from "../utils/Gloab_funcs";

interface iProps {
  callbackforData: (data: any) => void;
}

interface iState {
  uploadState: "busy" | "sucess" | "error" | "waiting";
  perMonthData: { [k: string]: any[] };
  passportArr: any[];
}

function check_for_starters_that_are_out(row_entry: any, curr_date_line: string) {
  var startBool: boolean = false;
  const start_date = date_std_format(row_entry[row_entry.indexOf("8260") + 1]);
  const curr_date = date_std_format(curr_date_line);

  const start_year = moment(start_date).year();
  const curr_year = moment(curr_date).year();

  const start_month = moment(start_date).month() + 1;
  const curr_month = moment(curr_date).month() + 1;

  const start_day = moment(start_date).date();

  // console.log("????", start_year, curr_year);
  if (start_year === curr_year && start_month == curr_month - 1) {
    if (start_day > 22 && start_year >= 2018) {
      // console.log("Same year and one month less and correct day", start_date, curr_date, row_entry);
      startBool = true;
    }
    if (start_day > 27 && start_year <= 2017) {
      // console.log("Same year and one month less and correct day", start_date, curr_date, row_entry);
      startBool = true;
    }
  }
  return startBool;
}

function fix_uif_ref(old_uif: string) {
  // console.log('old', old_uif, `${old_uif.slice(1, old_uif.length - 1)}/0`);
  var returner = "";
  returner = `${old_uif.slice(1, old_uif.length - 1)}/0`;
  return returner;
}

function check_for_passport(row: any) {
  if (row[row.indexOf("8210")] !== undefined) {
    // console.log("check_for_passport", row.indexOf("8210"), row[row.indexOf("8210")]);
    return true;
  } else {
    return false;
  }
}

function getStarters(row: any[]) {
  const month = row[row.indexOf("8070") + 1];
  const starter = check_for_starters_that_are_out(row, row[row.indexOf("8070") + 1]);
  const startdate = row[row.indexOf("8260") + 1];

  if (starter) {
    // console.warn("starter", starter, startdate, "row", row);
    return row;
  } else {
    return [];
  }
}

function generate_passport_entry(row: any) {
  var newEntry: EntryPassport = {
    "UIF Reference Number": Number(row[row.indexOf("8110") + 1]),
    Title: "",
    Initial: row[row.indexOf("8240") + 1].slice(0, 1),
    Names: cleanUpNames(row[row.indexOf("8240") + 1]),
    Surname: cleanUpNames(row[row.indexOf("8230") + 1]),
    "ID Type": row[row.indexOf("8200")] !== undefined ? 1 : 2,
    "Identity Number": "",
    "Passport Number": row[row.indexOf("8210")] !== undefined ? row[row.indexOf("8210") + 1] : "",
    "Physical Address Line 1": "",
    "Physical Address Line 2": "",
    "Physical Address Line 3": "",
    Suburb: "",
    City: "",
    "Postal Code": "",
    "Postal Address Line 1": "",
    "Postal Address Line 2": "",
    "Postal Address Line 3": "",
    "Suburb ": "",
    "City ": "",
    "Postal Code ": "",
    "Country of Issue": row[row.indexOf("8200")] !== undefined ? "ZA" : "",
    "Date of Birth": date_std_format(row[row.indexOf("8250") + 1]),
    "Commencement date of Employment Date": date_std_format(row[row.indexOf("8260") + 1]),
    "Employed To": row[row.indexOf("8270")] !== undefined ? date_std_format(row[row.indexOf("8270") + 1]) : "",
    "Total Hours Worked per Month": "",
    "Employment Status (Termination Reason)": row[row.indexOf("8280") + 1] !== "01" ? Number(row[row.indexOf("8280") + 1]) : "",
    "Reason for Non Contribution": reason_for_non_cont_maker(row[row.indexOf("8300") + 1]),
    "Gross Taxable Remuneration": Number(row[row.indexOf("8300") + 1]),
    "Remuneration subject to UIF": Number(row[row.indexOf("8310") + 1]),
    "UIF Contribution": Number(row[row.indexOf("8320") + 1])
  };

  return newEntry;
}

async function handleUpload_multi_txt_files(e: any) {
  var AllFiles: any[] = [];
  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);

  var allDtata: any[] = [];
  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<any[]>((resolve, reject) => {
        if (f) {
          var fr = new FileReader();
          fr.onloadend = () => {
            if (typeof fr.result == "string") {
              var str: string = fr.result || "";

              var byline = str
                .split("8000")
                .join("8000")
                .split("8002")
                .join("8002")
                .split("8001")
                .reduce((s, c) => {
                  s.push(c.trim().split('"').join("").split(","));
                  return s;
                }, [] as string[][]);
              const monthString = byline[0][byline[0].indexOf("8070") + 1].trim();

              byline.forEach((line) => {
                line.forEach((l) => l.trim());
                if (line[19] != undefined) {
                  var trimed = line[19].trim();
                  line.splice(19, 1, trimed);
                }
                if (line[23] != undefined) {
                  var trimed = line[23].trim();
                  line.splice(23, 1, trimed);
                }
                line.push(...["8070", monthString]);
                allDtata.push(line);
              });
              resolve(allDtata);
            }
          };
          fr.readAsText(f);
        }
      });
    })
  );
  return Promise.resolve(allDtata);
}

function prosessData(done: string[][]) {
  var perMonth: { [k: string]: any[] } = {};
  var passportArr: any[] = [];
  var startersArr: any[] = [];

  done.forEach((row: string[]) => {
    const month = row[row.indexOf("8070") + 1].trim();
    const isPass = check_for_passport(row);
    const idIndex = row[row.indexOf("8200")];

    if (!perMonth[month] && !isNaN(Number(month))) {
      perMonth[month] = [];
    }

    startersArr.push(getStarters(row));

    if (!isPass && idIndex) {
      var new_entry: Entry = {} as Entry;

      const uifRef: string = fix_uif_ref(row[row.indexOf("8110") + 1]);
      const dob: string = date_std_format(row[row.indexOf("8250") + 1]);
      const start_date: string = date_std_format(row[row.indexOf("8260") + 1]);
      const end_date: string = row[row.indexOf("8270")] !== undefined ? date_std_format(row[row.indexOf("8270") + 1]) : "";
      const emp_code: string = emp_status_maker(row[row.indexOf("8280") + 1]);
      const reason: string = reason_for_non_cont_maker(row[row.indexOf("8310") + 1]);
      const id = row[row.indexOf("8200")] !== undefined ? generate_ID(row[row.indexOf("8200") + 1]) : "";
      const clockNum = row[row.indexOf("8220")] !== undefined ? row[row.indexOf("8220") + 1] : "";
      const ln = cleanUpNames(row[row.indexOf("8230") + 1]);
      const fn = cleanUpNames(row[row.indexOf("8240") + 1]);
      const gross = Number(row[row.indexOf("8300") + 1]);
      const subj = Number(row[row.indexOf("8310") + 1]);

      new_entry = {
        "Record type": "UIWK",
        "UIF Reference Number": uifRef,
        "Identity Number": id,
        "Other Numbers": "",
        "Personnel/Clock Card Number": clockNum,
        Surname: ln,
        "First Name": fn,
        "Date of Birth": dob,
        "Employment Start Date": start_date,
        "Employment End Date": end_date,
        "Employment Status Code": emp_code,
        "Reason for Non Contribution": reason,
        "Gross Taxable Remuneration": gross,
        "Remuneration subject to UIF": subj,
        "2% - UIF Contribution": 0
      };

      perMonth[month].push(new_entry);
      // console.log("NEW ENTRY: ", new_entry);
    } else if (isPass) {
      const curr = generate_passport_entry(row);
      let find = passportArr.find((f) => (curr["Passport Number"] === f["Passport Number"] ? true : false));

      if (!find) {
        passportArr.push(curr);
      }
    }
  });

  startersArr.forEach((row: any[]) => {
    if (row.length > 0) {
      var y = moment(row[row.indexOf("8070") + 1]).year();
      var m = moment(row[row.indexOf("8070") + 1]).month();
      var m_n = "";
      m_n = m + 1 <= 9 ? `0${m + 1}` : `${m + 1}`;
      var fin = `${y}${m_n}`;

      if (!perMonth[fin]) {
        perMonth[fin] = [];
      }

      // console.log("row", row[row.indexOf("8070") + 1], y, m_n, fin);
      var new_entry: Entry = {} as Entry;

      const uifRef: string = fix_uif_ref(row[row.indexOf("8110") + 1]);
      const dob: string = date_std_format(row[row.indexOf("8250") + 1]);
      const start_date: string = date_std_format(row[row.indexOf("8260") + 1]);
      const end_date: string = row[row.indexOf("8270")] !== undefined ? date_std_format(row[row.indexOf("8270") + 1]) : "";
      const emp_code: string = emp_status_maker(row[row.indexOf("8280") + 1]);
      const reason: string = reason_for_non_cont_maker(row[row.indexOf("8310") + 1]);
      const id = row[row.indexOf("8200")] !== undefined ? generate_ID(row[row.indexOf("8200") + 1]) : "";
      const clockNum = row[row.indexOf("8220")] !== undefined ? row[row.indexOf("8220") + 1] : "";
      const ln = cleanUpNames(row[row.indexOf("8230") + 1]);
      const fn = cleanUpNames(row[row.indexOf("8240") + 1]);
      const gross = Number(row[row.indexOf("8300") + 1]);
      const subj = Number(row[row.indexOf("8310") + 1]);

      // console.log("NEW: ", id.length, id); // ln, fn, start_date, end_date, emp_code, gross, subj

      new_entry = {
        "Record type": "UIWK",
        "UIF Reference Number": uifRef,
        "Identity Number": id,
        "Other Numbers": "",
        "Personnel/Clock Card Number": clockNum,
        Surname: ln,
        "First Name": fn,
        "Date of Birth": dob,
        "Employment Start Date": start_date,
        "Employment End Date": end_date,
        "Employment Status Code": emp_code,
        "Reason for Non Contribution": reason,
        "Gross Taxable Remuneration": gross,
        "Remuneration subject to UIF": subj
      };

      perMonth[fin].push(new_entry);
    }
  });

  // console.log("P", passportArr);
  // console.log("PERMONTH", perMonth);
  return { pm: perMonth, pass: passportArr };
}

export class Upload_txt_component extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      uploadState: "waiting",
      perMonthData: {},
      passportArr: []
    };
  }

  handleUpload(e: any) {
    e.preventDefault();

    this.setState({ uploadState: "waiting" });
    handleUpload_multi_txt_files(e)
      .then((done) => {
        this.setState({ uploadState: "busy" });
        // console.log("done", done);
        return prosessData(done);
      })
      .then((finalData) => {
        this.setState({ uploadState: "sucess", perMonthData: finalData.pm, passportArr: finalData.pass });
        // console.log("STATE END:", this.state);
        this.props.callbackforData(this.state);
      })
      .catch((error) => {
        console.error("ERROR IN UPLOAD", error);
        this.setState({ uploadState: "error" });
      });
  }

  render() {
    return (
      <IonItem style={{ align: "center" }}>
        <IonLabel>Monthly report text files :</IonLabel>
        <input type='file' accept='.*, *.txt' multiple onChange={(e) => this.handleUpload(e)} />

        <IonLabel color={setColor(this.state.uploadState)}>
          Status: {this.state.uploadState}
          {this.state.uploadState == "busy" ? <IonSpinner color={setColor(this.state.uploadState)} name='bubbles' /> : <></>}
        </IonLabel>
      </IonItem>
    );
  }
}

export default Upload_txt_component;
