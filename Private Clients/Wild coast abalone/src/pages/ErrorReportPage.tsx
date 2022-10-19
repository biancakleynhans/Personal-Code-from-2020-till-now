import React, { Component } from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from "file-saver";
import { setColor } from "../utils/Gloab_funcs";

interface iState {
  uploadState: "busy" | "sucess" | "error" | "waiting";
}

interface iPersonError {
  idNumber: string;
  name: string;
  surname: string;
  timespans_error_codes: iError_entry[];
}

interface iError_entry {
  start: string;
  end: string;
  code: string;
}

function create_entry(row: string[]) {
  var new_line: string[] = [];
  if (row.indexOf("R105") != -1 || row.indexOf("R106") != -1 || row.indexOf("R107") != -1) {
    var error_pos = 0;
    var error_code = "";
    var id = "";
    var fn = "";
    var ln = "";
    var start = "";
    var end = "";
    if (row.indexOf("R105") != -1) {
      error_pos = row.indexOf("R105");
      error_code = row[error_pos];
    } else if (row.indexOf("R106") != -1) {
      error_pos = row.indexOf("R106");
      error_code = row[error_pos];
    } else if (row.indexOf("R107") != -1) {
      error_pos = row.indexOf("R107");
      error_code = row[error_pos];
    }

    if (row.length === 8) {
      id = row[error_pos - 1];
      fn = row[error_pos - 3];
      ln = row[error_pos - 2];
      start = row[row.indexOf("to") - 1];
      end = row[row.indexOf("to") + 1];
      //   console.log("row length 8", id, start, end, error_code, ln, fn);
    } else if (row.length === 9) {
      id = row[error_pos - 1];
      fn = row[error_pos - 3];
      ln = row[error_pos - 2];
      start = row[row.indexOf("to") - 1];
      end = row[row.indexOf("to") + 1];
      //   console.log("row length 9", id, start, end, error_code, ln, fn);
    } else if (row.length === 10) {
      id = row[error_pos - 1];
      fn = `${row[error_pos - 4]} ${row[error_pos - 3]}`;
      ln = row[error_pos - 2];
      start = row[row.indexOf("to") - 1];
      end = row[row.indexOf("to") + 1];
      //   console.log("row length 10", id, start, end, error_code, ln, fn);
    } else if (row.length === 11) {
      // DE X
      if (row[3] == "DE") {
        id = row[error_pos - 1];
        fn = `${row[1]} ${row[row.indexOf("DE") - 1]}`;
        ln = row[error_pos - 2];
        start = row[row.indexOf("to") - 1];
        end = row[row.indexOf("to") + 1];
        // console.log("Dubble surname ", id, start, end, error_code, ln, fn);
      }
      //   VAN DER X
      else if (row[3] == "DER") {
        id = row[error_pos - 1];
        fn = row[1];
        ln = `${row[row.indexOf("DER") - 1]} DER ${row[row.indexOf("DER") + 1]}`;
        start = row[row.indexOf("to") - 1];
        end = row[row.indexOf("to") + 1];
        // console.log("Tripple surname ", id, start, end, error_code, ln, fn);
      }
      //JANE JOHN ERIE DOE
      else {
        id = row[error_pos - 1];
        fn = `${row[error_pos - 5]} ${row[error_pos - 4]} ${row[error_pos - 3]}`;
        ln = row[error_pos - 2];
        start = row[row.indexOf("to") - 1];
        end = row[row.indexOf("to") + 1];
        // console.log("three names ", id, start, end, error_code, ln, fn);
      }
    } else {
      //   console.log("ROW LONGER THAN 11 or Shorter than 9", row);
      id = row[error_pos - 1];
      fn = row[error_pos - 3] !== undefined ? row[error_pos - 3] : "";
      ln = row[error_pos - 2] !== undefined ? row[error_pos - 2] : "";
      start = row[row.indexOf("to") - 1];
      end = row[row.indexOf("to") + 1];
    }

    new_line = [id, start, end, error_code, ln, fn];
    // console.log(`${row.length} final: `, new_line);
  }
  return new_line;
}

function create_obj_from_arr(arr: string[][]) {
  //   console.log("arr", arr);

  const personsByIdnumber: Record<string, iPersonError> = {};
  let lastPerson: iPersonError | undefined = undefined;

  arr.forEach((entry: string[]) => {
    // console.log("entry", entry);
    let possibleId = entry[0];
    if (possibleId) {
      let p = personsByIdnumber[possibleId];
      if (!p) {
        p = {
          idNumber: possibleId,
          name: entry[5],
          surname: entry[4]
        } as iPersonError;
        p.timespans_error_codes = [];
        personsByIdnumber[possibleId] = p;
      }
      lastPerson = p;
    }
    if (lastPerson && lastPerson.idNumber == entry[0]) {
      var new_entry: iError_entry = {} as iError_entry;
      new_entry.start = entry[1];
      new_entry.end = entry[2];
      new_entry.code = entry[3];

      lastPerson.timespans_error_codes.push(new_entry);
    }
  });
  //   console.log("create_obj_from_arr", Object.keys(personsByIdnumber).length, personsByIdnumber);
  return personsByIdnumber;
}

export class ErrorReportPage extends Component<any, iState> {
  constructor(props: any) {
    super(props);

    this.state = {
      uploadState: "waiting"
    };
  }

  handleUpload(e: any) {
    e.preventDefault();
    this.setState({ uploadState: "busy" });

    /* Single file */
    var files = e.target.files;
    var file = files[0];
    const fr = new FileReader();

    fr.onloadend = () => {
      if (typeof fr.result == "string") {
        var str: string = fr.result || "";
        // console.log('str', str)
        var byline = str
          .split("\r")
          .join("")
          .split("\n")
          .join("")
          .split("0585338/0")
          .reduce((s, c) => {
            // console.log("C", c.replace("UIF REFERENCE FIRST NAME SURNAME ID NUMBER REJECTION CODE GAP", ""));
            s.push(
              c
                .replace(" UIF REFERENCE FIRST NAME SURNAME ID NUMBER REJECTION CODE GAP ", " ")
                .split(" ")
                .map((o) => o.split('"').join("").trim())
            );

            return s;
          }, [] as string[][]);

        // console.log("BYLINE", byline);
        var data: any[] = [];
        byline.map((row: string[]) => {
          var entry = create_entry(row);
          data.push(entry);
        });

        // console.log("DATA", data);
        var d2 = create_obj_from_arr(data);
        this.create_excel_error_report(d2);
      }
    };
    fr.readAsText(file);
  }

  create_excel_error_report(data: Record<string, iPersonError>) {
    this.setState({ uploadState: "sucess" });
    // console.log("DATA", data);
    var headers = [
      "ID",
      "NAME",
      "SURNAME",
      "ERROR CODE 1",
      "START 1",
      "END 1",
      "ERROR CODE 2",
      "START 2",
      "END 2",
      "ERROR CODE 3",
      "START 3",
      "END 3",
      "ERROR CODE 4",
      "START 4",
      "END 4",
      "ERROR CODE 5",
      "START 5",
      "END 5"
    ];

    // /* create a new blank workbook */
    var wb = new Excel.Workbook();

    /* Add the worksheet to the workbook */
    const sheet = wb.addWorksheet("Sheet 1");

    var ws_data: string[][] = [];

    ws_data[0] = headers;
    Object.keys(data).map((key: string, index) => {
      var curr: iPersonError = data[key];
      var converted = [curr.idNumber, curr.name, curr.surname];

      for (let i = 0; i < curr.timespans_error_codes.length; i++) {
        const element = curr.timespans_error_codes[i];
        converted.push(element.code, element.start, element.end);
      }
      // console.log("CONVERTED", converted);
      ws_data[index + 1] = converted;
    });

    /* Add the data to the worksheet */
    sheet.addRows(ws_data);

    /* output format determined by filename */
    this.FormDownloadComplete(wb, "Errors.xlsx");
  }

  async FormDownloadComplete(wb_in: any, fname: string) {
    var wb = new Excel.Workbook();
    wb = wb_in;
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fname);
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons>
                <IonBackButton defaultHref='/' />
                <IonTitle>Error Report Generator</IonTitle>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonItem>
            <IonLabel>Please upload the error report for Uif as a .txt file</IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Error report: </IonLabel>
            <input type='file' onChange={(e) => this.handleUpload(e)} />

            <IonLabel color={setColor(this.state.uploadState)}>
              {this.state.uploadState == "busy" ? <IonSpinner color={setColor(this.state.uploadState)} name='bubbles' /> : <></>}
              Status: {this.state.uploadState}
            </IonLabel>
          </IonItem>
        </IonContent>
      </IonPage>
    );
  }
}

export default ErrorReportPage;
