import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import * as Rx from 'rxjs/Rx';
import {environment} from 'src/environments/environment'
import {Subject} from 'rxjs/Rx'
import { Message } from '../models/messsage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Rx.Subject<Message>

  constructor(private sws: WebsocketService) {
    this.messages = <Rx.Subject<Message>>sws
    .connect(environment.CHAT_URL)
    .map((response: MessageEvent): Message => {
      let data = JSON.parse(response.data);
      return {
        author: data.author,
        message: data.message
      }
    })
  }
}
