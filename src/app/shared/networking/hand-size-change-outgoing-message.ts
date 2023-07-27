import {Message} from "./message";

export class HandSizeChangeOutgoingMessage extends Message {

  playerId: string;
  handSize: number;
}
