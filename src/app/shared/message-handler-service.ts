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
import {ShowDualQuestionGameMessage} from "./networking/show-dual-question-game-message";
import {DomSanitizer} from "@angular/platform-browser";
import {ShowSimpleGameMessage} from "./networking/show-simple-game-message";

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
      case 'ShowDualQuestionGameMessage':
        let showDualQuestionGameMessage: ShowDualQuestionGameMessage = messageObj as ShowDualQuestionGameMessage;

        this.gameState.gameMessage = showDualQuestionGameMessage.question
        this.gameState.gameMessageType = 'DUAL_QUESTION';
        this.gameState.gameMessageQuestionButtonOneText = showDualQuestionGameMessage.buttonOneText;
        this.gameState.gameMessageQuestionButtonTwoText = showDualQuestionGameMessage.buttonTwoText;
        this.gameState.gameMessageQuestionButtonOneId = showDualQuestionGameMessage.responseOneId;
        this.gameState.gameMessageQuestionButtonTwoId = showDualQuestionGameMessage.responseTwoId;
        break;
      case 'ShowSimpleGameMessage':
        let showSimpleGameMessage: ShowSimpleGameMessage = messageObj as ShowSimpleGameMessage;

        this.gameState.gameMessage = showSimpleGameMessage.message;
        this.gameState.gameMessageType = 'MESSAGE';
        break;
      default:
        console.log("Unknown message!", messageObj);
        break;
    }
  }
}
