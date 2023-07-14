import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { DxFormComponent, DxValidatorComponent } from 'devextreme-angular';
import { Validator } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordMode = 'password';
  passwordButton: any = {
    icon: '/assets/images/icons/eye-scan.png',
    type: 'default',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };
  buttonOptions: any = {
    text: 'Login',
    type: 'default',
    stylingMode: 'contained',
    width: 150,
    useSubmitBehavior: true,
  };

  email: string = "";
  password: string = "";

  constructor(private route: Router, private loginService: LoginService) { 
  }

  ngOnInit(): void {
  }
  
  Login(e: Event) {
    e.preventDefault();
    if (this.loginService.login(this.email, this.password)) {
      this.route.navigate(['/rooms']);
    }
  }
}
