import {Component} from '@angular/core';
import {GameState} from "./game-state";
import {ConnectionService} from "../shared/connection-service";
import {QuestionResponseIncomingMessage} from "../shared/networking/question-response-incoming-message";

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
}
