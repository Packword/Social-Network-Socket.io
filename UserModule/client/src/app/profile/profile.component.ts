import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ImageService} from "../services/image.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  private userImgUrlTemplate = "https://localhost:3000";
  public userImgUrl = "";
  public userName = "";
  public userEmail = "";
  public userBirthday = "";
  public user: any;

  private file: File | any = null;

  constructor(public authService: AuthService, private router: Router, private imageService: ImageService) {
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.userName = this.user.name;
    this.userEmail = this.user.email;
    this.userBirthday = this.user.birthday;
    this.userImgUrl = this.userImgUrlTemplate + this.user.photo;
  }

  public editProfile() {
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.user.name = this.userName;
    this.user.birthday = this.userBirthday;
    this.user.email = this.userEmail;
    this.authService.editProfile(JSON.stringify(this.user));
  }

  getPhoto(event: any) {
    this.file = event.target.files[0];
  }

  uploadPhoto() {
    let form = document.getElementById("photoForm");
    this.imageService.uploadPhoto(form, this.user.id, () => {
      this.userImgUrl = this.userImgUrlTemplate + JSON.parse(sessionStorage.getItem("user")!).photo;
      this.user.photo = this.userImgUrl;
    });
  }
}
