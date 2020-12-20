import { Injectable } from '@angular/core';
import {MessageType} from '../enums/message-type';
import {DataService} from './data.service';
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public stompClient;
  private playerId;

  constructor(private data: DataService) {
    this.data.playerIdState.subscribe(playerId => this.playerId = playerId);
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    const serverUrl = 'http://localhost:8070/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message/' + that.playerId, (message) => {
        if (message.body) {
          that.handleMessage(JSON.parse(message.body))
        }
      });
    });
  }

  sendMessage(message, address: String){
    message['sender'] = this.playerId;
    this.stompClient.send('/app/' + address , {}, JSON.stringify(message));
  }

  handleMessage(message){
    switch(message.messageType){
      case MessageType.LoginResponse:
        this.data.handleLoginResponse(message);
        break;
      default:
        break;
    }
  }
}
