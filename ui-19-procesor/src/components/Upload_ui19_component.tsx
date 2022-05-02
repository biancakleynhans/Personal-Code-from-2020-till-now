import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React, { Component } from "react";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { date_std_format, setColor } from "../utils/Gloab_funcs";
import { Entry } from "../models/txt_models";
import { cleanUpNames } from "../utils/Conversion_funcs";

interface iProps {
  callbackforData: (data: any) => void;
  retrieveData: boolean;
  multi: boolean;
}

interface iState {
  uploadState: "busy" | "sucess" | "error" | "waiting";
  reqForm: any;
}

async function handleUpload_personel_files(e: any) {
  var AllFiles: any[] = [];
  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);
  var allData: any[] = [];

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<any[]>((resolve, reject) => {
        if (f) {
          const wb = new Excel.Workbook();
          const reader = new FileReader();
          const rABS = !!reader.readAsBinaryString;
          const monthString = cleanUpNames(f.name.slice(f.name.indexOf("20"), f.name.indexOf("20") + 7).replace("_", ""), false);

          // console.log("MS", f.name.indexOf("20"), monthString);

          reader.onloadend = (e) => {
            if (e.target) {
              const buffer = reader.result;
              wb.xlsx.load(buffer).then((workbook: any, index: number) => {
                var ws = workbook.worksheets[1];
                ws.eachRow({ includeEmpty: true }, function (row: any, rowNumber: number) {
                  var curr = row.values;
                  if (curr.length > 0) {
                    curr.push(...["8070", monthString]);
                    // console.log("cu", curr);
                    allData.push(curr);
                  }
                });

                resolve(allData);
              });
            }
          };
          if (rABS) reader.readAsBinaryString(f);
          else reader.readAsArrayBuffer(f);
        }
      });
    })
  );
  return Promise.resolve(allData);
}

function processPersonelData(persons: string[][]) {
  var perMonth: { [k: string]: any[] } = {};
  persons.map((row: any) => {
    const month = row[row.indexOf("8070") + 1];
    let monthData = perMonth[month];
    var new_entry: any = {} as Entry;
    // console.log("Process Personel Data ROW:", row[12], row[14], row.length, month, row);

    if (!monthData) {
      monthData = [];
      perMonth[month] = monthData;
    }
    const dob = row[8] != undefined ? date_std_format(row[8]) : "";
    const start = row[9] != undefined ? date_std_format(row[9]) : "";
    const end = row[10] != undefined ? date_std_format(row[10]) : "";
    const uif: string = row[12] === "No income paid for the payroll period" ? "0.01" : row[14] == undefined ? "0.01" : row[14]?.toString(); //|| row[14] == "0"
    const idN: string = row[3] && row[3].length === 10 ? `000${row[3]}` : row[3] && row[3].length === 11 ? `00${row[3]}` : row[3] && row[3].length === 12 ? `00${row[3]}` : row[3];

    // console.log("curr: ", idN, dob, start, end, uif);
    new_entry = {
      "Record type": "UIWK",
      "UIF Reference Number": row[2],
      "Identity Number": idN,
      "Other Numbers": "",
      "Personnel/Clock Card Number": row[5],
      Surname: row[6],
      "First Name": row[7],
      "Date of Birth": dob,
      "Employment Start Date": start,
      "Employment End Date": end,
      "Employment Status Code": row[11],
      "Reason for Non Contribution": row[12],
      "Gross Taxable Remuneration": row[13],
      "Remuneration subject to UIF": uif
    };

    monthData.push(new_entry);
  });
  // console.log('PER MONTH DATA', perMonth)
  return perMonth;
}

export class Upload_ui19_component extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      uploadState: "waiting",
      reqForm: null
    };
  }

  handleUpload(e: any) {
    e.preventDefault();

    if (this.props.retrieveData) {
      this.setState({ uploadState: "busy" });
      var allData: { [k: string]: any[] } = {};

      handleUpload_personel_files(e)
        .then((done: any) => {
          // console.log("done", done);
          allData = processPersonelData(done);
          // console.log("ALL DATA", allData);
          this.setState({ uploadState: "sucess" });
          this.props.callbackforData(allData);
        })
        .catch((error) => {
          console.error("ERROR IN UPLOAD", error);
          this.setState({ uploadState: "error" });
        });
    } else {
      this.setState({ reqForm: e, uploadState: "sucess" });
      this.props.callbackforData(e);
    }
  }

  render() {
    return (
      <IonItem style={{ align: "center" }}>
        <IonLabel>Digital Ui 19 form(s):</IonLabel>
        <input multiple={this.props.multi} type='file' accept='*.xlsx' onChange={(e) => this.handleUpload(e)} />
        {this.state.uploadState == "busy" ? <IonSpinner color={setColor(this.state.uploadState)} name='bubbles' /> : <></>}
        <IonLabel color={setColor(this.state.uploadState)}>Status: {this.state.uploadState}</IonLabel>
      </IonItem>
    );
  }
}

export default Upload_ui19_component;
