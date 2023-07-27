import {Message} from "./message";

export class PlayerJoinedOutgoingMessage extends Message {

  id: string;
  name: string;
  deckSize: number;
  life: number;
}
