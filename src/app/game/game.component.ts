import {Component} from '@angular/core';
import {GameState} from "./game-state";
import {ConnectionService} from "../shared/connection-service";
import {QuestionResponseIncomingMessage} from "../shared/networking/question-response-incoming-message";
import {Card} from "../shared/card/card";
import {CastCardIncomingMessage} from "../shared/networking/cast-card-incoming-message";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor(
    public gameState: GameState,
    private connectionService: ConnectionService
  ) {
  }

  sendQuestionResponse(value: string): void {
    this.connectionService.sendMessage(new QuestionResponseIncomingMessage(value));
  }

  castCard(card: Card) {
    //TODO: targeting
    this.connectionService.sendMessage(new CastCardIncomingMessage(card.id, null, null));
  }
}
