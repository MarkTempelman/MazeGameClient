import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsername: string;
  loginPassword: string;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

  login(): void{
    if(this.loginUsername && this.loginPassword){
      let message = {
        username: this.loginUsername,
        password: this.loginPassword,
      }
      this.messageService.sendMessage(message, 'login');
      this.loginUsername = '';
      this.loginPassword = '';
    }
  }

}
