import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router) {
    if(localStorage.getItem('playerId') == null){
      localStorage.setItem('playerId', this.getRandomId().toString())
    }
    if(localStorage.getItem('isLoggedIn') == null){
      localStorage.setItem('isLoggedIn', "false");
    }
  }

  public handleLoginResponse(message){
    if(message.isSuccessful){
      localStorage.setItem('playerId', message.playerId);
      localStorage.setItem('isLoggedIn', message.isSuccessful);
      this.router.navigate(['']);
    }
  }

  public getPlayerId(): number{
    return JSON.parse(localStorage.getItem('playerId'));
  }

  private getRandomId(){
    return Math.floor(Math.random() * (-99999 + 10000 + 1)) - 10000;
  }
}
