import {Message} from "./message";
import {RunningGamePartialMessage} from "./running-game-partial-message";

export class InitializeHomePageMessage extends Message {

  games: RunningGamePartialMessage[];
}
