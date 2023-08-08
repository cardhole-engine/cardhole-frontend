import {Injectable} from "@angular/core";
import {Game} from "../shared/game/domain/game";
import {Stack} from "../shared/stack/domain/stack";
import {Card} from "../shared/card/card";

@Injectable({
  providedIn: 'root'
})
export class GameState {

  public game: Game;
  public logs: string[] = [];
  public stack: Stack = new Stack();

  public staticAssetLocation: string;

  public activeStep: string;

  public blockerSelected: Card | undefined;

  public gameMessage: string;
  public gameMessageType: string;
  public gameMessageQuestionButtonOneId: string;
  public gameMessageQuestionButtonTwoId: string;
  public gameMessageQuestionButtonOneText: string;
  public gameMessageQuestionButtonTwoText: string;

  public stopAtStepInMyTurn: any;
  public stopAtStepInOpponentTurn: any;
}
