import {Injectable} from "@angular/core";
import {Game} from "../shared/game/domain/game";
import {SafeValue} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class GameState {

  public game: Game;
  public logs: string[] = [];

  public gameMessage: string;
  public gameMessageType: string;
  public gameMessageQuestionButtonOneId: string;
  public gameMessageQuestionButtonTwoId: string;
  public gameMessageQuestionButtonOneText: string;
  public gameMessageQuestionButtonTwoText: string;
}
