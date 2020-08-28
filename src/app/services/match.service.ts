import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  headers : HttpHeaders;

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    // this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
    this.headers = new HttpHeaders().set("auth-token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes');
  }

  getMatches(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/match', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/match', {headers : this.headers});
    }
  }

  getMatchesCount(){
    return this.http.get<any>('/match/count',{headers : this.headers});
  }

}
