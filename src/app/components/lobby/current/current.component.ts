import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Player} from '../../../models/player';
import {skip} from 'rxjs/operators';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  private lobbyId: number;
  private players: Player[];

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.players = [];
    this.messageService.lobbyJoinedState.subscribe(m => this.handleLobbyJoinedMessage(m));
    this.messageService.playerJoinedState.pipe(skip(1)).subscribe(m => this.handlePlayerJoinedMessage(m));
  }

  private handleLobbyJoinedMessage(message){
    let that = this;
    message.players.forEach(function(player){
      that.players.push(<Player>player)
    });
    console.log(this.players);
    this.lobbyId = message.lobbyId;
    sessionStorage.setItem('lobbyId', this.lobbyId.toString());
  }

  private handlePlayerJoinedMessage(message){
    this.players.push(<Player>message.player)
  }

}
