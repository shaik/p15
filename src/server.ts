import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { Board } from "./board.ts";

const board = new Board(4);
let listenPromise: Promise<void>;

export const getBoard = (({ response }: { response: any }) => {
  response.body = JSON.stringify(board.board.flat());
  response.status = 200;
});

export const move = ({ params, response }: {
  params: { x: string; y: string };
  response: any;
}) => {
  board.move(parseInt(params.x), parseInt(params.y));
  response.body = JSON.stringify(board.board.flat());
  response.status = 200;
};

export const shuffle = ({ params, response }: {
  params: { times: string };
  response: any;
}) => {
  board.shuffle(parseInt(params.times) || 1);
  response.body = JSON.stringify(board.board.flat());
  response.status = 200;
};

export const startServer =  (host: string, port : number) => {
    const controller = new AbortController();
    const { signal } = controller;
    return app.listen(`${host}:${port}`);
}

export const killServer =  () => {
  console.log('aborting server');
  controller.abort();
}

const controller = new AbortController();
const { signal } = controller;

const router = new Router();
router
  .get("/rest/getboard", getBoard)
  .get("/rest/move/:x/:y", move)
  .get("/rest/shuffle/:times", shuffle);

export const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});
