import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
  public email = "";
  public password = "";
  public name: string = '';
  public birthday: any = null;


  constructor(public authService: AuthService, private router: Router) {}

  public doRegistration(){
    if(this.isRegistrationValid()){
      this.router.navigate(["registration"]);
      alert("Некоректные данные");
    }
    else{
      this.authService.addUser(this.name, this.birthday, this.email, this.password);
    }
  }

  public isRegistrationValid(): boolean{
    return (this.name.match(/([а-яА-яa-zA-z]+\s)+([а-яА-яa-zA-z]+)/ig) === null ||
      this.password.split(' ').length !== 1 ||
      this.email.split(' ').length !== 1 ||
      this.email.split('@').length !== 2 ||
      this.password.length === 0 ||
      this.birthday === null)
  }
}
