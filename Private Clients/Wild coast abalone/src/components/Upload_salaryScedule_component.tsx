import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React, { Component } from "react";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { dataSpotsOBJ, iYearSpotsObj } from "../models/SalarySchedule_models";
import { setColor } from "../utils/Gloab_funcs";
import moment from "moment";

interface iProps {
  callbackforData: (data: any) => void;
  retrieveData: boolean;
  multi: boolean;
}

interface iState {
  uploadState: "busy" | "sucess" | "error" | "waiting";
  reqForm: any;
  dataSportToFill: dataSpotsOBJ;
}

async function handleUpload_salary_schedule_form(e: any) {
  var AllFiles: any[] = [];
  [...e.target.files].map((file) => AllFiles.push(file));

  var final: dataSpotsOBJ = {} as dataSpotsOBJ;
  var years: iYearSpotsObj = {};

  // console.log("ws", ws);
  var yC = -1;
  var yR = -1;

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<dataSpotsOBJ>((resolve, reject) => {
        if (f) {
          //   console.log("???", f);
          const wb = new Excel.Workbook();
          const reader = new FileReader();
          const rABS = !!reader.readAsBinaryString;

          reader.onload = (e) => {
            if (e.target) {
              const buffer = reader.result;
              wb.xlsx.load(buffer).then((workbook: any) => {
                var ws = workbook.worksheets[0];
                ws.duplicateRow(32, 5, false);
                // Iterate over all rows (including empty rows) in a worksheet
                ws.eachRow({ includeEmpty: true }, function (row: any, rowNumber: number) {
                  // console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
                  // Iterate over all cells in a row (including empty cells)
                  row.eachCell({ includeEmpty: true }, function (cell: any, colNumber: number) {
                    // console.log(rowNumber, "Cell " + colNumber + " = " + cell.value);
                    /*GET THE YEARS REQUIRED*/
                    if (cell.value === "YEAR") {
                      // console.log("got year", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      yC = colNumber;
                      yR = rowNumber;
                      var test = moment(new Date()).year() - 2000;
                      for (let i = 0; i < test + 1; i++) {
                        var curr_y = 2000 + i;
                        var curr_r = yR + 1 + i;
                        ws.getRow(curr_r).getCell(yC).value = curr_y;
                        // console.log("??", i, curr_y, curr_r, ws.getRow(curr_r).getCell(yC).value);
                      }
                    }
                    /*OTHER SPACES REQUIRED*/
                    if (cell.value === "EMPLOYEE ID NUMBER" && final.id == undefined) {
                      // console.log("got EMPLOYEE ID NUMBER", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      final.id = { row: rowNumber, col: colNumber };
                    }
                    if (cell.value === "SURNAME AND INITIALS" && final.surname == undefined) {
                      // console.log("got SURNAME AND INITIALS", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      final.surname = { row: rowNumber, col: colNumber };
                    }
                    if (cell.value === "START DATE" && final.start == undefined) {
                      // console.log("START DATE", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      final.start = { row: rowNumber, col: colNumber };
                    }
                    if (cell.value === "TERMINATION DATE " && final.end == undefined) {
                      // console.log("TERMINATION DATE", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      final.end = { row: rowNumber, col: colNumber };
                    }
                    if (cell.value === "TERMINATION REASON" && final.code == undefined) {
                      // console.log("TERMINATION REASON", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      final.code = { row: rowNumber, col: colNumber };
                    }
                  });
                });
                if (yC !== -1 && yR !== -1) {
                  const yearCol = ws.getColumn(yC);
                  // iterate over all current cells in this column including empty cells
                  yearCol.eachCell({ includeEmpty: true }, function (cell: any, rowNumber: number) {
                    // console.log(`Col @ ${yC}, row ${rowNumber} = `, cell.value);
                    if (cell.value != "Year" || cell.value != null) {
                      // years_req.push({ year: cell.value, row: rowNumber, col: yC });
                      years[cell.value] = { year: cell.value, row: rowNumber, col: yC };
                    }
                  });
                  final.years = years;
                }
                /* Add extra space for dates: col 1,3,4 rows from 24 -> */
                final.otherTermTimes = [];
                for (let x = 0; x < 7; x++) {
                  // console.log("????", 24 + x);
                  var curr = {
                    start: {
                      row: 24 + x,
                      col: 1
                    },
                    end: {
                      row: 24 + x,
                      col: 3
                    },
                    code: {
                      row: 24 + x,
                      col: 4
                    }
                  };
                  final.otherTermTimes.push(curr);
                }
                // console.log("in load", final);
                resolve(final);
              });
            }
          };
          if (rABS) reader.readAsBinaryString(f);
          else reader.readAsArrayBuffer(f);
        }
      });
    })
  );
  return Promise.resolve(final);
}

export class Upload_salaryScedule_component extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      uploadState: "waiting",
      reqForm: null,
      dataSportToFill: {} as dataSpotsOBJ
    };
  }

  handleUpload_Form(e: any) {
    e.preventDefault();
    this.setState({ uploadState: "busy" });

    if (this.props.retrieveData) {
      // Do data part here
    } else {
      handleUpload_salary_schedule_form(e)
        .then((done) => {
          //   console.log("done", done);
          this.setState({ uploadState: "sucess", dataSportToFill: done, reqForm: e });
          this.props.callbackforData(this.state);
        })
        .catch((error) => {
          console.error("ERROR IN UPLOAD", error);
          this.setState({ uploadState: "error" });
        });
    }
  }

  render() {
    return (
      <IonItem>
        <IonLabel>Salary schedule form:</IonLabel>
        <input type='file' multiple={this.props.multi} accept='*.xlsx' onChange={(e) => this.handleUpload_Form(e)} />
        {this.state.uploadState == "busy" ? <IonSpinner color={setColor(this.state.uploadState)} name='bubbles' /> : <></>}
        <IonLabel color={setColor(this.state.uploadState)}>Status: {this.state.uploadState}</IonLabel>
      </IonItem>
    );
  }
}

export default Upload_salaryScedule_component;
