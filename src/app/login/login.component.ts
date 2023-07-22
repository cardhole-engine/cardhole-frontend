import {Component} from '@angular/core';
import {ConnectionService} from "../shared/connection-service";
import {Router} from "@angular/router";
import {MessageHandlerService} from "../shared/message-handler-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public name: string = '';

  constructor(
    private connectionService: ConnectionService,
    private messageHandlerService: MessageHandlerService
  ) {
  }

  connect(): void {
    this.connectionService.connect()
      //TODO: add error handling
      .subscribe(message => {
        this.messageHandlerService.handleMessage(message)
      });
  }
}
