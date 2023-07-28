import {Card} from "../../card/card";

export class Player {

  id: string;
  name: string;
  myPlayer: boolean;
  deckSize: number;
  life: number;
  handSize: number = 0;
  hand: Card[] = [];
  battlefield: Card[] = [];
}
