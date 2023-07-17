import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isLoggedIn$?: Observable<boolean>;
  title : string = "Test App Menu";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private LoginService: LoginService){ }

    ngOnInit(): void{
      this.isLoggedIn$ = this.LoginService.isLogged;
    }
}
