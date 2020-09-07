import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications : Notification [] = [];
  notificationCounter = {likes : 0, messages : 0, visits : 0, matches : 0};

  constructor(private notificationService : NotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.notificationService.getNotificationsFromSocket().subscribe((notification : Notification) => {
      console.log(notification);
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

  getType(type){

    switch(type){
      case "unlike" : {
        return 'warning';
        break;
      }
      case "like" : {
        return 'info';
        break;
      }
      case "match" : {
        return 'danger';
        break;
      }
      case "unmatch" : {
        return 'primary';
        break;
      }
      case "unlike" : {
        return 'primary';
        break;
      }
      case "message" :{
        return 'success';
        break;
      }
    }
  }

  removeNotification(not){
    this.notifications.filter(e => (e['type'] != not['type'] &&
       e['sender'] != not['sender'] && e['receiver'] != not['receiver']));
  }

  routePage(notification){
    this.router.navigate(['/view'], {queryParams : {profile : notification.sender, type : notification.type}})
  }
}
