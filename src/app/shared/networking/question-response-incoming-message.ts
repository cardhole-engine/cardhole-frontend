import {Message} from "./message";

export class QuestionResponseIncomingMessage extends Message {

  response: string;

  constructor(response: string) {
    super('QuestionResponseIncomingMessage');

    this.response = response;
  }
}
