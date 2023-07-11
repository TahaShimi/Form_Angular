import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;

  isAdmin: boolean = false;

  constructor() { }

  login(email: string, passord: string){
    if (email === 'shimitaha3@gmail.com' && passord ==='admin1234') {
      this.isLoggedIn = true;
      this.isAdmin = true
    } 
    if(email === 'user@gmail.com' && passord ==='user') {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
}
