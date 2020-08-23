import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  register(data: any) {
    // tslint:disable-next-line:new-parens
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    if (data.username && data.password && data.firstname && data.lastname && data.email) {
      return this.httpClient.post(
        '/api/register/',
        data, {headers});
    }
    return null;
  }
}
