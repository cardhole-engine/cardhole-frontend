import {Player} from "../../player/domain/player";

export class Game {

  name: string;
  players: Player[];

  public getMyPlayer(): Player {
    let myPlayer: Player | undefined = this.players.find(player => player.myPlayer);

    if (myPlayer == undefined) {
      throw new Error();
    }

    return myPlayer;
  }

  public getOpponent(): Player {
    let opponent: Player | undefined = this.players.find(player => !player.myPlayer);

    if (opponent == undefined) {
      throw new Error();
    }

    return opponent;
  }
}
