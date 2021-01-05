import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router) {
    if(sessionStorage.getItem('playerId') == null){
      sessionStorage.setItem('playerId', this.getRandomId().toString())
    }
    if(sessionStorage.getItem('isLoggedIn') == null){
      sessionStorage.setItem('isLoggedIn', "false");
    }
  }

  public handleLoginResponse(message){
    if(message.isSuccessful){
      sessionStorage.setItem('playerId', message.playerId);
      sessionStorage.setItem('isLoggedIn', message.isSuccessful);
      this.router.navigate(['']);
    }
  }

  public getPlayerId(): number{
    return JSON.parse(sessionStorage.getItem('playerId'));
  }

  private getRandomId(){
    return Math.floor(Math.random() * (-99999 + 10000 + 1)) - 10000;
  }
}
