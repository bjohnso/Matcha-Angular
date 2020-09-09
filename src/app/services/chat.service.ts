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

  constructor( public socket: Socket, private http: HttpClient, private tokenService: JWTTokenService) {}

  joinChatroom(matchId) {
    this.socket.emit('joinChatroom', matchId);
  }

  sendMessage(message, match_id) {
    if (message && match_id) {
      return this.http.post('/api/message', {
        match_id,
        date : new Date(),
        content : message
      });
    }
  }

  getMessages(matchId, date = null) {
    let params: HttpParams;
    if (matchId && matchId !== undefined) {
      params = new HttpParams().set('match_id' , matchId);
      if (date && date != null) {
        params.set('date', date);
      }
      return this.http.get<any>('/api/message/matchid', {params});
    }
  }

  setRead(messageId) {
    if (messageId && messageId !== undefined) {
      return this.http.post('/api/message/read' , {id : messageId});
    }
  }

  getCount() {
    return this.http.get<any>('/message/count' );
  }

  getMessagesFromSocket = () => {
    return this.socket
             .fromEvent('message')
             .pipe(map((data) => data));
  }

  deleteMessage(id) {
    if (id && id !== undefined) {
      const params: HttpParams = new HttpParams().set('id', id);
      return this.http.delete('/api/block', {params});
    }
  }
}
