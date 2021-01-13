import {Position} from './position';

export class Player{
  username: string;
  id: number;
  position: Position;
  distanceTraveled: number;

  constructor(id: number, x: number, y: number, username: string) {
    this.position = new Position(x, y);
    this.username = username;
  }
}
