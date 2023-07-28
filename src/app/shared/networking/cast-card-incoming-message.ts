import {Message} from "./message";

export class CastCardIncomingMessage extends Message {

  cardId: string;
  target: string | null;
  targetType: string | null;

  constructor(cardId: string, target: string | null, targetType: string | null) {
    super('CastCardIncomingMessage');

    this.cardId = cardId;
    this.target = target;
    this.targetType = targetType;
  }
}
