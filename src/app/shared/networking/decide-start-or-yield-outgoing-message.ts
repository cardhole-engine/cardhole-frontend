import {Message} from "./message";

export class DecideStartOrYieldOutgoingMessage extends Message {

  shouldIStart: boolean;
}
