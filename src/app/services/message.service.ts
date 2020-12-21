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
  private playerId = 0;

  constructor(private data: DataService) {
    this.playerId = data.getPlayerId();
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    const serverUrl = 'http://localhost:8070/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.subscribeToWebSocket();
    });
  }

  subscribeToWebSocket(){
    this.stompClient.subscribe('/message/' + this.playerId, (message) => {
      if (message.body) {
        this.handleMessage(JSON.parse(message.body))
      }
    }, {id: this.playerId});
  }

  sendMessage(message, address: String){
    message['sender'] = this.playerId;
    this.stompClient.send('/app/' + address , {}, JSON.stringify(message));
  }

  handleMessage(message){
    switch(message.messageType){
      case MessageType.LoginResponse:
        this.data.handleLoginResponse(message);
        this.playerIdUpdated(this.data.getPlayerId());
        break;
      default:
        break;
    }
  }

  playerIdUpdated(playerId: number){
    if(this.playerId != 0){
      this.stompClient.unsubscribe(this.playerId);
    }
    this.playerId = playerId;
    this.subscribeToWebSocket();
  }
}
