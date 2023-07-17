import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLogged() {
    return this.loggedIn.asObservable(); // {2}
  }

  isLoggedIn: boolean = false;

  isAdmin: boolean = false;

  constructor() { }

  login(email: string, passord: string){
    if (email === 'shimitaha3@gmail.com' && passord ==='admin1234') {
      this.isLoggedIn = true;
      this.isAdmin = true;
      this.loggedIn.next(true);
    } 
    if(email === 'user@gmail.com' && passord ==='user') {
      this.isLoggedIn = true;
      this.isAdmin = false;
      this.loggedIn.next(true);
    }
    return this.isLoggedIn;
  }

}
