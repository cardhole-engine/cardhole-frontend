import {Message} from "./message";

export class CreateGameMessage extends Message {

  name: string;

  constructor(name: string) {
    super('CreateGameIncomingMessage');

    this.name = name;
  }
}
