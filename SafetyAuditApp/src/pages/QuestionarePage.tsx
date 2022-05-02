import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonRow } from "@ionic/react";
import moment from "moment";
import React, { Component, Fragment } from "react";
import ImageRemoveFromListComponent from "../components/ImageRemoveFromListComponent";
import QuestionareHeader from "../components/QuestionareHeader";
import QuestionComponent from "../components/QuestionComponent";
import { UserPhoto } from "../hooks/UseCamera";
import { SiteInspection } from "../models/Inspector_models";
import { Answer, AnswerModel, QuestionareModel } from "../models/Questionare_models";

interface iState {
  questionare: QuestionareModel;
  answers: AnswerModel;
  isModal: boolean;
  currComp: number;
  totalQ: number;
}

interface iProps {
  completed: (questions: QuestionareModel, answers: AnswerModel) => void;
  questionareToUse: QuestionareModel;
  inspectorDetails: SiteInspection;
}

export function getTotalQ(questionareToUse: QuestionareModel) {
  let inner = -1;
  Object.keys(questionareToUse).forEach((entry) => {
    const ii = Object.keys(questionareToUse[entry]).length;
    inner += ii;
    // console.log("????", inner + ii);
  });
  // console.log("????", inner);
  return inner;
}

export class QuestionarePage extends Component<iProps, iState> {
  constructor(props: any) {
    super(props);

    this.state = {
      questionare: this.props.questionareToUse,
      answers: {},
      isModal: false,
      currComp: 0,
      totalQ: getTotalQ(this.props.questionareToUse)
    };
  }

  answerCallBack(ans: Answer, maingroup: string, indexOfQuest: number) {
    let answerModel = {} as AnswerModel;
    // console.log("CALLBACK::", maingroup, indexOfQuest, ans, this.state.questionare[maingroup][indexOfQuest], this.state.answers[maingroup][indexOfQuest]);

    if (Object.keys(this.state.answers).length == 0) {
      Object.keys(this.state.questionare).map((key) => {
        answerModel[key] = [];
        this.state.questionare[key].forEach(() => {
          const newO: Answer = { images: [], score: "N/A", Actions: "" };
          answerModel[key].push(newO);
        });
      });
    } else {
      answerModel = this.state.answers;
    }

    if (ans.images.length == 0) {
      answerModel[maingroup][indexOfQuest] = ans;
    } else {
      ans.images.forEach((img) => {
        if (img) {
          answerModel[maingroup][indexOfQuest].images.push(img);
        }
      });
      answerModel[maingroup][indexOfQuest].Actions = ans.Actions;
      answerModel[maingroup][indexOfQuest].score = ans.score;
    }

    const m: number = Object.keys(answerModel).indexOf(maingroup);
    const i: number = indexOfQuest;
    const tot: number = m + i;
    const use: number = tot < this.state.currComp ? this.state.currComp + 1 : tot;
    const check: number = this.state.currComp == 0 ? 1 : use;

    // console.log("Added", answerModel[maingroup][indexOfQuest].images, m, i, tot, use, check);
    this.setState({ answers: answerModel, currComp: check }); //
    window.localStorage.clear();
  }

  submitAudit() {
    const conf = window.confirm("You are now submitting the audit, no more changes can be made please ensure all info is correct, if not please press cancel");

    if (conf) {
      this.props.completed(this.state.questionare, this.state.answers);
    }
  }

  handleImageChange(image: UserPhoto | undefined, main: string, indexOfQ: number, indexOfImg: number) {
    // console.log("Remove", main, indexOfQ, indexOfImg, "should?", image);

    if (image !== undefined) {
      let old = this.state.answers;
      old[main][indexOfQ].images.splice(indexOfImg, 1);

      this.setState({ answers: old, isModal: false });
    } else {
      this.setState({ isModal: false });
    }

    // console.log("DONE???", this.state.answers[main][indexOfQ].images);
  }

  render() {
    return (
      <>
        <QuestionareHeader title={this.state.questionare["Name"][0]} count={this.state.currComp} total={this.state.totalQ} isComplete={false} />
        <IonContent fullscreen>
          {/* This is the spesific inspector or contractors details */}
          <IonCard>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>Inspected by:</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>{this.props.inspectorDetails["Inspected by"]}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>Contractor Name:</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>{this.props.inspectorDetails["Contractor Name"]}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>Project Name:</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>{this.props.inspectorDetails["Project Name"]}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>Store Number & Location:</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>{this.props.inspectorDetails["Store Number & Location"]}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>Inspection Date:</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>{moment(this.props.inspectorDetails["Inspection Date"]).format("DD MMM YY")}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>Overall Inspection Score:</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel class='ion-text-wrap'>{this.props.inspectorDetails["Overall Inspection Score"]}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* This is the actual questionaire aka audit */}
          <IonList>
            {Object.keys(this.state.questionare).map((q, index) => {
              if (q != "Name") {
                //   console.log("??? Q", q, this.state.questionare[q]);
                return (
                  <IonItemGroup key={index}>
                    <IonItemDivider color='medium' sticky>
                      <IonListHeader color='medium' slot='start'>
                        {q}
                      </IonListHeader>
                    </IonItemDivider>
                    {this.state.questionare[q].map((quest, index) => {
                      return (
                        <Fragment key={index}>
                          <QuestionComponent question={quest} answers={(ans: Answer) => this.answerCallBack(ans, q, index)} />

                          {/* Images and action text to be displayed  */}
                          <IonGrid>
                            <IonRow>
                              {this.state.answers != undefined && this.state.answers[q] != undefined && this.state.answers[q][index] != undefined ? (
                                <IonLabel color='warning' class='ion-text-wrap'>
                                  Actions required: {this.state.answers[q][index].Actions}
                                </IonLabel>
                              ) : (
                                <></>
                              )}
                            </IonRow>
                            <IonRow>
                              {this.state.answers != undefined && this.state.answers[q] != undefined && this.state.answers[q][index] != undefined ? (
                                this.state.answers[q][index].images.map((img, indexOfImg) => {
                                  if (!this.state.isModal) {
                                    return (
                                      <IonCol size='6' key={indexOfImg}>
                                        <IonItem
                                          lines='none'
                                          button
                                          onClick={() => {
                                            this.setState({ isModal: true });
                                          }}>
                                          <IonImg style={{ maxHeight: "350px", maxWdith: "350px", minHeight: "175px", minWdith: "175px" }} src={img.webviewPath} alt='broken' />
                                        </IonItem>
                                      </IonCol>
                                    );
                                  } else {
                                    return (
                                      <ImageRemoveFromListComponent
                                        image={img}
                                        indexOfImg={indexOfImg}
                                        indexOfQ={index}
                                        main={q}
                                        callback={(image) => this.handleImageChange(image, q, index, indexOfImg)}
                                      />
                                    );
                                  }
                                })
                              ) : (
                                <></>
                              )}
                            </IonRow>
                          </IonGrid>
                        </Fragment>
                      );
                    })}
                  </IonItemGroup>
                );
              }
            })}

            <IonButton onClick={() => this.submitAudit()}>Complete Audit </IonButton>
          </IonList>
        </IonContent>
      </>
    );
  }
}

export default QuestionarePage;
