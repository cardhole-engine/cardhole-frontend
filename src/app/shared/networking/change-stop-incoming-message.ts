import {Message} from "./message";

export class ChangeStopIncomingMessage extends Message {

  step: string;
  myTurn: boolean;
  newValue: boolean;

  constructor(step: string, myTurn: boolean, newValue: boolean) {
    super('ChangeStopIncomingMessage')

    this.step = step;
    this.myTurn = myTurn;
    this.newValue = newValue;
  }
}
