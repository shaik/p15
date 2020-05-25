import { Board } from "./board.ts";
import { renderBoard } from "./app.ts";

export function render (b: Board) :string{
    let s: string = '';
    let l : string[]; 
    for (let y=0; y<b.size; y++){
        l=[];
        for (let x=0; x<b.size; x++) {
            let v:number =b.board[y][x];
            l.push(sq(x, y, v))
        }
        s += l.join(' + ');
        s += '<br/>';
    }
    return s;
}

function sq(x: number, y: number, v: number) :string {
    let img : string = '<img src="https://img.icons8.com/ios-glyphs/90/000000/'+ v +'.png"/>'
    let s: string ='';
    s = '<a href ="/move/' + x + '/' + y +'">';
    s += img;
    s+= '</a>';
    return s;
}