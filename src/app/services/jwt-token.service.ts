import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {StorageService} from './storage.service';

@Injectable({providedIn: 'root'})
export class JWTTokenService {

  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor(private storageService: StorageService) {
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      this.storageService.set('user', this.jwtToken);
    }
  }

  getToken() {
    return this.jwtToken;
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.displayname : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime() as unknown as number;
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
