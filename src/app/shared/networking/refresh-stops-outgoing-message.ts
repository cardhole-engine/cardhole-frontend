import {Message} from "./message";

export class RefreshStopsOutgoingMessage extends Message {

  stopAtStepInMyTurn: any;
  stopAtStepInOpponentTurn: any;
}
