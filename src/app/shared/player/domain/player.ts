import {Card} from "../../card/card";
import {ManaPool} from "../../mana/domain/mana-pool";

export class Player {

  id: string;
  name: string;
  myPlayer: boolean;
  deckSize: number;
  life: number;
  handSize: number = 0;
  hand: Card[] = [];
  battlefield: Card[] = [];
  manaPool: ManaPool = new ManaPool();
}
