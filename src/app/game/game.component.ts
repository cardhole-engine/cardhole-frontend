import {Component} from '@angular/core';
import {GameState} from "./game-state";
import {ConnectionService} from "../shared/connection-service";
import {QuestionResponseIncomingMessage} from "../shared/networking/question-response-incoming-message";
import {Card} from "../shared/card/card";
import {CastCardIncomingMessage} from "../shared/networking/cast-card-incoming-message";
import {ChangeStopIncomingMessage} from "../shared/networking/change-stop-incoming-message";
import {Ability} from "../shared/card/ability";
import {UseActivatedAbilityIncomingMessage} from "../shared/networking/use-activated-ability-incoming-message";
import {DeclareAttackerIncomingMessage} from "../shared/networking/declare-attacker-incoming-message";

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

  castCard(card: Card): void {
    //TODO: targeting
    this.connectionService.sendMessage(new CastCardIncomingMessage(card.id, null, null));
  }

  isDeclaringAttackers(): boolean {
    return this.gameState.gameMessageType === 'SINGLE_QUESTION'
      && this.gameState.gameMessageQuestionButtonOneId === 'DECLARE_ATTACKERS';
  }

  activateAbilityOnCard(ability: Ability): void {
    this.connectionService.sendMessage(new UseActivatedAbilityIncomingMessage(ability.id))
  }

  attackWithCreatureCard(card: Card): void {
    this.connectionService.sendMessage(new DeclareAttackerIncomingMessage(card.id))
  }

  changeStopOnOpponentsTurn(step: string): void {
    this.connectionService.sendMessage(new ChangeStopIncomingMessage(step, false,
      !this.gameState.stopAtStepInOpponentTurn[step]));
  }

  changeStopOnMyTurn(step: string): void {
    this.connectionService.sendMessage(new ChangeStopIncomingMessage(step, true,
      !this.gameState.stopAtStepInOpponentTurn[step]));
  }
}
