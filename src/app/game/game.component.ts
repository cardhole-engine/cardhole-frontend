import {Component} from '@angular/core';
import {Game} from "../shared/game/domain/game";
import {Location} from "@angular/common";
import {ConnectionService} from "../shared/connection-service";
import {GameState} from "./game-state";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor(
    public gameState: GameState,
    private location: Location,
    private connectionService: ConnectionService
  ) {
    // @ts-ignore
    this.game = this.location.getState().game;
  }
}
