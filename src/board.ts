export class Board {
  private _board: number[][] = [[]];
  private _size = 0;

  constructor(size: number) {
    this._size = size;
    this.init();
  }

  err = {
    "index_out_of_bound": -1,
    "index_too_far": -2,
    "cant_move_blank": -3,
  };

  private init() {
    let a: number[] = [...Array(this.size ** 2).keys()];
    this.fold(a);
  }

  private fold(a: number[]) {
    this._board = [];
    while (a.length > 0) {
      this._board.push(a.splice(0, this.size));
    }
  }

  randomize() {
    let a: number[] = [...Array(this.size ** 2).keys()];
    for (let i = this.size ** 2 - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.fold(a);
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

  shuffle(times: number = 1) {
    for (let i = 0; i < times; i++) {
      const optionalMoves = [];
      const [px, py] = this.getBlankPos();
      if (this.getVal(px - 1, py) > 0) optionalMoves.push([px - 1, py]);
      if (this.getVal(px + 1, py) > 0) optionalMoves.push([px + 1, py]);
      if (this.getVal(px, py - 1) > 0) optionalMoves.push([px, py - 1]);
      if (this.getVal(px, py + 1) > 0) optionalMoves.push([px, py + 1]);
      // console.log("options =", optionalMoves);
      let randomMove =
      optionalMoves[Math.floor(Math.random() * optionalMoves.length)];
      //console.log(i, 'move=', randomMove);
      this.move(randomMove[0], randomMove[1]);
    }
  }

  private getVal(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
      return this.err.index_out_of_bound;
    }
    return this._board[y][x];
  }

  move(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
      return this.err.index_out_of_bound;
    }
    if (this.board[y][x] === 0) return this.err.cant_move_blank;
    const [px, py] = this.getBlankPos();
    if (Math.abs(px - x) + Math.abs(py - y) != 1) return this.err.index_too_far;

    this.board[py][px] = this.board[y][x];
    this.board[y][x] = 0;
    return 0;
  }

  private getBlankPos(): [number, number] {
    const p: number = this.board.flat().findIndex((x) => x == 0);
    const zy: number = Math.floor(p / this.size);
    const zx: number = p % this.size;
    return [zx, zy];
  }

  toString(): string {
    let s: string = "\n";
    for (let i: number = 0; i < this.size; i++) {
      s += this._board[i].join(", ") + "\n";
    }
    return s;
  }
}
