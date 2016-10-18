export class ChatMessage {
  timeStamp: string;
  constructor(public message: string, public uid: string) { 
    this.timeStamp = new Date().toLocaleDateString();
  }
}

/* export interface IChat {
  $key?:            string;
  messages:         Array<ChatMessage>;
  participants:     Array<string>;
  
  addMessage(text: string, uid: string);
} */

export class Chat {
  key:            string;
  messages:         Array<ChatMessage>;
  participants:     Array<string>;
  
  constructor(participants: Array<string>, id: string) {
    this.messages = new Array<ChatMessage>();
	this.key = "c" + id;
  }
  
  setMessages(msgs:Array<ChatMessage>){
	  this.messages = msgs;
  }
}

