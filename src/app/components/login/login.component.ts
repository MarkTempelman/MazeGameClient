import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsername: string;
  loginPassword: string;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.websocketService.connect();
  }

}
