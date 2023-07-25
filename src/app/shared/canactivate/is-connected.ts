import {ConnectionService} from "../connection-service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class IsConnected {

  constructor(
    private router: Router,
    private connectionService: ConnectionService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.connectionService.isConnected()) {
      return true;
    } else {
      this.router.navigateByUrl('/')

      return false;
    }
  }
}
