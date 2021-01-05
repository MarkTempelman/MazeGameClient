import { Component, OnInit } from '@angular/core';
import {Wall} from '../../models/wall';
import {Position} from '../../models/position';
import {MessageService} from '../../services/message.service';
import {skip} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public gridSize: number = 40;
  walls: Wall[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.startGameState.pipe(skip(1)).subscribe(m => this.startGame(m))
  }

  private startGame(message){
    this.addWallsToArray(message.walls)
    this.translateWalls()
  }

  private addWallsToArray(walls){
    for(let y = 0; y < walls.length; y++){
      for(let x = 0; x < walls.length; x++){
        if(walls[y][x] != null){
          this.walls.push(walls[y][x]);
        }
      }
    }
  }

  private translateWalls(){
    let that = this;
    this.walls.forEach(function (wall){
      wall.position.x *= 40
      wall.position.y *= 40
    });
  }
}
