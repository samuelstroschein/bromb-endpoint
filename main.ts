import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx: any) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 7600 });
