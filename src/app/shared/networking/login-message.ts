import {Message} from "./message";

export class LoginMessage extends Message {

  name: string;

  constructor(name: string) {
    super('LoginIncomingMessage');

    this.name = name;
  }
}
