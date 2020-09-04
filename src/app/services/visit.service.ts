import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    
    
  }

  getVisits(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/api/visit', {params});
    }else{
      return this.http.get<any>('/api/visit');
    }
  }

  getVisitCount(){
    return this.http.get<any>('/api/visit/count');
  }

  postVisit(visited){
    if (visited && visited != undefined){
      return this.http.post('/api/visit', {visited : visited , date : new Date()});
    }
  }
}
