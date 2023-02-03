import { Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent{
  public user: any;
  public friends: any;
  public friendEmail: any;

  constructor(public authService: AuthService, private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.authService.getUserAndFriends(this.user.id).subscribe((res: any)=>{
      this.friends = JSON.parse(res).filter((f: any) => f.id !== this.user.id);
    });
  }

  public deleteFriend(id: string) {
    this.authService.deleteFriend(this.user.id, id)
  }

  public addFriend(){
    let result: boolean = this.authService.addFriend(this.user.id, this.friendEmail);
    if(!result){
      alert("Такого пользователя не существует");
    }
  }
}
