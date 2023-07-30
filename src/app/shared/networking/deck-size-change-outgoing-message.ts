import {Message} from "./message";

export class DeckSizeChangeOutgoingMessage extends Message {

  playerId: string;
  deckSize: number;
}
