import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Message} from "./networking/message";
import {InitializeHomePageMessage} from "./networking/initialize-home-page-message";
import {JoinGameOutgoingMessage} from "./networking/join-game-outgoing-message";
import {Game} from "./game/domain/game";
import {Player} from "./player/domain/player";

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(
    private router: Router
  ) {
  }

  handleMessage(message: string): void {
    console.log("message:", message);

    let messageObj: Message = JSON.parse(message);

    switch (messageObj.type) {
      case 'InitializeHomePageOutgoingMessage':
        let initializeHomePageMessage: InitializeHomePageMessage = messageObj as InitializeHomePageMessage;

        this.router.navigateByUrl('/home', {state: {'games': initializeHomePageMessage.games}})
        return;
      case 'JoinGameOutgoingMessage':
        let joinGameOutgoingMessage: JoinGameOutgoingMessage = messageObj as JoinGameOutgoingMessage;

        let game: Game = new Game();

        game.name = joinGameOutgoingMessage.name;
        game.players = joinGameOutgoingMessage.players
          .map(msgPlayer => {
            let player: Player = new Player();

            player.name = msgPlayer.name;

            return player;
          })

        this.router.navigateByUrl('/game', {state: {game: game}})
        break;
      default:
        console.log("Unknown message!", messageObj);
        return;
    }
  }
}
