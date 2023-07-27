import {Message} from "./message";

export class ShowDualQuestionGameMessageOutgoingMessage extends Message {

  question: string;
  buttonOneText: string;
  buttonTwoText: string;
  responseOneId: string;
  responseTwoId: string;
}
