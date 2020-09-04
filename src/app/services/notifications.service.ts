import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { map , take} from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Notification} from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  

  constructor(private socket : Socket, private http : HttpClient) {

    
    
  }
  
  getNotificationsFromSocket = () => {
    return this.socket
             .fromEvent("notification")
             .pipe(map((data) => data));
  }
}
