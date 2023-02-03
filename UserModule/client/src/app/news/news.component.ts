import { Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {RealTimeNewsService} from "../services/news-real-time.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  public user: any;
  public users: any;
  public message: string = '';

  constructor(public authService: AuthService, private router: Router, private realtimeNewsService: RealTimeNewsService) {

  }

  ngOnInit(): void {
    this.realtimeNewsService.on_created_news(() => this.updateUsers());
    this.updateUsers();
  }

  public updateUsers(){
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.authService.getUserAndFriends(this.user.id).subscribe((res: any)=>{
      this.users = JSON.parse(res);
    });
  }


  public addNews() {
    this.authService.addNews(this.message, this.user.id);
    this.message = '';
  }
}
