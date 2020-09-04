import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  

  constructor(private http : HttpClient, private tokenService : JWTTokenService) {

    
    
  }

  getLiked(){
    return this.http.get<any>('/api/liked');
  }

  getLikes(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/api/like', {params});
    }else{
      return this.http.get<any>('/api/like');
    }
  }

  getLikesCount(){
    return this.http.get<any>('/api/like/count');
  }

  postLike(liked_user){
    if (liked_user && liked_user != undefined)
      return this.http.post('/api/like', {liked_user : liked_user, date : new Date()});
  }

  deleteLike(id){
    if (id && id != undefined){
      let params : HttpParams = new HttpParams().set('id', id);
      return this.http.delete('/api/like', {params});
    }
  }
}
