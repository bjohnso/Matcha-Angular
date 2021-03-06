import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {



  constructor(private http: HttpClient, private tokenService: JWTTokenService) {}

  getMatches(date = null) {
    if (date != null && date !== undefined) {
      const params = new HttpParams().set('date', date);
      return this.http.get<any>('/api/match', {params});
    } else {
      return this.http.get<any>('/api/match');
    }
  }

  getMatchesCount() {
    return this.http.get<any>('/api/match/count');
  }

  deleteMatch(id) {
    if (id && id !== undefined) {
      const params: HttpParams = new HttpParams().set('id', id);
      return this.http.delete('/api/match', {params});
    }
  }

  getLikeMatch(liked_user) {
    if (liked_user && liked_user !== undefined) {
      const params: HttpParams = new HttpParams().set('liked_user', liked_user);
      return this.http.get<any>('/api/likeMatch', {params});
    }
  }

}
