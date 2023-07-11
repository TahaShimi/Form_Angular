import { ActivatedRouteSnapshot,  Route,  Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { LoginService } from "../login/login.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class loginGuard {
  constructor(private loginService: LoginService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    return this.loginService.isLoggedIn? true: this.router.navigate(['/login']); 
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ){
    return this.loginService.isLoggedIn;
  }
} 