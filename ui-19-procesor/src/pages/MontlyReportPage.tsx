import React, { Component } from "react";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Download_csv_component from "../components/Download_csv_component";

import Download_ui19_component from "../components/Download_ui19_component";
import Upload_txt_component from "../components/Upload_txt_component";
import Upload_ui19_component from "../components/Upload_ui19_component";
import { setColor } from "../utils/Gloab_funcs";

interface iProps {}
interface iState {
  processState: "busy" | "sucess" | "error" | "waiting";
  perMonthData: { [k: string]: any[] };
  passportArr: any[];
  reqForm: any;
  csv_or_excel: "csv" | "excel";
}

export class MontlyReportPage extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      perMonthData: {},
      passportArr: [],
      reqForm: null,
      processState: "waiting",
      csv_or_excel: "csv"
    };
  }

  getDataFromComp(data: any) {
    console.log("data end", data);
    this.setState({ perMonthData: data.perMonthData, passportArr: data.passportArr, processState: "busy" });
  }

  getFormFromComp(form: any) {
    console.log("FOrm", form);
    this.setState({ reqForm: form, processState: "sucess" });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonBackButton defaultHref='/' />
              <IonTitle>MONTHLY REPORT PAGE</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <br />

        <IonContent>
          <Upload_txt_component callbackforData={(data) => this.getDataFromComp(data)} />
          <Upload_ui19_component callbackforData={(data) => this.getFormFromComp(data)} retrieveData={false} multi={false} />

          <br />

          <IonItem>
            {this.state.processState !== "sucess" ? (
              <IonLabel color={setColor(this.state.processState)}>Process status: {this.state.processState}</IonLabel>
            ) : (
              <IonLabel color={setColor(this.state.processState)}>Done with processing data</IonLabel>
            )}
          </IonItem>

          <br />

          {this.state.processState == "sucess" ? (
            <>
              <IonToolbar>
                <IonButton
                  onClick={() => {
                    this.setState({ csv_or_excel: "csv" });
                  }}>
                  Download files in csv format
                </IonButton>
                <IonButton
                  onClick={() => {
                    this.setState({ csv_or_excel: "excel" });
                  }}>
                  Download files in xlsx format
                </IonButton>
              </IonToolbar>

              {this.state.csv_or_excel === "excel" ? <Download_ui19_component perMonthData={this.state.perMonthData} reqForm={this.state.reqForm} /> : <></>}

              {this.state.csv_or_excel === "csv" ? <Download_csv_component perMonthData={this.state.perMonthData} passportArr={this.state.passportArr} /> : <></>}
            </>
          ) : (
            <></>
          )}
        </IonContent>
      </IonPage>
    );
  }
}

export default MontlyReportPage;
