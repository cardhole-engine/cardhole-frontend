import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Message} from "./networking/message";
import {RefreshHomePageMessage} from "./networking/refresh-home-page-message";
import {JoinGameOutgoingMessage} from "./networking/join-game-outgoing-message";
import {Game} from "./game/domain/game";
import {Player} from "./player/domain/player";
import {LobbyState} from "../home/lobby-state";
import {GameState} from "../game/game-state";
import {PlayerJoinedOutgoingMessage} from "./networking/player-joined-outgoing-message";
import {SendLogOutgoingMessage} from "./networking/send-log-outgoing-message";
import {DecideStartOrYieldOutgoingMessage} from "./networking/decide-start-or-yield-outgoing-message";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(
    private router: Router,
    private gameState: GameState,
    private lobbyState: LobbyState,
    private sanitizer: DomSanitizer
  ) {
  }

  handleMessage(message: string): void {
    console.log("message:", message);

    let messageObj: Message = JSON.parse(message);

    switch (messageObj.type) {
      case 'RefreshHomePageOutgoingMessage':
        let refreshHomePageMessage: RefreshHomePageMessage = messageObj as RefreshHomePageMessage;

        console.log("refresh game data");

        this.lobbyState.games = refreshHomePageMessage.games;

        if (this.router.routerState.snapshot.url !== '/home') {
          this.router.navigateByUrl('/home');
        }
        break;
      case 'JoinGameOutgoingMessage':
        let joinGameOutgoingMessage: JoinGameOutgoingMessage = messageObj as JoinGameOutgoingMessage;

        let game: Game = new Game();

        game.name = joinGameOutgoingMessage.name;
        game.players = joinGameOutgoingMessage.players
          .map(msgPlayer => {
            let player: Player = new Player();

            player.name = msgPlayer.name;
            player.myPlayer = msgPlayer.myPlayer;

            return player;
          })

        this.gameState.game = game;

        this.router.navigateByUrl('/game')
        break;
      case 'PlayerJoinedOutgoingMessage':
        let playerJoinedOutgoingMessage: PlayerJoinedOutgoingMessage = messageObj as PlayerJoinedOutgoingMessage;

        let player: Player = new Player();

        player.name = playerJoinedOutgoingMessage.name;
        player.myPlayer = false;

        this.gameState.game.players.push(player);
        break;
      case 'SendLogOutgoingMessage':
        let sendLogOutgoingMessage: SendLogOutgoingMessage = messageObj as SendLogOutgoingMessage;

        this.gameState.logs.push(sendLogOutgoingMessage.message);

        break;
      case 'DecideStartOrYieldOutgoingMessage':
        let decideStartOrYieldOutgoingMessage: DecideStartOrYieldOutgoingMessage = messageObj as DecideStartOrYieldOutgoingMessage;

        if (decideStartOrYieldOutgoingMessage.shouldIStart) {
          this.gameState.gameMessage = 'DECIDE_START';//this.sanitizer.bypassSecurityTrustHtml('Do you want to go first?<br><button (click)="sayYes()">Yes</button> / <button (click)="sayNo()">No</button>');
        } else {
          this.gameState.gameMessage = 'WAIT_FOR_START';//'Waiting for the winner player to decide who go first.'
        }
        break;
      default:
        console.log("Unknown message!", messageObj);
        break;
    }
  }
}
