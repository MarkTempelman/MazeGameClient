import { Component, OnInit } from '@angular/core';
import {Wall} from '../../models/wall';
import {Position} from '../../models/position';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  walls: Wall[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
