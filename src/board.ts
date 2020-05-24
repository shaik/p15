export class Board {
  private _board: number[][] = [[]];
  private _size = 0;

  constructor(size: number) {
    this._size = size;
    for (let i: number = 0; i < size; i++) {
      this._board[i] = [];
      for (let j: number = 0; j < size; j++) {
        this._board[i][j] = i*size + j;
      }
    }
  }

  shuffle() {
    let a: number[] = [...Array(this.size ** 2).keys()]
    for (let i =this.size ** 2 - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    this._board = [];
    while (a.length > 0) this._board.push(a.splice(0, this.size));
    
  }

  get board(): number[][] {
    return this._board;
  }

  set board(b: number[][]) {
    this._board = b;
  }

  get size(): number {
    return this._size;
  }

  toString(): string {
    let s: string = "\n";
    for (let i: number = 0; i < this.size; i++) {
      s += this._board[i].join(', ') + "\n";
    }
    return s;
  }
}
