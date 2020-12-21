import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private playerId: number;
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedInState = this.isLoggedIn.asObservable();

  constructor() {
    this.playerId = Math.floor(Math.random() * (-99999 + 10000 + 1)) - 10000;
    this.isLoggedIn.next(false);
  }

  public handleLoginResponse(message){
    if(message.isSuccessful){
      this.playerId = message.playerId;
      this.isLoggedIn.next(true);
    }
  }

  public getPlayerId(){
    return this.playerId;
  }
}
