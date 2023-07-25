import {RunningGamePartialMessage} from "../shared/networking/running-game-partial-message";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LobbyState {

  games: RunningGamePartialMessage[];
}
