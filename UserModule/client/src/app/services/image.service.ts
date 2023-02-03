import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  uploadPhoto(form: any, userId: any, callback: () => void): any {

    let formParams = new FormData(form);
    let fileName : any;
    this.httpClient.post("https://localhost:3000/addPhoto/" + userId, formParams).subscribe(res=>{
      fileName = res;
      let user: any = JSON.parse(sessionStorage.getItem("user")!);
      user.photo = fileName.filename;
      sessionStorage.setItem("user", JSON.stringify(user))
      callback();
    })
  }
}
