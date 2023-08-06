import {Ability} from "./ability";

export class Card {

  id: string;
  name: string;

  set: string;
  setId: number;

  tapped: boolean;
  highlighted: boolean;
  activatedAbilities: Ability[];
}
