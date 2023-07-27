import {Message} from "./message";

export class ShowDualQuestionGameMessage extends Message {

  question: string;
  buttonOneText: string;
  buttonTwoText: string;
  responseOneId: string;
  responseTwoId: string;
}
