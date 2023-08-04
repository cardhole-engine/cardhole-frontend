import {Message} from "./message";
import {Ability} from "../card/ability";

export class CardEnterToBattlefieldOutgoingMessage extends Message {

  id: string;
  name: string;
  ownerId: string;
  activatedAbilities: Ability[];
}
