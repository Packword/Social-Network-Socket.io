import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})


export class AppComponent {
  public get logIn(): boolean {
    return sessionStorage.getItem('auth') !== "false";
  }

  public get isAdmin(): boolean{
    let user = sessionStorage.getItem('user');
    if(user){
      return JSON.parse(user).role === "admin";
    }
    return false;
  }

  constructor(public authService: AuthService, private router: Router) {}

  public goToNews() {
    if(!this.authService.logIn)
      this.goToLogin()
    else
      this.router.navigate(["news"])
  }

  public goToFriends() {
    if(!this.authService.logIn)
      this.goToLogin()
    else
      this.router.navigate(["friends"]);
  }

  public goToProfile() {
    if(!this.authService.logIn)
      this.goToLogin()
    else

      this.router.navigate(["profile"]);
  }

  public goToRegistration() {
    this.router.navigate(["registration"]);
  }

  public goToLogin(){
    this.router.navigate(["login"])
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(["login"])
  }
}
