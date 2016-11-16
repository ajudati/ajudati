import { Injectable } from '@angular/core';
import { Chat, ChatMessage } from './chat';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from './auth.service';

@Injectable()
export class ChatService {

  currentChat:Chat;
  chats:FirebaseListObservable<Chat[]>;

  constructor(private af:AngularFire, private as:AuthService) {
    this.currentChat = null;
	this.chats = this.af.database.list(`chats`);
  }

  addMessage(text: string, uid: string) {
    this.currentChat.messages.push(new ChatMessage(text, uid));
  }

  async createChat(chat:Chat){
	await this.chats.push(chat);
    return chat;
  }
  updateChat(): PromiseLike<void>{
	return this.chats.update(this.currentChat.key, this.currentChat);
  }
  removeChat(id:string): PromiseLike<void>{
    return this.chats.remove(id);
  }
  addParticipant(id:string, uid:string): PromiseLike<void>{
    this.currentChat.participants.push(uid);
	return this.updateChat();
  }
  
  removeParticipant(id:string, uid:string): PromiseLike<void>{
    var index = this.currentChat.participants.indexOf(uid);
	this.currentChat.participants.splice(index,1);
	return this.updateChat();
  }
  
  getChat(id:string):FirebaseObjectObservable<any>{
    return this.af.database.object(`chats/${id}`);
  }

}
