import {Component} from '@angular/core';
import {GameState} from "./game-state";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor(
    public gameState: GameState
  ) {
  }
}
