import {app} from "./server.ts"

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

console.log(`Listening on port ${PORT}...`);
console.log(" root " + `${Deno.cwd()}/static`);
await app.listen(`${HOST}:${PORT}`);


