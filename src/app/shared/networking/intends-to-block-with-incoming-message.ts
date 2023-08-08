import {Message} from "./message";

export class IntendsToBlockWithIncomingMessage extends Message {

  cardId: string;

  constructor(cardId: string) {
    super('IntendsToBlockWithIncomingMessage');

    this.cardId = cardId;
  }
}
