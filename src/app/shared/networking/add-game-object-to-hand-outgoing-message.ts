import {Message} from "./message";
import {GameObjectPartialOutgoingMessage} from "./game-object-partial-outgoing-message";

export class AddGameObjectToHandOutgoingMessage extends Message {

  gameObject: GameObjectPartialOutgoingMessage
}
