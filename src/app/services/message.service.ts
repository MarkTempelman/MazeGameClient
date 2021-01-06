import { Injectable } from '@angular/core';
import {MessageType} from '../enums/message-type';
import {DataService} from './data.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public stompClient;
  private playerId = 0;

  private lobbyJoinedMessage = new BehaviorSubject<any>({});
  lobbyJoinedState = this.lobbyJoinedMessage.asObservable();

  private playerJoinedMessage = new BehaviorSubject<any>({});
  playerJoinedState = this.playerJoinedMessage.asObservable();

  private startGameMessage = new BehaviorSubject<any>({});
  startGameState = this.startGameMessage.asObservable();

  private movementUpdateMessage = new BehaviorSubject<any>({});
  movementUpdateState = this.movementUpdateMessage.asObservable();

  constructor(private data: DataService, private router: Router) {
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
      case MessageType.JoinedLobby:
        this.lobbyJoinedMessage.next(message);
        this.router.navigate(['lobby/current']);
        break;
      case MessageType.PlayerJoined:
        this.playerJoinedMessage.next(message);
        break;
      case MessageType.StartGame:
        this.startGameMessage.next(message);
        break;
      case MessageType.MovementUpdate:
        this.movementUpdateMessage.next(message);
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
