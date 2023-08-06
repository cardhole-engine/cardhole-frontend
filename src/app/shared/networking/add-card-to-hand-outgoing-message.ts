import {Message} from "./message";

export class AddCardToHandOutgoingMessage extends Message {

  id: string;
  name: string;
  set: string;
  setId: number;
}
