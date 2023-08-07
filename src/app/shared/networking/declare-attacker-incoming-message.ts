import {Message} from "./message";

export class DeclareAttackerIncomingMessage extends Message {

  cardId: string;

  constructor(cardId: string) {
    super('DeclareAttackerIncomingMessage');

    this.cardId = cardId;
  }
}
