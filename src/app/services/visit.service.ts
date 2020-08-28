import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  headers : HttpHeaders;

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    // this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
    this.headers = new HttpHeaders().set("auth-token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes');
  }

  getVisits(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/visit', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/visit', {headers : this.headers});
    }
  }

  getVisitCount(){
    return this.http.get<any>('/visit/count', {headers : this.headers});
  }

  postVisit(visited){
    if (visited && visited != undefined){
      return this.http.post('/visit', {visited : visited , date : new Date()}, {headers : this.headers});
    }
  }
}
