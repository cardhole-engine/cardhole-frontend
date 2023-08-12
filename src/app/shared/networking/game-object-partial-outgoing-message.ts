import {Ability} from "../card/ability";

export class GameObjectPartialOutgoingMessage {

  id: string;
  name: string;
  ownerId: string;
  activatedAbilities: Ability[];
  set: string;
  setId: number;
  power: number;
  toughness: number;
}
