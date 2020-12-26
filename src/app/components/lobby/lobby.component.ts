import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //todo:
//   keep navbar at top when logged in
//    have a reference to it in all components
//   only show login or register when not logged in
//   when not loggedIn redirect to login page
//    Maybe if(!loggedIn){redirect to lobby/login}
//    Not ideal but should work
}
