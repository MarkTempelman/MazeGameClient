import { Component } from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MazeGameClient';
  signedIn: boolean;

  constructor(private data: DataService, private router: Router){
    this.signedIn = false;
    this.data.loggedInState.subscribe(signedIn => this.signIn(signedIn));
  }

  signIn(signedIn: boolean){
    this.signedIn = signedIn;
    if(this.signedIn == true){
      this.router.navigate(['home']);
    }
  }
}

