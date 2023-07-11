import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  islLoggedIn: any;

  constructor() { }

  log(msg: string){
    console.log(msg);
  }
}
