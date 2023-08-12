import {GameObjectPartialOutgoingMessage} from "../networking/game-object-partial-outgoing-message";
import {Card} from "./card";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CardTransformer {

  public transform(gameObjectPartialOutgoingMessage: GameObjectPartialOutgoingMessage): Card {
    let card: Card = new Card();

    card.id = gameObjectPartialOutgoingMessage.id;
    card.name = gameObjectPartialOutgoingMessage.name;
    card.set = gameObjectPartialOutgoingMessage.set;
    card.setId = gameObjectPartialOutgoingMessage.setId;
    card.power = gameObjectPartialOutgoingMessage.power;
    card.toughness = gameObjectPartialOutgoingMessage.toughness;
    card.activatedAbilities = gameObjectPartialOutgoingMessage.activatedAbilities;

    return card;
  }
}
