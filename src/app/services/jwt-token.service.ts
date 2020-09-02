import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class JWTTokenService {

  constructor(private jwtHelperService: JwtHelperService,
              private storageService: StorageService) {}

  setToken(token: string) {
    if (token) {
      this.storageService.set('user', token);
    }
  }

  getToken() {
    return this.storageService.get('user');
  }

  isTokenExpired(): boolean {
    const token = this.storageService.get('user');
    if (token) {
      return this.jwtHelperService.isTokenExpired(token);
    }
    return true;
  }
}
