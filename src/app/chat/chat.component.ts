import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import {CoreComponent} from '../core/core.component';
import {ChatService} from '../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../profile/services/profile.service';
import {take} from 'rxjs/operators';
import {Message} from '../models/message.model';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Profile, ProfileInterface} from '../profile/models/profile.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends CoreComponent implements OnInit {

  match_id: number;
  messageList: Message[];
  message: string;
  id: number;
  profile;
  username: string;
  faArrowRight = faArrowRight;
  profileAvatar = 'http://dummyimage.com/241x205.png/5fa2dd/ffffff';

  constructor(private chat: ChatService, private activatedRoute: ActivatedRoute,
              private profileService: ProfileService) {
    super();
    this.activatedRoute.data.subscribe(data => {
      const chatData = data.chatData;
      console.log(data);
      this.profile = new Profile(chatData.profile);
      this.match_id = chatData.matchId;
    });
  }

  @ViewChild('messageBottom', {static : true}) messageBottom: ElementRef;

  ngOnInit(): void {
    this.username = this.profile.username;
    this.chat.joinChatroom(this.match_id);
    this.chat.getMessages(this.match_id).pipe(take(1)).subscribe(data => {
      console.log(data);
      if (JSON.stringify(data.data) === JSON.stringify({})) {
        this.messageList = [];
      } else {
        this.messageList = (data as any).data;
      }
    });
    this.chat.getMessagesFromSocket().subscribe((message: Message) => {
      if (message.author !== this.id) {
        this.messageList.push(message);
      }
    });
    this.messageBottom.nativeElement.scrollIntoView();
  }

  sendMessage() {
    console.log(this.match_id);
    this.chat.sendMessage(this.message, this.match_id).subscribe(data => data);
    this.messageList.push({author : this.id, content : this.message, date : new Date()});
    this.message = '';
  }

}
