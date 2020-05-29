import {
    assertEquals,
    assertNotEquals,
  } from "https://deno.land/std/testing/asserts.ts";
import {app} from "../src/server.ts"



Deno.test("start server", async () => {
  await app.listen(`127.0.0.1:4000`);

  assertEquals(1, 1);

})
