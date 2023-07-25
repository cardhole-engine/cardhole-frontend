import {Component} from '@angular/core';
import {ConnectionService} from "../shared/connection-service";
import {CreateGameMessage} from "../shared/networking/create-game-message";
import {RequestJoinIncomingMessage} from "../shared/networking/request-join-incoming-message";
import {LobbyState} from "./lobby-state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  createGameName: string = '';

  constructor(
    public gameStateOnLobby: LobbyState,
    private connectionService: ConnectionService
  ) {
  }

  createGame(): void {
    this.connectionService.sendMessage(new CreateGameMessage(this.createGameName));
  }

  joinGame(gameId: string): void {
    this.connectionService.sendMessage(new RequestJoinIncomingMessage(gameId));
  }
}
