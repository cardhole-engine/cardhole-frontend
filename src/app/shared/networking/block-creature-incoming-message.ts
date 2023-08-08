import {Message} from "./message";

export class BlockCreatureIncomingMessage extends Message {

  blockWith: string;
  blockWhat: string;

  constructor(blockWith: string, blockWhat: string) {
    super('BlockCreatureIncomingMessage');

    this.blockWith = blockWith;
    this.blockWhat = blockWhat;
  }
}
