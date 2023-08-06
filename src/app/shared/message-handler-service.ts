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
import {AddCardToHandOutgoingMessage} from "./networking/add-card-to-hand-outgoing-message";
import {Card} from "./card/card";
import {RemoveCardFromHandOutgoingMessage} from "./networking/remove-card-from-hand-outgoing-message";
import {StepChangeOutgoingMessage} from "./networking/step-change-outgoing-message";
import {
  ShowSingleQuestionGameMessageOutgoingMessage
} from "./networking/show-single-question-game-message-outgoing-message";
import {
  RefreshCanBeCastAndActivatedListOutgoingMessage
} from "./networking/refresh-can-be-cast-and-activated-list-outgoing-message";
import {CardEnterToBattlefieldOutgoingMessage} from "./networking/card-enter-to-battlefield-outgoing-message";
import {DeckSizeChangeOutgoingMessage} from "./networking/deck-size-change-outgoing-message";
import {RefreshManaPoolOutgoingMessage} from "./networking/refresh-mana-pool-outgoing-message";
import {RefreshStopsOutgoingMessage} from "./networking/refresh-stops-outgoing-message";
import {CardTappedOnBattlefieldOutgoingMessage} from "./networking/card-tapped-on-battlefield-outgoing-message";
import {LoginResultOutgoingMessage} from "./networking/login-result-outgoing-message";

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(
    private router: Router,
    private gameState: GameState,
    private lobbyState: LobbyState
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
      case 'AddCardToHandOutgoingMessage':
        let addCardToHandOutgoingMessage: AddCardToHandOutgoingMessage = messageObj as AddCardToHandOutgoingMessage;

        let card: Card = new Card();

        card.id = addCardToHandOutgoingMessage.id;
        card.name = addCardToHandOutgoingMessage.name;
        card.set = addCardToHandOutgoingMessage.set;
        card.setId = addCardToHandOutgoingMessage.setId;

        this.gameState.game.getMyPlayer().hand.push(card);
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
        this.gameState.game.getMyPlayer().battlefield
          .forEach(card => {
            card.highlighted = refreshCanBeCastAndActivatedListOutgoingMessage.canBeCastOrActivated.includes(card.id);
          })
        break;
      case 'CardEnterToBattlefieldOutgoingMessage':
        let cardEnterToBattlefieldOutgoingMessage: CardEnterToBattlefieldOutgoingMessage =
          messageObj as CardEnterToBattlefieldOutgoingMessage;

        let owner: Player | undefined = this.gameState.game.players.find(player =>
          player.id == cardEnterToBattlefieldOutgoingMessage.ownerId);

        if (owner == undefined) {
          throw new Error("Unknown owner!");
        }

        let enteringCard: Card = new Card();

        enteringCard.id = cardEnterToBattlefieldOutgoingMessage.id;
        enteringCard.name = cardEnterToBattlefieldOutgoingMessage.name;
        enteringCard.activatedAbilities = cardEnterToBattlefieldOutgoingMessage.activatedAbilities;
        enteringCard.set = cardEnterToBattlefieldOutgoingMessage.set;
        enteringCard.setId = cardEnterToBattlefieldOutgoingMessage.setId;

        owner.battlefield.push(enteringCard);
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
      default:
        console.log("Unknown message!", messageObj);
        break;
    }
  }
}
