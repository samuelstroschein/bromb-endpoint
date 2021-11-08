import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import type { Integration } from "./types/Integration.ts";
import type { Submission } from "./types/Submission.ts";
// load env file automatically
import "https://deno.land/x/dotenv/load.ts";
import { WidgetConfig } from "./types/WidgetConfig.ts";

const app = new Application();
const router = new Router();
const pathToIntegration = Deno.env.get("PATH_TO_INTEGRATION");

if (pathToIntegration === undefined) {
  throw "The env file does not specify PATH_TO_INTEGRATION which is required.";
}

// integration is a function that you can specify with the PATH_TO_INTEGRATION
// env variable
const integration: Integration = await import(pathToIntegration);

router
  .get("/", async (context) => {
    context.response.body = await Deno.readFile("./index.html");
    context.response.type = "html";
  })
  .get("/config/:organizationName/:projectName", async (context) => {
    if (
      context.params &&
      context.params.organizationName &&
      context.params.projectName
    ) {
      const decoder = new TextDecoder("utf-8");
      const widgetConfigs = JSON.parse(
        decoder.decode(await Deno.readFile("./widgetConfig.json"))
      ) as WidgetConfig[];
      console.log({
        configs: widgetConfigs,
        find: widgetConfigs.find(
          (config) =>
            config.organizationName === context.params.organizationName &&
            config.projectName === context.params.projectName
        ),
      });
      context.response.body = widgetConfigs.find(
        (config) =>
          config.organizationName === context.params.organizationName &&
          config.projectName === context.params.projectName
      );
      if (context.response.body === undefined) {
        context.response.status = 404;
      }
    }
  })
  .post("/submission", async (context) => {
    context.response.status = await integration.submission({
      submission: (await context.request.body().value) as unknown as Submission,
    });
  });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port 7600...`);
await app.listen({ port: 7600 });
