import {Message} from "./message";

export class MarkCardIsBlockingOutgoingMessage extends Message {

  blocker: string;
  blocked: string;
}
