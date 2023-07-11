import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
@Injectable({
  providedIn: 'root'
})
export class roomGuard {

  constructor(private loginService: LoginService){}
  canActivateChild(
    ChildRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    return this.loginService.isAdmin;
  }
}
