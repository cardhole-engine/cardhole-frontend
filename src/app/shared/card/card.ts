import {Ability} from "./ability";

export class Card {

  id: string;
  name: string;

  set: string;
  setId: number;

  power: number;
  toughness: number;

  tapped: boolean;
  attacking: boolean;
  highlighted: boolean;
  activatedAbilities: Ability[];
}
