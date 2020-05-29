import { Board } from "./board.ts";
import { renderBoard } from "./app.ts";

let imgs: string[] = [];
initImageRLs();

function initImageRLs() {
  for (let i: number = 0; i < 10; i++) {
    let imgId: number = 752663 + i;
    imgs[i] = "https://image.flaticon.com/icons/svg/752/" + 752663 + i + ".svg";
  }
}
export function render(b: Board): string {
  let s: string = "<h1>P15 (SSR)</h1>";
  let l: string[];
  for (let y = 0; y < b.size; y++) {
    l = [];
    for (let x = 0; x < b.size; x++) {
      let v: number = b.board[y][x];
      l.push(sq(x, y, v));
    }
    s += l.join(" + ");
    s += "<br/>";
  }
  return s;
}

function sq(x: number, y: number, v: number): string {
  let img: string = '<img src="' + imgs[v] + '" width="150" height="150"/>';
  let s: string = "";
  s = '<a href ="/move/' + x + "/" + y + '">';
  s += img;
  s += "</a>";
  return s;
}