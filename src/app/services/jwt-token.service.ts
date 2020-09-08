import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Injectable({providedIn: 'root'})
export class JWTTokenService {

  constructor(private jwtHelperService: JwtHelperService,
              private storageService: StorageService) {}

  setToken(token: string) {
    if (token) {
      this.storageService.set('user', token);
    }
  }

  setUserId(id: number) {
    if (id) {
      this.storageService.set('userId', id.toString());
    }
  }

  getToken() {
    return this.storageService.get('user');
  }

  getUserId() {
    return this.storageService.get('userId');
  }

  isCurrentUser(id: number) {
    if (id) {
      return id.toString() === this.getUserId();
    }
  }

  isTokenExpired(): boolean {
    const token = this.storageService.get('user');
    if (token) {
      return this.jwtHelperService.isTokenExpired(token);
    }
    return true;
  }
}
