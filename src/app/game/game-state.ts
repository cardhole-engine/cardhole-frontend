import {Injectable} from "@angular/core";
import {Game} from "../shared/game/domain/game";

@Injectable({
  providedIn: 'root'
})
export class GameState {

  public game: Game;
}
