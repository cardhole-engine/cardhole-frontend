import {Message} from "./message";

export class CardEnterToBattlefieldOutgoingMessage extends Message {

  id: string;
  name: string;
  ownerId: string;
}
