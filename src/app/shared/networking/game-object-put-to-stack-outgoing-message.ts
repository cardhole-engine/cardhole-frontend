import {Message} from "./message";
import {GameObjectPartialOutgoingMessage} from "./game-object-partial-outgoing-message";

export class GameObjectPutToStackOutgoingMessage extends Message {

  gameObject: GameObjectPartialOutgoingMessage
}
