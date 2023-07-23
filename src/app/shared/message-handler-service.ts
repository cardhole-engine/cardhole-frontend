import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Message} from "./networking/message";
import {InitializeHomePageMessage} from "./networking/initialize-home-page-message";

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(
    private router: Router
  ) {
  }

  handleMessage(message: string): void {
    console.log("message:", message);

    let messageObj: Message = JSON.parse(message);

    switch (messageObj.type) {
      case 'InitializeHomePageMessage':
        let initializeHomePageMessage: InitializeHomePageMessage = messageObj as InitializeHomePageMessage;

        this.router.navigateByUrl('/home', {state: {"games": initializeHomePageMessage.games}})
        return;
      default:
        console.log("Unknown message!")
        return;
    }

    //this.router.navigateByUrl('/home');
  }
}
