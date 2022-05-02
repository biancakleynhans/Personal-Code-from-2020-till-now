import React, { Component, Fragment } from "react";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from "file-saver";
import { Entry } from "../models/txt_models";
import { IonButton, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonSpinner } from "@ionic/react";
import { setColor } from "../utils/Gloab_funcs";
import { get2percent } from "../utils/Conversion_funcs";

interface iProps {
  perMonthData: { [k: string]: any[] };
  reqForm: any;
  useForForm?: boolean;
}

interface iState {
  process: "Waiting" | "Starting" | "Sucessfully";
  currDownLoad: number;
  allBooks: { book: any; name: string }[];
  bookDone: number;
  prevdone: boolean;
}

export class Download_ui19_component extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      process: "Waiting",
      currDownLoad: 0,
      bookDone: 0,
      allBooks: [],
      prevdone: true
    };
  }

  componentDidMount() {
    this.setState({ process: "Starting" });
    this.ExcelCreation(this.props.perMonthData, this.state.prevdone, this.props.reqForm).then((completed) => {
      console.log("completed", completed);
      this.setState({ process: "Sucessfully", allBooks: completed });
    });
  }

  async ExcelCreation(perMonth: any, prevdone: any, reqForm: any) {
    var allBooks: { book: any; name: string }[] = [];
    await Promise.all(
      Object.keys(perMonth).map((key) => {
        // console.log("key", key, perMonth[key]);
        return new Promise<{ book: any; name: string }[]>((resolve, reject) => {
          if (prevdone) {
            this.setState({ prevdone: false });

            var files = this.props.reqForm.target.files;
            var file = files[0];
            var fname = this.props.useForForm ? `05853380_${key}_WCA.xlsx` : `05853380_${key}.xlsx`;

            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = (e) => {
              if (e.target) {
                const buffer = reader.result;

                const wb = new Excel.Workbook();
                wb.xlsx.load(buffer).then((workbook: any) => {
                  var ws0 = workbook.worksheets[0];
                  var ws1 = workbook.worksheets[1];

                  const cell = ws0.getCell("I2");
                  cell.value = Number(key.replace("_", "").replace("/", ""));

                  perMonth[key].map((entry: Entry, index: number) => {
                    // ERROR CHECK
                    if (entry["Remuneration subject to UIF"] == "8001") {
                      console.error(index, "ENTRY", entry);
                    }

                    const getVal =
                      entry["Employment Status Code"].length > 2
                        ? entry["Employment Status Code"]
                        : entry["Employment End Date"].length > 2 && entry["Employment Status Code"].length < 2
                        ? "Contract Expired"
                        : null;

                    const GTR: Number = Number(`${Number(entry["Gross Taxable Remuneration"]).toFixed(2)}`) > 2 ? Number(`${Number(entry["Gross Taxable Remuneration"]).toFixed(2)}`) : 0;

                    //entry["Reason for Non Contribution"]
                    const RFNC: string | null = GTR < 2 ? "No income paid for the payroll period" : null;
                    const RStU: Number = GTR > 2 ? Number(`${Number(entry["Remuneration subject to UIF"]).toFixed(2)}`) : 0;
                    const UIF2per: Number = GTR > 2 ? Number(Number(entry["2% - UIF Contribution"]).toFixed(2)) : 0;

                    console.log("???", GTR, RStU, UIF2per, UIF2per !== 0 ? UIF2per : get2percent(entry["Gross Taxable Remuneration"].toString()));

                    // // Iterate over all rows (including empty rows) in a worksheet
                    ws1.eachRow({ includeEmpty: true }, function (row: any, rowNumber: number) {
                      ws1.getRow(index + 2).getCell(1).value = entry["Record type"];
                      ws1.getRow(index + 2).getCell(2).value = entry["UIF Reference Number"];
                      ws1.getRow(index + 2).getCell(3).value = Number(entry["Identity Number"]);
                      ws1.getRow(index + 2).getCell(4).value = entry["Other Numbers"];
                      ws1.getRow(index + 2).getCell(5).value = entry["Personnel/Clock Card Number"];
                      ws1.getRow(index + 2).getCell(6).value = entry["Surname"];
                      ws1.getRow(index + 2).getCell(7).value = entry["First Name"];
                      ws1.getRow(index + 2).getCell(8).value = new Date(entry["Date of Birth"]);
                      ws1.getRow(index + 2).getCell(8).numFmt = "yyyy/mm/dd";
                      ws1.getRow(index + 2).getCell(9).value = new Date(entry["Employment Start Date"]);
                      ws1.getRow(index + 2).getCell(9).numFmt = "yyyy/mm/dd";
                      ws1.getRow(index + 2).getCell(10).value = entry["Employment End Date"].length > 2 ? new Date(entry["Employment End Date"]) : null;
                      ws1.getRow(index + 2).getCell(10).numFmt = "yyyy/mm/dd";
                      ws1.getRow(index + 2).getCell(11).value = getVal;
                      ws1.getRow(index + 2).getCell(12).value = RFNC;
                      ws1.getRow(index + 2).getCell(13).value = GTR;
                      ws1.getRow(index + 2).getCell(14).value = RStU;
                      ws1.getRow(index + 2).getCell(15).value = UIF2per !== 0 ? UIF2per : Number(get2percent(entry["Gross Taxable Remuneration"].toString()));

                      // console.log("???????????", ws1.getRow(rowNumber).getCell(15).value);

                      row.commit();
                    });
                  });

                  allBooks.push({ book: wb, name: fname });
                  this.setState({ currDownLoad: this.state.currDownLoad + 1, prevdone: true });

                  console.log("DONE WRITING->", fname, allBooks.length);
                  resolve(allBooks);
                });
              }
            };
            if (rABS) reader.readAsBinaryString(file);
            else reader.readAsArrayBuffer(file);
          }
        });
      })
    );

    return Promise.resolve(allBooks);
  }

  async FormDownloadComplete(wb_in: any, fname: string) {
    var wb = new Excel.Workbook();
    wb = wb_in;
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fname);
    setTimeout(() => {
      this.setState({ bookDone: this.state.bookDone + 1 });
    }, 800);
  }

  render() {
    return (
      <>
        {this.state.process != "Sucessfully" ? (
          <>
            <IonItem style={{ align: "center" }}>
              <IonLabel color={setColor(this.state.process)}>
                {this.state.process} to format to .xlsx
                <IonSpinner color={setColor(this.state.process)} name='bubbles' />
              </IonLabel>
            </IonItem>
          </>
        ) : (
          <IonItem style={{ align: "center" }}>
            <IonLabel color={setColor(this.state.process)}>{this.state.process} formatted to .xlsx </IonLabel> <br />
          </IonItem>
        )}

        <IonGrid>
          <IonRow>
            {this.state.allBooks.map((curr: { book: any; name: string }) => {
              return (
                <IonCol key={curr.name}>
                  <IonButton style={{ color: "black" }} onClick={() => this.FormDownloadComplete(curr.book, curr.name)}>
                    {curr.name}
                  </IonButton>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

export default Download_ui19_component;
