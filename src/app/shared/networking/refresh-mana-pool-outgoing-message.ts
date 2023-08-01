import {Message} from "./message";

export class RefreshManaPoolOutgoingMessage extends Message {

  playerId: string;
  whiteMana: number;
  blueMana: number;
  blackMana: number;
  redMana: number;
  greenMana: number;
  colorlessMana: number;
}
