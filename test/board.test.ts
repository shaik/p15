import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { Board } from "../src/board.ts";

Deno.test("setup board", () => {
  const l: number = 4;

  const board = new Board(4);
  assertEquals(board.size, l);
});

Deno.test("set board", () => {
  const l: number = 4;
  const board = new Board(l);

  let newBoard: number[][] = [
    [15, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 1],
  ];
  assertNotEquals(newBoard, board.board);
  board.board = newBoard;
  assertEquals(newBoard, board.board);
});


Deno.test("shuffle", () => {
    const l: number = 6;
    const board = new Board(l);
    board.shuffle();
    assertEquals(sumBoard(board), l*l * (l * l-1) / 2);

  });

  function sumBoard(b: Board) {
    return b.board.flat().reduce((a, v) => a+v)
  }

  