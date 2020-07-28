import { Component } from '@angular/core';
import {Message} from './models/messsage'
import {ChatService} from './services/chat.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'websocket-test';

  messages: Message[] = [];
  message: Message

  constructor(private chatService: ChatService){
    this.chatService.messages.subscribe(
      next => {
        this.message = next;
        let d: Message = {
          author: 'Echo Server',
          message: this.message.message
        }
        this.messages.push(d);
      },
      error => {
        console.log("There is an error in subscribing websocket for messages");
      }
    )
  }

  sendMessage(msg: any){
    let data: Message = {
      author: 'You',
      message: msg.value
    };
    this.messages.push(data);
    this.chatService.messages.next(data);
  }
}
