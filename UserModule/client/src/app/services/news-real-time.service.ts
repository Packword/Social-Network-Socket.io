import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class RealTimeNewsService {

  constructor() {
    RealTimeNewsService_socket = io("http://localhost:5000");
    this.subscribe();
  }

  subscribe()
  {
    let user = JSON.parse(sessionStorage["user"]);
    RealTimeNewsService_socket.emit("news-subscribe", {token: user.id});
  }

  on_created_news(func: () => void)
  {
    RealTimeNewsService_socket.removeAllListeners("created-news");
    RealTimeNewsService_socket.on("created-news", (message) => {
      func();
    });
  }
}

var RealTimeNewsService_socket : Socket;
