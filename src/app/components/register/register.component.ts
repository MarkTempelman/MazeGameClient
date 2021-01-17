import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      this.messageService.sendMessage(message, 'register');
      this.loginUsername = '';
      this.loginPassword = '';
    }
  }

}
