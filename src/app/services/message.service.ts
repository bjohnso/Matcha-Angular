import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    
    
  }

  getMessages(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/api/message', {params});
    }else{
      return this.http.get<any>('/api/message');
    }
  }

  getMessagesCount(){
    return this.http.get<any>('/api/message/count');
  }
}
