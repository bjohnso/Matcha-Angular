import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import {Message} from '../models/message.model';
import { take } from 'rxjs/operators';
import {CoreComponent} from '../core/core.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends CoreComponent implements OnInit {

  match_id :number = 1; //need to get from service
  messageList : Message[];
  message : string;
  id : number = 23; //temo not needed when login

  constructor(private chat: ChatService) {
    super();
  }

  ngOnInit(): void {

    this.chat.joinChatroom(this.match_id);

    this.chat.getMessages(this.match_id).pipe(take(1)).subscribe(data => {
      this.messageList = data['data'];
    })

    this.chat.getMessagesFromSocket().subscribe((message :Message) =>{
      if (message.author != this.id)
        this.messageList.push(message);
    });

  }

  sendMessage(){
    this.chat.sendMessage(this.message, this.match_id).subscribe(data => {return data});
    this.messageList.push({author : this.id, content : this.message, date : new Date()});
    this.message = "";
  }


}
