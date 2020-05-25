import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Board } from "./board.ts";
import { render } from "./renderer.ts";


const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

const board = new Board(4);

export const renderBoard =  ({ response }: { response: any }) => {
  console.log('renderBoard')
  response.type = "html";
  response.body = "<h1>Hello Board</h1>";
  response.body += render(board);

  response.status = 200
};


export const clickXY = ({
  params,
  response
}: {
  params: {
    x: string,
    y: string
  }
  response: any
}) => {
  response.type = "html";
  response.body = "<h1>Hello Board</h1>";
  board.move(parseInt(params.x), parseInt(params.y))
  response.body += render(board);
  response.status = 200
};


const router = new Router();
router
  .get("/p15", renderBoard)
  .get("/move/:x/:y", clickXY);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
