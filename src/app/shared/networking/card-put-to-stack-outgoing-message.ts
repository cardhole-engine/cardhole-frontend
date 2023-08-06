import {Message} from "./message";

export class CardPutToStackOutgoingMessage extends Message {

  id: string;
  name: string;
  ownerId: string;
  set: string;
  setId: number;
}
