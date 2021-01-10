import {Position} from './position';
import {TileType} from '../enums/tile-type';

export class Tile{
  public position: Position;
  public tileType: TileType;

  constructor(pos: Position, tileType: TileType) {
    this.position = pos;
    this.tileType = tileType;
  }
}
