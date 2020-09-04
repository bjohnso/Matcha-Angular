import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    
    
  }

  getBlocked(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/api/block', {params});
    }else{
      return this.http.get<any>('/api/block');
    }
  }

  postBlocked(blocked_user){
    if (blocked_user && blocked_user != undefined)
      return this.http.post('/api/block', {blocked_user : blocked_user, date : new Date()});
  }

  deleteBlocked(id){
    if (id && id != undefined){
      let params : HttpParams = new HttpParams().set('id' , id);
      return this.http.delete('/api/block', {params});
    }
  }
}
