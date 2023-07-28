import {Message} from "./message";

export class ShowSingleQuestionGameMessageOutgoingMessage extends Message {

  question: string;
  responseOneId: string;
  buttonOneText: string;
}
