import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

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

    //this.router.navigateByUrl('/home');
  }
}
