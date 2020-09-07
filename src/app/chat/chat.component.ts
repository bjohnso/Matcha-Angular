import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ChatService } from '../services/chat.service';
import {Message} from '../models/message.model';
import { take } from 'rxjs/operators';
import {CoreComponent} from '../core/core.component';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/services/profile.service';
import { Profile } from '../profile/models/profile.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends CoreComponent implements OnInit {

  match_id :number;
  messageList : Message[];
  message : string;
  id : number; 
  username : string;

  constructor(private chat: ChatService, private actRoute : ActivatedRoute, private profileService : ProfileService) {
    super();
  }

@ViewChild('messageBottom', {static : true}) messageBottom: ElementRef;

  ngOnInit(): void {

    if (this.actRoute.queryParams || this.actRoute.queryParams != undefined){
      this.actRoute.queryParams.pipe(take(1)).subscribe(
         async params => {
           console.log(params);
           this.profileService.getProfile().pipe(take(1)).subscribe(
             e => {
               if (e['success'])
                 this.id = e['data']['id'];
                 this.username = params.profile;

                 this.chat.joinChatroom(params.match_id);

                  this.chat.getMessages(params.match_id).pipe(take(1)).subscribe(data => {
                    this.messageList = data['data'];
                  })

                  this.match_id = params.match_id;
             })
         }
     )
   }

    

    this.chat.getMessagesFromSocket().subscribe((message :Message) =>{
      if (message.author != this.id)
        this.messageList.push(message);
    });

    this.messageBottom.nativeElement.scrollIntoView();
  }

  sendMessage(){
    console.log(this.match_id);
    this.chat.sendMessage(this.message, this.match_id).subscribe(data => {return data});
    this.messageList.push({author : this.id, content : this.message, date : new Date()});
    this.message = "";
  }

  profileAvatar:string = "http://dummyimage.com/241x205.png/5fa2dd/ffffff";

}
