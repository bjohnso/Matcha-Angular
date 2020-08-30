import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  headers : HttpHeaders;

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    // this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
    this.headers = new HttpHeaders().set("auth-token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes');
  }

  getBlocked(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/api/block', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/api/block', {headers : this.headers});
    }
  }

  postBlocked(blocked_user){
    if (blocked_user && blocked_user != undefined)
      return this.http.post('/api/block', {blocked_user : blocked_user, date : new Date()}, {headers : this.headers});
  }

  deleteBlocked(id){
    if (id && id != undefined){
      let params : HttpParams = new HttpParams().set('id' , id);
      return this.http.delete('/api/block', {params, headers : this.headers});
    }
  }
}
