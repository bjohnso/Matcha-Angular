import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {JWTTokenService} from './jwt-token.service'
import * as io from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class  SocketIOService{

    socket;

  constructor(private tokenService : JWTTokenService) {
      this.socket = io(environment.api.baseURL ,  {query : {token : tokenService.jwtToken}});
  }
}
