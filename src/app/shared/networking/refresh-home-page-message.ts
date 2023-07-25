import {Message} from "./message";
import {RunningGamePartialMessage} from "./running-game-partial-message";

export class RefreshHomePageMessage extends Message {

  games: RunningGamePartialMessage[];
}
