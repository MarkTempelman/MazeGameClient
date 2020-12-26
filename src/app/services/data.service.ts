import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedInState = this.isLoggedIn.asObservable();

  constructor() {
    if(sessionStorage.getItem('playerId') == null){
      sessionStorage.setItem('playerId', this.getRandomId().toString())
    }
    if(sessionStorage.getItem('isLoggedIn') == null){
      sessionStorage.setItem('isLoggedIn', "false");
    }
    this.isLoggedIn.next(false);
  }

  public handleLoginResponse(message){
    if(message.isSuccessful){
      sessionStorage.setItem('playerId', message.playerId);
      sessionStorage.setItem('isLoggedIn', message.isSuccessful);
      this.isLoggedIn.next(true);
    }
  }

  public getPlayerId(): number{
    return JSON.parse(sessionStorage.getItem('playerId'));
  }

  private getRandomId(){
    return Math.floor(Math.random() * (-99999 + 10000 + 1)) - 10000;
  }
}
