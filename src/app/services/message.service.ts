import { Injectable } from '@angular/core';
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public stompClient;
  public msg = [];

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    const serverUrl = 'http://localhost:8070/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send('/app/send/message' , {}, message);
  }

}
