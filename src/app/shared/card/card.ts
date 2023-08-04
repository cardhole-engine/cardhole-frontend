import {Ability} from "./ability";

export class Card {

  id: string;
  name: string;
  tapped: boolean;
  highlighted: boolean;
  activatedAbilities: Ability[];
}
