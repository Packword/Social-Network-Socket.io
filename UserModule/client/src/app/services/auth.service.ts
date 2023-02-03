import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public users: any;
  public user: any;
  constructor(private http: HttpClient,private router: Router) { }

  public get logIn(): boolean {
    return sessionStorage.getItem('auth') !== "false";
  }

  public editProfile(user: any){
    user = JSON.parse(user);
    this.http.post("https://localhost:3000/edit/" + user.id, {name: user.name, birthday: user.birthday,
      email: user.email, role: user.role, status: user.status}).subscribe(() => {
        this.updateUser(user);
      });
      this.updateUsers();
  }

  private updateUsers(){
    this.http.get("https://localhost:3000/users").subscribe(data => {
      this.users = JSON.stringify(data);
    })
  }

  private updateUser(user: any){
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  public doLogin(email: string, password: string) {
    this.http.get("https://localhost:3000/users").subscribe(users => {
      this.users = users;
      this.sendAuthRequest(email, password);
    });
  }

  private sendAuthRequest(email: string, password: string){
    this.http.post("http://localhost:5000/api/authenticate/", {email: email, password: password,
      users: JSON.stringify(this.users)}).subscribe((resp: any) => {
      let result = resp.isLogin;
      if(result){
        this.user = JSON.parse(resp.user);
        sessionStorage.setItem('user', JSON.stringify(this.user));
        sessionStorage.setItem("auth", "true");
        this.router.navigate(["news"]);
      }
      else{
        this.router.navigate(["login"]);
      }
    });
  }
  public addUser(name: string, birthday: string, email: string, password: string){
    this.http.post("https://localhost:3000/users", {name: name, birthday: birthday, email: email,
      password: password}).subscribe((resp: any) => {
      this.http.get("https://localhost:3000/users").subscribe(data => {
        this.users = data;
        this.sendAuthRequest(email, password);
      });
    });
  }

  public getUserAndFriends(userId: string): any{
    return this.http.get("https://localhost:3000/users").pipe(map((res:any) => {
      this.users = JSON.stringify(res);

      let users = JSON.parse(this.users)
      let curUser: any = users.find((u: any) => u.id === userId);
      res = users.filter((u: any) => u.id === userId || curUser.friends.includes(u.id));
      console.log(res);
      return JSON.stringify(res);
    }));
  }

  public deleteFriend(userId: string, friendId: string){
    this.http.post("https://localhost:3000/friends/" + userId, {friendId: friendId}).subscribe((resp: any) => {
      this.http.get("https://localhost:3000/users").subscribe(data => {
        this.users = data;
      });
    });
  }

  public addNews(message: string, userId: string){
    this.http.post("https://localhost:3000/addNews/" + userId, {news: message}).subscribe((resp: any) => {
      this.user = JSON.parse(resp.user);
      this.http.post("http://localhost:5000/api/addNews", {user: this.user, users: this.users},
        {responseType: 'text'}).subscribe(data => {

      })
    })
  }

  public addFriend(userId: string, friendEmail: string): boolean{
    let users = JSON.parse(this.users);
    let friendIndex = users.findIndex((u: any) => u.email === friendEmail);
    let user = users.find((u:any) => u.id === userId);
    if(friendIndex !== -1 && !user.friends.includes((u: string) => u === JSON.stringify(users[friendIndex].id))) {
      this.http.post("https://localhost:3000/addFriends/" + userId, {friendId: users[friendIndex].id}).subscribe((resp: any) => {
        this.http.get("https://localhost:3000/users").subscribe(data => {
          this.users = data;
        });
      });
      return true;
    }
    return false;
  }

  public logout(){
    sessionStorage.setItem('user', '');
    sessionStorage.setItem("auth", "false");
  }
}
