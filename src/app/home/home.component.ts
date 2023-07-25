import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {RunningGamePartialMessage} from "../shared/networking/running-game-partial-message";
import {ConnectionService} from "../shared/connection-service";
import {CreateGameMessage} from "../shared/networking/create-game-message";
import {RequestJoinIncomingMessage} from "../shared/networking/request-join-incoming-message";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  games: RunningGamePartialMessage[];
  createGameName: string = '';

  constructor(
    private location: Location,
    private connectionService: ConnectionService
  ) {
    // @ts-ignore
    this.games = this.location.getState().games;
  }

  createGame(): void {
    this.connectionService.sendMessage(new CreateGameMessage(this.createGameName));
  }

  joinGame(gameId: string): void {
    this.connectionService.sendMessage(new RequestJoinIncomingMessage(gameId));
  }
}
