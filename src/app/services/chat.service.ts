import { Injectable, ɵLocaleDataIndex } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  headers : HttpHeaders;

  constructor( public socket : Socket,private http: HttpClient, private tokenService : JWTTokenService) { 
    // this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
    this.headers = new HttpHeaders().set("auth-token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes');
  }

  joinChatroom(matchId){
    this.socket.emit('joinChatroom', matchId);
  }

  sendMessage(message, match_id){
    if (message && match_id){
      return this.http.post("/api/message", {
        match_id : match_id,
        date : new Date(),
        content : message
      }, {headers : this.headers});
    }
  }

  getMessages (matchId, date = null){
    let params : HttpParams;
    if (matchId && matchId != undefined){
      params = new HttpParams().set("match_id" , matchId);
      if (date && date != null)
        params.set("date", date);
      return this.http.get<any>("/api/message/matchid", {params, headers : this.headers});
    }
  }

  setRead(messageId){
    if (messageId && messageId != undefined){
      return this.http.post("/api/message/read" ,{id : messageId}, {headers: this.headers});
    }
  }

  getCount(){
    return this.http.get<any>("/message/count" , {headers : this.headers});
  }

  getMessagesFromSocket = () => {
    return this.socket
             .fromEvent("message")
             .pipe(map((data) => data));
  }

  deleteMessage(id){
    if (id && id != undefined){
      let params : HttpParams = new HttpParams().set('id', id);
      return this.http.delete('/api/block', {params,headers : this.headers});
    }
  }
}
