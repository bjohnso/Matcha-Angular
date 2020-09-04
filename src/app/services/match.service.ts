import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    
    
  }

  getMatches(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/match', {params});
    }else{
      return this.http.get<any>('/match');
    }
  }

  getMatchesCount(){
    return this.http.get<any>('/match/count');
  }

  deleteMatch(id){
    if (id && id != undefined){
      let params : HttpParams = new HttpParams().set('id', id);
      return this.http.delete('/match', {params});
    }
  }

}
