import { IonContent, IonPage } from "@ionic/react";
import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { AnswerModel, QuestionareModel } from "../models/Questionare_models";
import QuestionarePage from "./QuestionarePage";
import ShowReport from "./ShowReportPage";
import Q1 from "../DemoData/Q1.json";
import { SiteInspection } from "../models/Inspector_models";
import QuestionareHeader from "../components/QuestionareHeader";

let Inspector: SiteInspection = {
  "Contractor Name": "Jonh Doe",
  "Copies to": "Jane.Doe@gmail.com",
  "Inspected by": "Jonh Doe",
  "Inspection Date": new Date(),
  "Overall Inspection Score": " ",
  "Project Name": "Aqua",
  "Store Number & Location": "Wild Coast Aqua Resovoir",
  Signature: "John Doe"
};

interface iState {
  isCompleted: boolean;
  questions: QuestionareModel;
  answers: AnswerModel;
  setUpcomplete: boolean;
}

export class QuestionareResultsSwitchPage extends Component<any, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isCompleted: false,
      answers: {},
      questions: Q1,
      setUpcomplete: false
    };
  }

  completedAudit(questions: QuestionareModel, answers: AnswerModel) {
    this.setState({ isCompleted: true, answers: answers, questions: questions });
    Inspector["Overall Inspection Score"] = "Acceptable";
    // console.log("completed main container page");
    // console.log("SUBMIT:", answers, "QUESTIONS", questions);
  }

  render() {
    return (
      <IonPage>
        <HeaderComponent title={""} />
        {this.state.isCompleted ? (
          <>
            <QuestionareHeader title={this.state.questions.Name[0]} count={0} total={0} isComplete={true} />
            <IonContent fullscreen>
              <ShowReport answers={this.state.answers} questions={this.state.questions} inspectorDetails={Inspector} />
            </IonContent>
          </>
        ) : (
          <QuestionarePage completed={(q, a) => this.completedAudit(q, a)} questionareToUse={Q1} inspectorDetails={Inspector} />
        )}
      </IonPage>
    );
  }
}

export default QuestionareResultsSwitchPage;
