import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {RunningGamePartialMessage} from "../shared/networking/running-game-partial-message";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  games: RunningGamePartialMessage[];

  constructor(private location: Location) {
    // @ts-ignore
    this.games = this.location.getState().games;
  }
}
