import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Chat } from '../chat';
import { Call } from '../call';
import { ChatService} from '../chat.service';
import { UserService } from '../user.service';
import { CallService } from '../call.service';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  currentChat: FirebaseObjectObservable<Chat>;
  users: Object;
  currentCall:Call;
  currentText: string;
  added:boolean;

  constructor(
    private route: ActivatedRoute,
    private us: UserService,
    private router: Router,
    private service: ChatService,
    private cs:CallService
  ) {
    this.currentText = "";
    this.users = {};
  }

  ngOnInit() {
    this.added = false;
    this.route.params.forEach((params: Params) => {
    var id = params['id'];
	  if(id){
		  this.currentChat = this.service.getChat(id);
      this.cs.getCall(id).subscribe((call:Call)=>{
        this.currentCall = call;
        this.us.getUser(call.owner).subscribe(user=>this.users[call.owner] = user);
        this.us.getUser(call.helper).subscribe(user=>this.users[call.helper] = user);
      });
		  this.currentChat.subscribe(x=>{
  			if (x.hasOwnProperty('$value') && !x['$value']) {
  				var chat = new Chat([], id);
  				this.service.createChat(chat);
  				this.service.currentChat = chat;
          this.added = true;
  			} else {
  				this.service.currentChat = new Chat([], x['$key']);
  				this.service.currentChat.setMessages(x.messages);
          this.added = true;
  			}
		  });
	  }
    });
  }
  ngAfterViewChecked() {
    if(this.added){
      var messages = document.getElementById('messages');
      messages.scrollTop = messages.scrollHeight;
      this.added = false;
    }
  }

  submitMessage() {
    if (this.currentText != ""){
      this.service.addMessage(this.currentText, this.us.user.uid);
  	  this.currentChat.update(this.service.currentChat);
  	  this.service.updateChat();
  	  this.currentText = "";
      this.added = true;
    }else
      window.alert("Você não digitou uma mensagem!!");
  }
  validateMessage(event){
    if(event.keyCode == 13 && !event.shiftKey){
      this.submitMessage();
      event.preventDefault();
    }
  }
}
