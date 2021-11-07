import { Application } from "https://deno.land/x/oak/mod.ts";
import deleteMe from "./integrations/delete-me.ts";

const app = new Application();

app.use((ctx: any) => {
  ctx.response.body = deleteMe();
});

await app.listen({ port: 7600 });
