import { Component, ElementRef, Optional, ViewChild, Inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

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
    //this.route.events.subscribe((event) => console.log(event));
    
    this.route.events.pipe(filter((event)=> event instanceof NavigationStart)).subscribe((event)=>{
      console.log('Navigation Started');
    });
    this.route.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe((event)=>{
      console.log('Navigation Ended');
    });
    
    this.loggerService?.log('AppComponent');
    this.name.nativeElement.innerText = "Hi THere!";
    this.localStorage.setItem('name', 'Hotel');
  }
}
