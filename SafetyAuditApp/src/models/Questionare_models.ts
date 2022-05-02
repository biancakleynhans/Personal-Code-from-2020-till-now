import { UserPhoto } from "../hooks/UseCamera";

export interface QuestionareModel {
  [k: string]: string[];
}

export interface Answer {
  score: string;
  Actions: string;
  images: UserPhoto[];
}

export interface AnswerModel {
  [k: string]: Answer[];
}
