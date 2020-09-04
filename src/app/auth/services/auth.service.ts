import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JWTTokenService} from '../../services/jwt-token.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient,
              private jwtService: JWTTokenService) {
  }

  isAuthenticated() {
    return this.jwtService.getToken() != null && !this.jwtService.isTokenExpired();
  }

  login(data: any) {
    // tslint:disable-next-line:new-parens
    if (data.password && data.email) {
      return this.httpClient.post(
        '/api/auth/login/',
        data);
    }
  }

  register(data: any) {
    // tslint:disable-next-line:new-parens
    if (data.username && data.password &&
      data.firstname && data.lastname &&
      data.email) {
      return this.httpClient.post(
        '/api/auth/register/',
        data);
    }
  }

  resetPassword(data){
    if (data && data.email){
      return this.httpClient.post('api/auth/resetPassword/',data);
    }
  }
}
