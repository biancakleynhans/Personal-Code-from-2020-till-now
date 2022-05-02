import React, { Component } from "react";
import { IonButton } from "@ionic/react";
import { saveAs } from "file-saver";
import * as Excel from "exceljs/dist/exceljs.min.js";
import moment from "moment";
import { AnswerModel, QuestionareModel } from "../models/Questionare_models";
import { SiteInspection } from "../models/Inspector_models";
import { base64FromPath, UserPhoto } from "../hooks/UseCamera";

interface iProps {
  questions: QuestionareModel;
  answers: AnswerModel;
  inspectorDetails: SiteInspection;
}
interface iState {
  completedBook: any;
}

export class GenerateExcelAudit extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      completedBook: new Excel.Workbook()
    };
  }

  componentDidMount() {
    this.createExcelBook();
  }

  getDataRowsFormat() {
    let allData: any[] = [];
    let imageData: any[] = [];
    Object.keys(this.props.questions).map((key) => {
      //   console.log("Key", key, this.props.questions[key], this.props.answers[key]);
      if (key != "Name") {
        this.props.questions[key].map((entry, index) => {
          // console.log("Key", this.props.questions[key][index], this.props.answers[key][index]);
          let newEntry = [this.props.questions[key][index], this.props.answers[key][index].score, this.props.answers[key][index].Actions];
          allData.push(newEntry);

          let ent = [this.props.answers[key][index].images];
          imageData.push(ent);
        });
      }
    });

    // console.log("allData", allData);
    return { rowData: allData, imgData: imageData };
  }

  createExcelBook() {
    const dataRows = this.getDataRowsFormat();

    // new workbook
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet("Sheet1");
    sheet.properties.defaultColWidth = 60;
    sheet.properties.defaultRowHeight = 100;
    const ws = workbook.getWorksheet("Sheet1");

    // Fill in work book
    // add a table to a sheet
    ws.addTable({
      name: "table1",
      displayName: `${this.props.questions["Name"][0]}`,
      ref: "A1",
      headerRow: true,

      style: {
        theme: "TableStyleLight1",
        showRowStripes: true,
        showColumnStripes: true
      },
      columns: [{ name: "Question" }, { name: "Score" }, { name: "Action/Comments" }, { name: "Image(s)" }],
      rows: dataRows.rowData
    });

    //AddImages

    dataRows.imgData.map((imagesArr: any, index) => {
      // console.log("???", imagesArr);
      imagesArr.map((arr: UserPhoto[]) => {
        // console.log("arr", arr);
        arr.map((image) => {
          // console.log("image", index, image);
          if (image && image.webviewPath) {
            base64FromPath(image.webviewPath).then((imgUrl) => {
              // console.log("Image url", imgUrl);

              // add image to workbook by base64
              const myBase64Image = imgUrl;
              const imageId2 = workbook.addImage({
                base64: myBase64Image,
                extension: "png"
              });

              ws.addImage(imageId2, {
                tl: { col: 3, row: index + 1 },
                ext: { width: 100, height: 100 },
                editAs: "oneCell"
              });
            });
          }
        });
      });
    });

    // Done now set new one to state
    this.setState({ completedBook: workbook });
  }

  async FormDownloadComplete(wb_in: any, fname: string) {
    var wb = new Excel.Workbook();
    wb = wb_in;
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fname);
  }

  render() {
    return (
      <IonButton
        onClick={() => {
          this.FormDownloadComplete(
            this.state.completedBook,
            `${moment(new Date()).format("YY-MM-DD")}_${this.props.questions["Name"][0]}_${this.props.inspectorDetails["Inspected by"]}.xlsx`
          );
        }}>
        Generate downloadble <br /> Audit report
      </IonButton>
    );
  }
}

export default GenerateExcelAudit;
