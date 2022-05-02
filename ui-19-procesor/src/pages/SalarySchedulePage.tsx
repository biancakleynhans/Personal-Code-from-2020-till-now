import React, { Component } from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import Upload_ui19_component from "../components/Upload_ui19_component";
import Upload_salaryScedule_component from "../components/Upload_salaryScedule_component";
import Upload_histories_component from "../components/Upload_histories_component";
import { dataSpotsOBJ, iYearSpots } from "../models/SalarySchedule_models";
import PerPersonDataCompiler from "../components/PerPersonDataCompiler";

interface iProps {}

interface iState {
  processState: "busy" | "sucess" | "error" | "waiting";
  SS: "busy" | "sucess" | "error" | "waiting";
  HS: "busy" | "sucess" | "error" | "waiting";
  UI: "busy" | "sucess" | "error" | "waiting";

  data_error: string[][];
  data_zero: iYearSpots;
  data_history: string[][];
  SSdataSpotToFill: dataSpotsOBJ;
  reqForm: any;
  UI_data: { [k: string]: any[] };
}

export class SalarySchedulePage extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      processState: "waiting",
      data_error: [],
      data_history: [],
      data_zero: {},
      SS: "waiting",
      HS: "waiting",
      UI: "waiting",
      SSdataSpotToFill: {} as dataSpotsOBJ,
      reqForm: null,
      UI_data: {}
    };
  }

  getDataUI(data: { [k: string]: any[] }) {
    console.log("CB UI:", data);
    this.setState({ UI_data: data, UI: "sucess" });
    this.finalcheck();
  }

  getDataSS(data: { reqForm: any; dataSportToFill: dataSpotsOBJ }) {
    console.log("CB SS:", data);
    this.setState({ SSdataSpotToFill: data.dataSportToFill, reqForm: data.reqForm, SS: "sucess" });
    this.finalcheck();
  }

  getDataHS(data: { data_error: string[][]; data_zero: iYearSpots; data_history: string[][] }) {
    console.log("CB HS:", data);
    this.setState({ data_error: data.data_error, data_history: data.data_history, data_zero: data.data_zero, HS: "sucess" });
    this.finalcheck();
  }

  finalcheck() {
    if (this.state.HS == "sucess" && this.state.SS == "sucess" && this.state.UI == "sucess") {
      this.setState({ processState: "sucess" });
    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonBackButton defaultHref='/' />
              <IonTitle>Salary Scedule Generator</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <br />
        <IonContent>
          <Upload_ui19_component callbackforData={(data) => this.getDataUI(data)} retrieveData={true} multi={true} />
          <Upload_salaryScedule_component callbackforData={(data) => this.getDataSS(data)} retrieveData={false} multi={false} />
          <Upload_histories_component callbackforData={(data) => this.getDataHS(data)} />

          <br />
          {this.state.processState === "sucess" ? (
            <PerPersonDataCompiler
              hist={this.state.data_history}
              perMonth={this.state.UI_data}
              status={this.state.processState}
              idsReq={this.state.data_error}
              reqForm={this.state.reqForm}
              dataSportToFill={this.state.SSdataSpotToFill}
              zeroData={this.state.data_zero}
            />
          ) : (
            <></>
          )}
        </IonContent>
      </IonPage>
    );
  }
}

export default SalarySchedulePage;
