import { Component, ElementRef, Optional, ViewChild, Inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestApp';

  role = "Admin";


  /* @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  ngAfterViewInit() {
    const componentRef = this.vcr.createComponent(RoomsComponent);
  }  */

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService, @Inject(LocalStorageToken) private localStorage: any, 
  private initService: InitService, private configService: ConfigService, 
  private route: Router) {
    console.log(initService.config)

  }
  ngOnInit() {
    this.loggerService?.log('AppComponent');
    this.name.nativeElement.innerText = "Hi THere!";
    this.localStorage.setItem('name', 'Hotel');
  }
}
