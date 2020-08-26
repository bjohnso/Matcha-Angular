import { Injectable, ɵLocaleDataIndex } from '@angular/core';
import {SocketIOService} from './socket-io.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  socket;
  headers : HttpHeaders;

  constructor(private SocketService : SocketIOService, private http: HttpClient, private tokenService : JWTTokenService) { 
    this.socket = SocketService.socket;
    this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
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

  getMessages (matchId, date){
    let params : HttpParams;
    if (matchId && matchId != null){
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

  
}
