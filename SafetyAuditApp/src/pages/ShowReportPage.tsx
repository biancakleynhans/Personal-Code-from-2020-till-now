import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonTitle } from "@ionic/react";
import React, { Component, Fragment } from "react";
import { UserPhoto } from "../hooks/UseCamera";
import { SiteInspection } from "../models/Inspector_models";
import { AnswerModel, QuestionareModel, Answer } from "../models/Questionare_models";
import GenerateExcelAudit from "./GenerateExcelAudit";

interface iProps {
  questions: QuestionareModel;
  answers: AnswerModel;
  inspectorDetails: SiteInspection;
}

export class ShowReport extends Component<iProps> {
  constructor(props: any) {
    super(props);
    console.log("completed main container page");
    console.log("SUBMIT:", this.props.answers, "QUESTIONS", this.props.questions);
  }

  render() {
    return (
      <IonCard>
        <IonCardHeader>
          <IonTitle color='primary'> Results of Audit </IonTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            {Object.keys(this.props.questions).map((key) => {
              // console.log("Q", this.props.questions[key], this.props.answers[key]);
              if (key != "Name") {
                return (
                  <Fragment key={key}>
                    <IonRow>
                      <IonCol size='12'>
                        <IonLabel color='secondary'>{key}</IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonLabel color='secondary'>Question</IonLabel>
                      </IonCol>
                      <IonCol>
                        <IonLabel color='secondary'>Score</IonLabel>
                      </IonCol>
                      <IonCol>
                        <IonLabel color='secondary'>Actions/Comments</IonLabel>
                      </IonCol>
                    </IonRow>
                    {this.props.questions[key].map((e, index) => {
                      const curr: Answer = this.props.answers[key][index];
                      // console.log("Q", this.props.questions[key][index], this.props.answers[key][index], curr);
                      return (
                        <Fragment key={e}>
                          <IonRow>
                            <IonCol color='tertiary'>{this.props.questions[key][index]}</IonCol>
                            <IonCol>{curr.score}</IonCol>
                            <IonCol>{curr.Actions}</IonCol>
                          </IonRow>

                          <IonRow>
                            {curr.images.map((img: UserPhoto, index) => {
                              return (
                                <IonCol key={index}>
                                  <IonImg style={{ maxHeight: "100px", maxWidth: "100px" }} src={img.webviewPath} alt='broken' />
                                </IonCol>
                              );
                            })}
                          </IonRow>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              }
            })}
          </IonGrid>
          <GenerateExcelAudit questions={this.props.questions} answers={this.props.answers} inspectorDetails={this.props.inspectorDetails} />
        </IonCardContent>
      </IonCard>
    );
  }
}

export default ShowReport;
