import {Component} from '@angular/core';
import {ConnectionService} from "../shared/connection-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public name: string = '';

  constructor(
    private connectionService: ConnectionService
  ) {
  }

  connect(): void {
    this.connectionService.connect();
  }
}
