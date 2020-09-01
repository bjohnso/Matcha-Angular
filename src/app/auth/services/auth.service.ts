import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) {
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
    if (data.username && data.password && data.firstname && data.lastname && data.email) {
      return this.httpClient.post(
        '/api/auth/register/',
        data);
    }
  }
}
