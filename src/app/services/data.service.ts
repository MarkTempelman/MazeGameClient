import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private playerId = new BehaviorSubject<number>(Math.floor(Math.random() * (-99999 + 10000 + 1)) - 10000);
  playerIdState = this.playerId.asObservable();
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedInState = this.isLoggedIn.asObservable();

  constructor() {
    this.isLoggedIn.next(false);
  }

  public handleLoginResponse(message){
    if(message.isSuccessful){
      this.playerId.next(message.playerId);
      this.isLoggedIn.next(true);
    }
  }

  public getPlayerId(){
    return this.playerId;
  }
}
