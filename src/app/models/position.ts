export class Position{
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public translate(translateValue: number){
    this.x *= translateValue;
    this.y *= translateValue;
  }
}
