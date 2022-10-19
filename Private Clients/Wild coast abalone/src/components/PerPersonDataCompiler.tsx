import React, { Component } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { BatchedData, dataSpotsOBJ, iEmpTimes, iError_entry, iPerson, iPersonUIContributions, iYearSpots, iYearValues } from "../models/SalarySchedule_models";
import { Entry } from "../models/txt_models";
import { date_std_format, date_year_month, setColor } from "../utils/Gloab_funcs";
import { emp_status_maker_rev } from "../utils/Conversion_funcs";
import moment from "moment";

interface iProps {
  hist: any[];
  perMonth: { [k: string]: Entry[] };
  status: string;
  idsReq: string[][];
  reqForm: any;
  dataSportToFill: dataSpotsOBJ;
  zeroData: iYearSpots;
}

interface iState {
  process: "waiting on data" | "processing history" | "comparing data" | "compiling data" | "processing data" | "sucess";
  propPersons: any;
  processedPeople: any;
  errorFlags: string[];
  errorFlags2: string[];
  completed: Record<string, iPersonUIContributions>;
  showInfo: boolean;
  batchedcomplete: BatchedData;
  goToZero: boolean;
  detailsForZero: {
    people: Record<string, iPerson>;
    type: "Zero_data";
    reqForm: any;
    dataSportToFill: any;
  };
}

function sortEmpTerms(arr: iEmpTimes[]) {
  arr.sort(function (a, b) {
    if (moment(a.emp).year() < moment(b.emp).year() && moment(a.term).year() < moment(b.term).year()) return -1;
    if (moment(a.emp).year() > moment(b.emp).year() && moment(a.term).year() > moment(b.term).year()) return 1;
    return 0;
  });
  return arr;
}

function create_hist_empterms(entry: any, old: iEmpTimes[]) {
  var arr: iEmpTimes[] = [];
  arr = old;
  var s = entry[3].length > 0 ? date_std_format(entry[3]) : "";
  var e = entry[4].length > 0 ? date_std_format(entry[4]) : "";
  arr.push({ emp: s, term: e } as iEmpTimes);
  // return removeDuplicates(arr);
  return arr;
}

function create_error_empterms(entry: string[]) {
  // console.log("entry???", entry[4], entry[5], entry[6], entry[7]);
  var errorArr: iError_entry[] = [];

  var s1 = entry[4] !== undefined && entry[4].length > 1 ? date_year_month(entry[5]) : "";
  var e1 = entry[4] !== undefined && entry[4].length > 1 ? date_year_month(entry[6]) : "";

  var s2 = entry[7] !== undefined && entry[7].length > 1 ? date_year_month(entry[8]) : "";
  var e2 = entry[7] !== undefined && entry[7].length > 1 ? date_year_month(entry[9]) : "";

  var s3 = entry[10] !== undefined && entry[10].length > 1 ? date_year_month(entry[11]) : "";
  var e3 = entry[10] !== undefined && entry[10].length > 1 ? date_year_month(entry[12]) : "";

  var s4 = entry[13] !== undefined && entry[13].length > 1 ? date_year_month(entry[14]) : "";
  var e4 = entry[13] !== undefined && entry[13].length > 1 ? date_year_month(entry[15]) : "";

  var s5 = entry[16] !== undefined && entry[16].length > 1 ? date_year_month(entry[17]) : "";
  var e5 = entry[16] !== undefined && entry[16].length > 1 ? date_year_month(entry[18]) : "";

  var s6 = entry[19] !== undefined && entry[19].length > 1 ? date_year_month(entry[20]) : "";
  var e6 = entry[19] !== undefined && entry[19].length > 1 ? date_year_month(entry[21]) : "";

  var one: iError_entry = { code: entry[4], start: s1, end: e1 };
  var two: iError_entry = { code: entry[7], start: s2, end: e2 };
  var three: iError_entry = { code: entry[10], start: s3, end: e3 };
  var four: iError_entry = { code: entry[13], start: s4, end: e4 };
  var five: iError_entry = { code: entry[16], start: s5, end: e5 };
  var six: iError_entry = { code: entry[19], start: s6, end: e6 };

  errorArr.push(one);
  errorArr.push(two);
  errorArr.push(three);
  errorArr.push(four);
  errorArr.push(five);
  errorArr.push(six);

  return errorArr;
}

function year_creator(entry: string[], old: { [k: string]: iYearValues }) {
  var obj: { [k: string]: iYearValues } = {};
  obj = { ...old };
  const year = entry[5];

  if (obj[year] == undefined) {
    obj[year] = [];
    for (var i = 0; i < 12; i++) {
      const val = entry[6 + i];
      obj[year].push(val);
    }
  } else {
    for (var i = 0; i < 12; i++) {
      // console.log("already have this year", obj[year], entry[6 + i].length);
      const new_val: string = entry[6 + i];
      const old_val: string = obj[year][i];

      var old_con = old_val === "" && old_val.length < 2;
      var new_con = new_val.length > 1 && new_val !== "";

      if (old_con && new_con) {
        obj[year][i] = new_val;
      }
    }
  }
  // console.log("entry", entry, "OLD:", old, "NEW", obj);

  return obj;
}

function processData(hist: any[], errorBase: string[][], perMonth: { [k: string]: Entry[] }) {
  const allPeople: Record<string, iPerson> = {};
  var idsArr: string[] = [];

  errorBase.map((line: string[]) => idsArr.push(line[1]));
  // console.log("HIST:", hist, "ERROR BASE", errorBase, "IDS ", idsArr, "PM", perMonth);

  idsArr.forEach((entry: string) => {
    let possibleId = entry;
    if (possibleId) {
      let p = allPeople[possibleId];
      p = { id: possibleId, years_USE: {}, histYears: {}, employments: [] as iEmpTimes[], perMonthData: {}, error_log: [] as iError_entry[] } as iPerson;
      p.years_USE = {
        "2000": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2001": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2002": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2003": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2004": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2005": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2006": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2007": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2008": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2009": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2010": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2011": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2012": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2013": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2014": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2015": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2016": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2017": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2018": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2019": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2020": ["", "", "", "", "", "", "", "", "", "", "", ""],
        "2021": ["", "", "", "", "", "", "", "", "", "", "", ""]
      };
      allPeople[possibleId] = p;
    }
  });

  errorBase.map((entry: string[]) => {
    // console.log("error entry", entry);

    if (entry[1] === "6704065033087" || entry[1] == "6704065033004") {
      // console.log("error base found you", entry);
      allPeople["6704065033087"].ln = entry[3];
      allPeople["6704065033087"].fn = entry[2];
      allPeople["6704065033087"].error_log = create_error_empterms(entry);
    }

    allPeople[entry[1]].ln = entry[3];
    allPeople[entry[1]].fn = entry[2];
    allPeople[entry[1]].error_log = create_error_empterms(entry);
  });

  hist.forEach((entry: string[]) => {
    // console.log("entry", entry);
    if (entry[0] === "6704065033087" || entry[0] == "6704065033004") {
      // console.log("history found you", entry);
      allPeople["6704065033087"].histYears = year_creator(entry, allPeople["6704065033087"].histYears);
      allPeople["6704065033087"].employments = create_hist_empterms(entry, allPeople["6704065033087"].employments);
    } else if (allPeople[entry[0]] !== undefined) {
      // console.log("ENTRY:", "start", entry[3], "end", entry[4], "pbi", allPeople[entry[0]]);
      allPeople[entry[0]].histYears = year_creator(entry, allPeople[entry[0]].histYears);
      allPeople[entry[0]].employments = create_hist_empterms(entry, allPeople[entry[0]].employments);
    }
  });

  Object.keys(perMonth).map((key: string) => {
    // console.log("PM: ", key);
    perMonth[key].map((row: Entry) => {
      // console.log("ROW: ", row["Identity Number"], row);
      var r_id = row["Identity Number"];
      if (r_id === "6704065033087" || r_id == "6704065033004") {
        // console.log("perMonth found you", row);
        allPeople["6704065033087"].perMonthData[key] = {
          startDate: row["Employment Start Date"],
          end_date: row["Employment End Date"],
          non_cont: row["Reason for Non Contribution"],
          emp_status: row["Employment Status Code"],
          uif: row["Reason for Non Contribution"] != "No income paid for the payroll period" ? row["Remuneration subject to UIF"].toString() : "0.01",
          dob: row["Date of Birth"],
          gross: row["Gross Taxable Remuneration"].toString(),
          personelNum: row["Personnel/Clock Card Number"],
          type: "UIWK",
          ref: row["UIF Reference Number"]
        };
        var new_add = {
          emp: row["Employment Start Date"],
          term: row["Employment End Date"],
          termCode: row["Employment Status Code"] !== "Active" ? row["Employment Status Code"] : "",
          termReason: row["Employment Status Code"] !== "Active" ? emp_status_maker_rev(row["Employment Status Code"]) : ""
        } as iEmpTimes;

        allPeople["6704065033087"].employments.push(new_add);
        allPeople["6704065033087"].employments = sortEmpTerms(allPeople["6704065033087"].employments);
      }
      if (allPeople[r_id] !== undefined) {
        // console.log("R ID", r_id, allPeople[r_id].perMonthData, row);
        allPeople[r_id].perMonthData[key] = {
          startDate: row["Employment Start Date"],
          end_date: row["Employment End Date"],
          non_cont: row["Reason for Non Contribution"],
          emp_status: row["Employment Status Code"],
          uif: row["Reason for Non Contribution"] != "No income paid for the payroll period" ? row["Remuneration subject to UIF"].toString() : "0.01",
          dob: row["Date of Birth"],
          gross: row["Gross Taxable Remuneration"].toString(),
          personelNum: row["Personnel/Clock Card Number"],
          type: "UIWK",
          ref: row["UIF Reference Number"]
        };
        var new_add = {
          emp: row["Employment Start Date"],
          term: row["Employment End Date"],
          termCode: row["Employment Status Code"] !== "Active" ? row["Employment Status Code"] : "",
          termReason: row["Employment Status Code"] !== "Active" ? emp_status_maker_rev(row["Employment Status Code"]) : ""
        } as iEmpTimes;
        allPeople[r_id].employments.push(new_add);
        allPeople[r_id].employments = sortEmpTerms(allPeople[r_id].employments);
      }
    });
  });

  return allPeople;
}

export class PerPersonDataCompiler extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      process: "waiting on data",
      propPersons: {},
      processedPeople: {},
      errorFlags: [],
      errorFlags2: [],
      completed: {},
      showInfo: true,
      batchedcomplete: {} as BatchedData,
      goToZero: false,
      detailsForZero: {
        people: {},
        type: "Zero_data",
        reqForm: {},
        dataSportToFill: {}
      }
    };
  }

  componentDidMount() {
    console.log("PROPS", this.props);
    this.runprocess();
  }

  runprocess() {
    this.setState({ process: "processing data" });
    // console.log("PROPS: ", this.props);
    var cloneFixed: { [k: string]: Entry[] } = {};

    Object.keys(this.props.perMonth).map((key: string) => {
      if (key[0] === "_") {
        var new_key = key.replace("_", "");
        var year = new_key.slice(0, 4);
        var month = Number(new_key.slice(4));
        var use_month = month < 10 ? `0${month}` : month;

        var replace_key = `${year}_${use_month}`;
        // console.log("WTF", key, new_key, year, month, replace_key);

        if (this.props.perMonth[replace_key]) {
          if (cloneFixed[replace_key] === undefined) {
            cloneFixed[replace_key] = this.props.perMonth[replace_key];
          } else {
            // console.log("We have this one: ", this.props.perMonth[replace_key], cloneFixed[replace_key]);
            cloneFixed[replace_key] = [...cloneFixed[replace_key], ...this.props.perMonth[replace_key]];
          }
        } else {
          cloneFixed[replace_key] = this.props.perMonth[key];
        }
      } else {
        cloneFixed[key] = this.props.perMonth[key];
      }
    });

    var allPeople = processData(this.props.hist, this.props.idsReq, cloneFixed);

    console.log("ALL People: ", Object.keys(allPeople).length, allPeople);
    console.log("ERROR PEOPLE ALL: ", {
      "7605120092084": allPeople["7605120092084"],
      "6704065033087": allPeople["6704065033087"],
      "8311245700086": allPeople["8311245700086"],
      "0010195093082": allPeople["0010195093082"],
      "5404070111082": allPeople["5404070111082"],
      "8308056286080": allPeople["8308056286080"],
      "8507285408080": allPeople["8507285408080"],
      "8701250260085": allPeople["8701250260085"],
      "8706185017088": allPeople["8706185017088"],
      "8812235652088": allPeople["8812235652088"],
      "8909215082086": allPeople["8909215082086"],
      "9003195855080": allPeople["9003195855080"],
      "9011015150087": allPeople["9011015150087"],
      "9103105989084": allPeople["9103105989084"],
      "9110265393080": allPeople["9110265393080"],
      "9212015351085": allPeople["9212015351085"],
      "9012195429085": allPeople["9012195429085"],
      "6808086395084": allPeople["6808086395084"],
      "7210065854083": allPeople["7210065854083"],
      "7410205545084": allPeople["7410205545084"],
      "7501145153086": allPeople["7501145153086"],
      "7712185572081": allPeople["7712185572081"],
      "8107075992086": allPeople["8107075992086"],
      "8111200536081": allPeople["8111200536081"]
    });
  }

  render() {
    return (
      <>
        <IonItem>
          <IonLabel color={setColor(this.state.process)}> Data processing STATUS: {this.state.process}</IonLabel>
        </IonItem>
      </>
    );
  }
}

export default PerPersonDataCompiler;
