import {Message} from "./message";
import {GameObjectPartialOutgoingMessage} from "./game-object-partial-outgoing-message";

export class GameObjectEnterToBattlefieldOutgoingMessage extends Message {

  gameObject: GameObjectPartialOutgoingMessage;
}
