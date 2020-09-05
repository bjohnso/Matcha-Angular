import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications : Notification [] = [];
  notificationCounter = {likes : 0, messages : 0, visits : 0, matches : 0};

  constructor(private notificationService : NotificationsService) { }

  ngOnInit(): void {
    this.notificationService.getNotificationsFromSocket().subscribe((notification : Notification) => {
      this.notifications.push(notification);
      switch(notification['type']){
        case 'like' : {
          this.notificationCounter.likes++;
          break;
        }
        case 'match' : {
          this.notificationCounter.matches++;
          break;
        }
        case 'visit' : {
          this.notificationCounter.visits++;
          break;
        }
        case 'message' : {
          this.notificationCounter.messages++;
          break;
        }
      }
    })
  }

}
