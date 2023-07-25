import {JoinGameOutgoingMessagePlayer} from "./join-game-outgoing-message-player";
import {Message} from "./message";

export class JoinGameOutgoingMessage extends Message {

  name: string;
  players: JoinGameOutgoingMessagePlayer[];
}
