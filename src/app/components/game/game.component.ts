import {Component, HostListener, OnInit} from '@angular/core';
import {Wall} from '../../models/wall';
import {Position} from '../../models/position';
import {MessageService} from '../../services/message.service';
import {skip} from 'rxjs/operators';
import {Direction} from '../../enums/direction';
import {Player} from '../../models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public gridSize: number = 40;
  walls: Wall[] = [];
  players: Player[];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.startGameState.pipe(skip(1)).subscribe(m => this.startGame(m))
    this.messageService.movementUpdateState.pipe(skip(1)).subscribe(m => this.updatePlayerPosition(m))
  }

  private startGame(message){
    this.addWallsToArray(message.walls);
    this.players = message.players;
    this.translatePlayers();
    this.translateWalls();
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
      wall.position.x *= that.gridSize
      wall.position.y *= that.gridSize
    });
  }

  private translatePlayers(){
    let that = this;
    this.players.forEach(function (player){
      player.position.x *= that.gridSize
      player.position.y *= that.gridSize
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyEventKeyDown(event: KeyboardEvent) {
    let direction: Direction;
    const key = event.key;
    if (key == 'ArrowLeft') { direction = Direction.Left; } // LEFT
    if (key == 'ArrowUp')  { direction = Direction.Up; } // UP
    if (key == 'ArrowRight') { direction = Direction.Right; } // RIGHT
    if (key == 'ArrowDown') { direction = Direction.Down; } // DOWN

    if (key == 'a') { direction = Direction.Left; } // LEFT
    if (key == 'w') { direction = Direction.Up; } // UP
    if (key == 'd') { direction = Direction.Right; } // RIGHT
    if (key == 's') { direction = Direction.Down; } // DOWN
    if(direction != null){
      this.messageService.sendMessage(this.createMoveMessage(direction), 'move')
    }
  }

  createMoveMessage(direction: Direction){
    return {
      direction: direction,
      playerId: sessionStorage.getItem('playerId'),
      lobbyId: sessionStorage.getItem('lobbyId'),
    }
  }

  updatePlayerPosition(message){
    this.players = message.players;
    this.translatePlayers();
  }
}
