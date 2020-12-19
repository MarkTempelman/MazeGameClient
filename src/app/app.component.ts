import { Component } from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MazeGameClient';
  signedIn: boolean;

  constructor(private data: DataService){
    this.signedIn = false;
    this.data.loggedInState.subscribe(signedIn => this.signedIn = signedIn);
  }
}

