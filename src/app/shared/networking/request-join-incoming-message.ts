import {Message} from "./message";

export class RequestJoinIncomingMessage extends Message {

  gameId: string;

  constructor(gameId: string) {
    super('RequestJoinIncomingMessage');

    this.gameId = gameId;
  }
}
