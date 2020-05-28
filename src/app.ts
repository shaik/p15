import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { Board } from "./board.ts";
import { render } from "./renderer.ts";


const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

const board = new Board(4);

export const renderBoard =  ({ response }: { response: any }) => {
  response.type = "html";
  response.body = "<h1>Hello Board</h1>";
  response.body += render(board);
  response.body = JSON.stringify(board.board.flat());

  response.status = 200
};

export const getBoard = (({ response }: { response: any })=> {
  response.body = JSON.stringify(board.board.flat());
  response.status = 200
})

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
  board.move(parseInt(params.x), parseInt(params.y))
  response.body = JSON.stringify(board.board.flat());
  response.status = 200
};

export const move = ({
  params,
  response
}: {
  params: {
    x: string,
    y: string
  }
  response: any
}) => {
  board.move(parseInt(params.x), parseInt(params.y))
  response.body += render(board);
  response.status = 200
};


const router = new Router();
router
  .get("/p15", renderBoard)
  .get("/move/:x/:y", clickXY)
  .get("/rest/getboard", getBoard)
  .get("/rest/move/:x/:y", move)


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

console.log(`Listening on port ${PORT}...`);
console.log(' root ' + `${Deno.cwd()}/static`);
await app.listen(`${HOST}:${PORT}`);
