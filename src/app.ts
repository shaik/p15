import {startServer} from "./server.ts"

const env = Deno.env.toObject();
const PORT: number = parseInt(env.PORT) || 4000;
const HOST: string = env.HOST || "127.0.0.1";

console.log(`Listening on port ${PORT}...`);
console.log(" root " + `${Deno.cwd()}/static`);
startServer(HOST, PORT);


