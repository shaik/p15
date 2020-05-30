import {
    assertEquals,
    assertNotEquals,
  } from "https://deno.land/std/testing/asserts.ts";
import {app, startServer, killServer} from "../src/server.ts"
import {delay} from "https://deno.land/x/delay/delay.js"


Deno.test("start server",  async () => {;
  await startServer("127.0.0.1", 3333);
  await killServer();

  assertEquals(1, 1);

})
