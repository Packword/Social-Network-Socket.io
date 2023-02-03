import { Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent{
  email = "";
  password = "";

  constructor(public authService: AuthService, private router: Router) {}

  public goToRegistration() {
    this.router.navigate(["registration"]);
  }

  public doLogin(){
    this.authService.doLogin(this.email, this.password);
  }
}
