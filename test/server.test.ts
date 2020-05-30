import {
    assertEquals,
    assertNotEquals,
  } from "https://deno.land/std/testing/asserts.ts";
import {app, startServer, killServer} from "../src/server.ts"
import {delay} from "https://deno.land/x/delay/delay.js"


Deno.test("start server",  async () => {;
  const listenPromise = startServer("127.0.0.1", 3333);
  killServer();
  await listenPromise;
  assertEquals(1, 1);

})
