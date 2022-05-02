import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React, { Component } from "react";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { setColor } from "../utils/Gloab_funcs";
import { iYearSpots } from "../models/SalarySchedule_models";

interface iProps {
  callbackforData: (data: any) => void;
}

interface iState {
  uploadState_error: "busy" | "sucess" | "error" | "waiting";
  uploadState_zero: "busy" | "sucess" | "error" | "waiting";
  uploadState_history: "busy" | "sucess" | "error" | "waiting";

  data_error: string[][];
  data_zero: iYearSpots;
  data_history: string[][];
}

async function handleUpload_error_report(e: any) {
  var AllFiles: any[] = [];
  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);
  var allDtata: any[] = [];
  var temp: any[] = [];

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<any[]>((resolve, reject) => {
        if (f) {
          const wb = new Excel.Workbook();
          const reader = new FileReader();
          const rABS = !!reader.readAsBinaryString;

          reader.onload = (e) => {
            if (e.target) {
              const buffer = reader.result;
              wb.xlsx.load(buffer).then((workbook: any) => {
                var ws = workbook.worksheets[0];
                // Iterate over all rows (including empty rows) in a worksheet
                ws.eachRow({ includeEmpty: false }, function (row: any, rowNumber: number) {
                  //   console.log(rowNumber, "Row", row.values, ws.getRow(rowNumber).values);
                  temp.push(ws.getRow(rowNumber).values);
                });

                temp.map((line: string[], index) => {
                  if (temp[index][0] == undefined) {
                    temp[index].splice(0, 1);
                  }

                  if (temp[index][0] && temp[index][0].length > 2 && temp[index][0].length < 13) {
                    // console.log("??????", temp[index][0].length, temp[index][0]);
                    console.warn("ID NOT CORRECT");
                  }

                  if (index > 1) {
                    allDtata.push(line);
                  }
                });
                resolve(allDtata);
              });
            }
          };
          if (rABS) reader.readAsBinaryString(f);
          else reader.readAsArrayBuffer(f);
        }
      });
    })
  );
  return Promise.resolve(allDtata);
}

async function handleUpload_zero_data(e: any) {
  var AllFiles: any[] = [];
  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);
  var years: iYearSpots = {};
  /* NEW:  */

  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<iYearSpots>((resolve, reject) => {
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
                // Iterate over all rows (including empty rows) in a worksheet
                ws.eachRow({ includeEmpty: true }, function (row: any, rowNumber: number) {
                  row.eachCell({ includeEmpty: true }, function (cell: any, colNumber: number) {
                    /*GET THE YEARS REQUIRED*/
                    if (cell.value === "YEAR") {
                      // console.log("got year", rowNumber, colNumber, ws.getRow(rowNumber).getCell(colNumber).value);
                      const yearCol = ws.getColumn(colNumber);
                      // iterate over all current cells in this column including empty cells
                      yearCol.eachCell({ includeEmpty: true }, function (cell: any, rowNumber: number) {
                        if (!isNaN(cell.value) && cell.value !== null) {
                          // console.log("Yearcol ", `Col @ ${colNumber}, row ${rowNumber} = `, cell.value);
                          years[cell.value] = [];
                          for (let z = 1; z < 13; z++) {
                            // console.log(`Col @ ${colNumber + z}, row ${rowNumber} = `, Number(ws.getRow(rowNumber).getCell(colNumber + z).value).toFixed(2));
                            years[cell.value].push(Number(ws.getRow(rowNumber).getCell(colNumber + z).value).toFixed(2));
                          }
                        }
                      });
                    }
                  });
                });
                // console.log("in load", years);
                resolve(years);
              });
            }
          };
          if (rABS) reader.readAsBinaryString(f);
          else reader.readAsArrayBuffer(f);
        }
      });
    })
  );
  return Promise.resolve(years);
}

async function handleUpload_multi_tsv_files(e: any) {
  var AllFiles: any[] = [];
  [...e.target.files].map((file) => AllFiles.push(file));
  // console.log('all files', AllFiles);

  var allDtata: any[] = [];
  var temp: any[] = [];
  await Promise.all(
    AllFiles.map((f) => {
      return new Promise<any[]>((resolve, reject) => {
        if (f) {
          var fr = new FileReader();
          fr.onloadend = () => {
            if (typeof fr.result == "string") {
              var str: string = fr.result || "";
              //   console.log("str", str);

              var byline = str
                .split("\r")
                .join("")
                .split("\n")
                .reduce((s, c) => {
                  s.push(c.split("\t").map((o) => o.split('"').join("").replace(",", "").trim()));
                  return s;
                }, [] as string[][]);

              //console.log("byline", byline);

              byline.map((entry, index) => {
                if (entry[1] && entry[1].length > 1) {
                  if (entry[0] !== "IDNUMBER" && entry[0] !== "-------------") {
                    if (entry[1] === byline[index + 1][1]) {
                      //   console.log("???", entry[0], byline[index + 1][0]);
                      byline[index + 1][0] = entry[0];
                    }
                  }
                }

                if (
                  entry[0] != "Thu Jul 08" &&
                  entry[8] != "Siyaya Dec" &&
                  entry[10] != "0585338/0" &&
                  entry[1] != "---------------" &&
                  entry[17] != "" &&
                  entry[3] != "EMPLOYME" &&
                  entry.length > 1
                ) {
                  //   console.log("keep", entry);
                  allDtata.push(entry);
                }
              });

              //console.log("??", allDtata);
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

export class Upload_histories_component extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      uploadState_error: "waiting",
      uploadState_zero: "waiting",
      uploadState_history: "waiting",
      data_error: [],
      data_history: [],
      data_zero: {}
    };
  }

  handle_error_upload(e: any) {
    e.preventDefault();
    this.setState({ uploadState_error: "busy" });

    handleUpload_error_report(e)
      .then((done) => {
        // console.log("done", done);
        this.setState({ data_error: done, uploadState_error: "sucess" });
        this.finalCheck();
      })
      .catch((error) => {
        console.error("ERROR IN UPLOAD", error);
        this.setState({ uploadState_error: "error" });
      });
  }

  handle_zero_upload(e: any) {
    e.preventDefault();
    this.setState({ uploadState_zero: "busy" });

    handleUpload_zero_data(e)
      .then((done) => {
        // console.log("done", done);
        this.setState({ uploadState_zero: "sucess", data_zero: done });
        this.finalCheck();
      })
      .catch((error) => {
        console.error("ERROR IN UPLOAD", error);
        this.setState({ uploadState_zero: "error" });
      });
  }

  handle_history_upload(e: any) {
    e.preventDefault();
    this.setState({ uploadState_history: "busy" });

    handleUpload_multi_tsv_files(e)
      .then((done) => {
        // console.log("done", done);
        this.setState({ data_history: done, uploadState_history: "sucess" });
        this.finalCheck();
      })
      .catch((error) => {
        console.error("ERROR IN UPLOAD", error);
        this.setState({ uploadState_history: "error" });
      });
  }

  finalCheck() {
    if (this.state.uploadState_error == "sucess" && this.state.uploadState_history == "sucess" && this.state.uploadState_zero == "sucess") {
      this.props.callbackforData(this.state);
    }
  }

  render() {
    return (
      <>
        <IonItem style={{ align: "center" }}>
          <IonLabel>Error report: </IonLabel>
          <input type='file' accept='*.xlsx' onChange={(e) => this.handle_error_upload(e)} />
          <IonLabel color={setColor(this.state.uploadState_error)}>
            {this.state.uploadState_error == "busy" ? <IonSpinner color={setColor(this.state.uploadState_error)} name='bubbles' /> : <></>}
            Status: {this.state.uploadState_error}
          </IonLabel>
        </IonItem>

        <IonItem style={{ align: "center" }}>
          <IonLabel>Use for zero data: </IonLabel>
          <input type='file' accept='*.xlsx' onChange={(e) => this.handle_zero_upload(e)} />
          {this.state.uploadState_zero == "busy" ? <IonSpinner color={setColor(this.state.uploadState_zero)} name='bubbles' /> : <></>}
          <IonLabel color={setColor(this.state.uploadState_zero)}>Status: {this.state.uploadState_zero}</IonLabel>
        </IonItem>

        <IonItem style={{ align: "center" }}>
          <IonLabel>History Data: </IonLabel>
          <input type='file' accept='*.txt' multiple onChange={(e) => this.handle_history_upload(e)} />
          <IonLabel color={setColor(this.state.uploadState_history)}>
            {this.state.uploadState_history == "busy" ? <IonSpinner color={setColor(this.state.uploadState_history)} name='bubbles' /> : <></>}
            Status: {this.state.uploadState_history}
          </IonLabel>
        </IonItem>
      </>
    );
  }
}

export default Upload_histories_component;
