import {Message} from "./message";

export class UseActivatedAbilityIncomingMessage extends Message {

  abilityId: string;

  constructor(abilityId: string) {
    super('UseActivatedAbilityIncomingMessage');

    this.abilityId = abilityId;
  }
}
