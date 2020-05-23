export class Board {
  private _board: number[][] = [[]];
  private _size = 0;

  constructor(size: number) {
    this._size = size;
    for (let i: number = 0; i < size; i++) {
      this._board[i] = [];
      for (let j: number = 0; j < size; j++) {
        this._board[i][j] = 0;
      }
    }
  }

  shuffle() {
    let a: number[] = [];
    for (let i = this.size * this.size - 1; i > 0; i--) a.push(i);
    for (let i = this.size * this.size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    for (let i: number = 0; i < this.size; i++) {
      this._board[i] = [];
      for (let j: number = 0; j < this.size; j++) {
        this._board[i][j] = a.pop() || 0;
      }
    }
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
}
