import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { Board } from "../src/board.ts";

const    testBoard: number[][] = [
  [15, 2,  3,  4 ],
  [5,  6,  7,  8 ],
  [9,  0, 10,  12],
  [13, 14, 11, 1 ],
];

Deno.test("setup board", () => {
  const l: number = 4;

  const board = new Board(l);
  assertEquals(board.size, l);
  assertEquals(sumBoard(board), l * l * (l * l - 1) / 2);
});

Deno.test("init board", () => {
  const board = new Board(2);
  assertEquals(board.board, [[0, 1], [2, 3]]);
});

Deno.test("set board", () => {
  const l: number = 4;
  const board = new Board(l);
  assertEquals(board.board.length, l);
  assertEquals(board.board[0].length, l);

  assertNotEquals(testBoard, board.board);
  board.board = testBoard;
  assertEquals(testBoard, board.board);
});


Deno.test("shuffle", () => {
  const l: number = 4;
  const board = new Board(l);
  board.shuffle(999);
  assertEquals(sumBoard(board), l * l * (l * l - 1) / 2);
  // todo: check validity of board after shuffle
});

Deno.test("randomize", () => {
  const l: number = 3;
  const board = new Board(l);
  board.randomize();
  assertEquals(sumBoard(board), l * l * (l * l - 1) / 2);
});

Deno.test("move out of bound fails", () => {
  const board = new Board(4);
  board.board = testBoard;
  assertEquals(board.move(5, 5), board.err.index_out_of_bound);
});

Deno.test("move blank fails", () => {
  const board = new Board(4);
  board.board = testBoard;
  assertEquals(board.move(1, 2), board.err.cant_move_blank);
});

Deno.test("move too far fails", () => {
  const board = new Board(4);
  board.board = testBoard;
  assertEquals(board.move(2, 1), board.err.index_too_far);
});


Deno.test("move workss", () => {
  const board = new Board(2);

  assertEquals(board.move(1, 0), 0);
  assertEquals(board.board, [[1,0], [2,3]]);

});



function sumBoard(b: Board) {
  return b.board.flat().reduce((a, v) => a + v);
}
