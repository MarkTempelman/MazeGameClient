import { Injectable } from '@angular/core';
import {Player} from '../models/player';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private router: Router) { }

  public joinedLobby(message){

  }

  public playerJoined(message){

  }

}
