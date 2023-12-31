import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Message} from "./networking/message";
import {RefreshHomePageMessage} from "./networking/refresh-home-page-message";
import {JoinGameOutgoingMessage} from "./networking/join-game-outgoing-message";
import {Game} from "./game/domain/game";
import {Player} from "./player/domain/player";
import {LobbyState} from "../home/lobby-state";
import {GameState} from "../game/game-state";
import {PlayerJoinedOutgoingMessage} from "./networking/player-joined-outgoing-message";
import {SendLogOutgoingMessage} from "./networking/send-log-outgoing-message";
import {
  ShowDualQuestionGameMessageOutgoingMessage
} from "./networking/show-dual-question-game-message-outgoing-message";
import {ShowSimpleGameMessageOutgoingMessage} from "./networking/show-simple-game-message-outgoing-message";
import {HandSizeChangeOutgoingMessage} from "./networking/hand-size-change-outgoing-message";
import {AddGameObjectToHandOutgoingMessage} from "./networking/add-game-object-to-hand-outgoing-message";
import {Card} from "./card/card";
import {RemoveCardFromHandOutgoingMessage} from "./networking/remove-card-from-hand-outgoing-message";
import {StepChangeOutgoingMessage} from "./networking/step-change-outgoing-message";
import {
  ShowSingleQuestionGameMessageOutgoingMessage
} from "./networking/show-single-question-game-message-outgoing-message";
import {
  RefreshCanBeCastAndActivatedListOutgoingMessage
} from "./networking/refresh-can-be-cast-and-activated-list-outgoing-message";
import {
  GameObjectEnterToBattlefieldOutgoingMessage
} from "./networking/game-object-enter-to-battlefield-outgoing-message";
import {DeckSizeChangeOutgoingMessage} from "./networking/deck-size-change-outgoing-message";
import {RefreshManaPoolOutgoingMessage} from "./networking/refresh-mana-pool-outgoing-message";
import {RefreshStopsOutgoingMessage} from "./networking/refresh-stops-outgoing-message";
import {CardTappedOnBattlefieldOutgoingMessage} from "./networking/card-tapped-on-battlefield-outgoing-message";
import {LoginResultOutgoingMessage} from "./networking/login-result-outgoing-message";
import {CardUntappedOnBattlefieldOutgoingMessage} from "./networking/card-untapped-on-battlefield-outgoing-message";
import {GameObjectPutToStackOutgoingMessage} from "./networking/game-object-put-to-stack-outgoing-message";
import {StackEntry} from "./stack/domain/stack-entry";
import {CardRemovedFromStackOutgoingMessage} from "./networking/card-removed-from-stack-outgoing-message";
import {MarkCardIsAttackingOutgoingMessage} from "./networking/mark-card-is-attacking-outgoing-message";
import {MarkCardIsBlockingOutgoingMessage} from "./networking/mark-card-is-blocking-outgoing-message";
import * as LeaderLine from "leader-line-new";
import {CardTransformer} from "./card/card-transformer";

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(
    private router: Router,
    private gameState: GameState,
    private lobbyState: LobbyState,
    private cardTransformer: CardTransformer
  ) {
  }

  handleMessage(message: string): void {
    console.log("message:", message);

    let messageObj: Message = JSON.parse(message);

    switch (messageObj.type) {
      case 'LoginResultOutgoingMessage':
        let loginResultOutgoingMessage: LoginResultOutgoingMessage = messageObj as LoginResultOutgoingMessage;

        this.gameState.staticAssetLocation = loginResultOutgoingMessage.staticAssetLocation;

        this.router.navigateByUrl('/home');
        break;
      case 'RefreshHomePageOutgoingMessage':
        let refreshHomePageMessage: RefreshHomePageMessage = messageObj as RefreshHomePageMessage;

        console.log("refresh game data");

        this.lobbyState.games = refreshHomePageMessage.games;
        break;
      case 'JoinGameOutgoingMessage':
        let joinGameOutgoingMessage: JoinGameOutgoingMessage = messageObj as JoinGameOutgoingMessage;

        let game: Game = new Game();

        game.name = joinGameOutgoingMessage.name;
        game.players = joinGameOutgoingMessage.players
          .map(msgPlayer => {
            let player: Player = new Player();

            player.id = msgPlayer.id;
            player.name = msgPlayer.name;
            player.myPlayer = msgPlayer.myPlayer;
            player.deckSize = msgPlayer.deckSize;
            player.life = msgPlayer.life;

            return player;
          })

        this.gameState.game = game;

        this.gameState.stopAtStepInMyTurn = {};
        this.gameState.stopAtStepInOpponentTurn = {};

        this.router.navigateByUrl('/game')
        break;
      case 'PlayerJoinedOutgoingMessage':
        let playerJoinedOutgoingMessage: PlayerJoinedOutgoingMessage = messageObj as PlayerJoinedOutgoingMessage;

        let player: Player = new Player();

        player.id = playerJoinedOutgoingMessage.id;
        player.name = playerJoinedOutgoingMessage.name;
        player.myPlayer = false;
        player.deckSize = playerJoinedOutgoingMessage.deckSize;
        player.life = playerJoinedOutgoingMessage.life;

        this.gameState.game.players.push(player);
        break;
      case 'SendLogOutgoingMessage':
        let sendLogOutgoingMessage: SendLogOutgoingMessage = messageObj as SendLogOutgoingMessage;

        this.gameState.logs.push(sendLogOutgoingMessage.message);

        break;
      case 'ShowSingleQuestionGameMessageOutgoingMessage':
        let showSingleQuestionGameMessageOutgoingMessage: ShowSingleQuestionGameMessageOutgoingMessage =
          messageObj as ShowSingleQuestionGameMessageOutgoingMessage;

        this.gameState.gameMessage = showSingleQuestionGameMessageOutgoingMessage.question
        this.gameState.gameMessageType = 'SINGLE_QUESTION';
        this.gameState.gameMessageQuestionButtonOneId = showSingleQuestionGameMessageOutgoingMessage.responseOneId;
        this.gameState.gameMessageQuestionButtonOneText = showSingleQuestionGameMessageOutgoingMessage.buttonOneText;
        break;
      case 'ShowDualQuestionGameMessageOutgoingMessage':
        let showDualQuestionGameMessage: ShowDualQuestionGameMessageOutgoingMessage =
          messageObj as ShowDualQuestionGameMessageOutgoingMessage;

        this.gameState.gameMessage = showDualQuestionGameMessage.question
        this.gameState.gameMessageType = 'DUAL_QUESTION';
        this.gameState.gameMessageQuestionButtonOneText = showDualQuestionGameMessage.buttonOneText;
        this.gameState.gameMessageQuestionButtonTwoText = showDualQuestionGameMessage.buttonTwoText;
        this.gameState.gameMessageQuestionButtonOneId = showDualQuestionGameMessage.responseOneId;
        this.gameState.gameMessageQuestionButtonTwoId = showDualQuestionGameMessage.responseTwoId;
        break;
      case 'ShowSimpleGameMessageOutgoingMessage':
        let showSimpleGameMessage: ShowSimpleGameMessageOutgoingMessage =
          messageObj as ShowSimpleGameMessageOutgoingMessage;

        this.gameState.gameMessage = showSimpleGameMessage.message;
        this.gameState.gameMessageType = 'MESSAGE';
        break;
      case 'AddGameObjectToHandOutgoingMessage':
        let addGameObjectToHandOutgoingMessage: AddGameObjectToHandOutgoingMessage =
          messageObj as AddGameObjectToHandOutgoingMessage;

        this.gameState.game.getMyPlayer().hand.push(this.cardTransformer.transform(
          addGameObjectToHandOutgoingMessage.gameObject));
        break;
      case 'RemoveCardFromHandOutgoingMessage':
        let removeCardFromHandOutgoingMessage: RemoveCardFromHandOutgoingMessage = messageObj as RemoveCardFromHandOutgoingMessage;

        this.gameState.game.getMyPlayer().hand = this.gameState.game.getMyPlayer().hand
          .filter(card => card.id != removeCardFromHandOutgoingMessage.id);
        break;
      case 'HandSizeChangeOutgoingMessage':
        let handSizeChangeOutgoingMessage: HandSizeChangeOutgoingMessage = messageObj as HandSizeChangeOutgoingMessage;

        let updatedPlayer: Player | undefined = this.gameState.game.players.find(player =>
          player.id == handSizeChangeOutgoingMessage.playerId);

        if (updatedPlayer == undefined) {
          throw new Error();
        }

        updatedPlayer.handSize = handSizeChangeOutgoingMessage.handSize;
        break;
      case 'DeckSizeChangeOutgoingMessage':
        let deckSizeChangeOutgoingMessage: DeckSizeChangeOutgoingMessage = messageObj as DeckSizeChangeOutgoingMessage;

        let playerToUpdateDeckFor: Player | undefined = this.gameState.game.players.find(player =>
          player.id == deckSizeChangeOutgoingMessage.playerId);

        if (playerToUpdateDeckFor == undefined) {
          throw new Error();
        }

        playerToUpdateDeckFor.deckSize = deckSizeChangeOutgoingMessage.deckSize;
        break;
      case 'ResetMessageOutgoingMessage':
        this.gameState.gameMessage = '';
        this.gameState.gameMessageType = '';
        this.gameState.gameMessageQuestionButtonOneId = '';
        this.gameState.gameMessageQuestionButtonOneText = '';
        this.gameState.gameMessageQuestionButtonTwoId = '';
        this.gameState.gameMessageQuestionButtonTwoText = '';
        break;
      case 'StepChangeOutgoingMessage':
        let stepChangeOutgoingMessage: StepChangeOutgoingMessage = messageObj as StepChangeOutgoingMessage;

        this.gameState.activeStep = stepChangeOutgoingMessage.activeStep;

        break;
      case 'RefreshCanBeCastAndActivatedListOutgoingMessage':
        let refreshCanBeCastAndActivatedListOutgoingMessage: RefreshCanBeCastAndActivatedListOutgoingMessage =
          messageObj as RefreshCanBeCastAndActivatedListOutgoingMessage;

        this.gameState.game.getMyPlayer().hand
          .forEach(card => {
            card.highlighted = refreshCanBeCastAndActivatedListOutgoingMessage.canBeCastOrActivated.includes(card.id);
          })
        this.gameState.game.players
          .flatMap(player => player.battlefield)
          .forEach(card => {
            card.highlighted = refreshCanBeCastAndActivatedListOutgoingMessage.canBeCastOrActivated.includes(card.id);
          })
        break;
      case 'GameObjectEnterToBattlefieldOutgoingMessage':
        let gameObjectEnterToBattlefieldOutgoingMessage: GameObjectEnterToBattlefieldOutgoingMessage =
          messageObj as GameObjectEnterToBattlefieldOutgoingMessage;

        let owner: Player | undefined = this.gameState.game.players.find(player =>
          player.id == gameObjectEnterToBattlefieldOutgoingMessage.gameObject.ownerId);

        if (owner == undefined) {
          throw new Error("Unknown owner!");
        }

        owner.battlefield.push(this.cardTransformer.transform(gameObjectEnterToBattlefieldOutgoingMessage.gameObject));
        break;
      case 'RefreshManaPoolOutgoingMessage':
        let refreshManaPoolOutgoingMessage: RefreshManaPoolOutgoingMessage =
          messageObj as RefreshManaPoolOutgoingMessage;

        let playerWithManaPool: Player | undefined = this.gameState.game.players.find(player =>
          player.id == refreshManaPoolOutgoingMessage.playerId);

        if (playerWithManaPool == undefined) {
          throw new Error("Unknown owner!");
        }

        playerWithManaPool.manaPool.whiteMana = refreshManaPoolOutgoingMessage.whiteMana;
        playerWithManaPool.manaPool.blueMana = refreshManaPoolOutgoingMessage.blueMana;
        playerWithManaPool.manaPool.blackMana = refreshManaPoolOutgoingMessage.blackMana;
        playerWithManaPool.manaPool.redMana = refreshManaPoolOutgoingMessage.redMana;
        playerWithManaPool.manaPool.greenMana = refreshManaPoolOutgoingMessage.greenMana;
        playerWithManaPool.manaPool.colorlessMana = refreshManaPoolOutgoingMessage.colorlessMana;
        break;
      case 'RefreshStopsOutgoingMessage':
        let refreshStopsOutgoingMessage: RefreshStopsOutgoingMessage = messageObj as RefreshStopsOutgoingMessage;

        this.gameState.stopAtStepInMyTurn = refreshStopsOutgoingMessage.stopAtStepInMyTurn;
        this.gameState.stopAtStepInOpponentTurn = refreshStopsOutgoingMessage.stopAtStepInOpponentTurn;
        break;
      case 'CardTappedOnBattlefieldOutgoingMessage':
        let cardTappedOnBattlefieldOutgoingMessage: CardTappedOnBattlefieldOutgoingMessage =
          messageObj as CardTappedOnBattlefieldOutgoingMessage;

        let tappedCard: Card | undefined = this.gameState.game.players
          .flatMap(player => player.battlefield)
          .find(card => card.id == cardTappedOnBattlefieldOutgoingMessage.cardId);

        if (tappedCard == undefined) {
          throw new Error("Unknown card!");
        }

        tappedCard.tapped = true;
        break;
      case 'CardUntappedOnBattlefieldOutgoingMessage':
        let cardUntappedOnBattlefieldOutgoingMessage: CardUntappedOnBattlefieldOutgoingMessage =
          messageObj as CardUntappedOnBattlefieldOutgoingMessage;

        let untappedCard: Card | undefined = this.gameState.game.players
          .flatMap(player => player.battlefield)
          .find(card => card.id == cardUntappedOnBattlefieldOutgoingMessage.cardId);

        if (untappedCard == undefined) {
          throw new Error("Unknown card!");
        }

        untappedCard.tapped = false;
        break;
      case 'GameObjectPutToStackOutgoingMessage':
        let gameObjectPutToStackOutgoingMessage: GameObjectPutToStackOutgoingMessage =
          messageObj as GameObjectPutToStackOutgoingMessage;

        let stackEntry: StackEntry = new StackEntry();

        stackEntry.id = gameObjectPutToStackOutgoingMessage.gameObject.id;
        stackEntry.name = gameObjectPutToStackOutgoingMessage.gameObject.name;
        stackEntry.ownerId = gameObjectPutToStackOutgoingMessage.gameObject.ownerId;
        stackEntry.set = gameObjectPutToStackOutgoingMessage.gameObject.set;
        stackEntry.setId = gameObjectPutToStackOutgoingMessage.gameObject.setId;
        stackEntry.toughness = gameObjectPutToStackOutgoingMessage.gameObject.toughness;
        stackEntry.power = gameObjectPutToStackOutgoingMessage.gameObject.power;

        this.gameState.stack.stackEntries.push(stackEntry);
        break;

      case 'CardRemovedFromStackOutgoingMessage':
        let cardRemovedFromStackOutgoingMessage: CardRemovedFromStackOutgoingMessage =
          messageObj as CardRemovedFromStackOutgoingMessage;

        this.gameState.stack.stackEntries = this.gameState.stack.stackEntries
          .filter(stackEntry => stackEntry.id !== cardRemovedFromStackOutgoingMessage.id);
        break;
      case 'MarkCardIsAttackingOutgoingMessage':
        let markCardIsAttackingOutgoingMessage: MarkCardIsAttackingOutgoingMessage =
          messageObj as MarkCardIsAttackingOutgoingMessage;

        let attackingCard: Card | undefined = this.gameState.game.players
          .flatMap(player => player.battlefield)
          .find(card => card.id === markCardIsAttackingOutgoingMessage.cardId);

        if (attackingCard == undefined) {
          throw new Error("Unknown card!");
        }

        attackingCard.attacking = true;
        break;
      case 'MarkCardIsBlockingOutgoingMessage':
        let markCardIsBlockingOutgoingMessage: MarkCardIsBlockingOutgoingMessage =
          messageObj as MarkCardIsBlockingOutgoingMessage;

        new LeaderLine(
          // @ts-ignore
          document.getElementById('card-' + markCardIsBlockingOutgoingMessage.blocker),
          document.getElementById('card-' + markCardIsBlockingOutgoingMessage.blocked)
        );

        break;
      case 'ResetBlockerOutgoingMessage':
        this.gameState.blockerSelected = undefined;
        break;
      default:
        console.log("Unknown message!", messageObj);
        break;
    }
  }
}
