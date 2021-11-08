import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import type { Integration } from "./src/types/Integration.ts";
import type { Submission } from "./src/types/Submission.ts";
// load env file automatically
import "https://deno.land/x/dotenv/load.ts";
import { WidgetConfig } from "./src/types/WidgetConfig.ts";
import { integrations } from "./src/integrations/index.ts";

const app = new Application();
const router = new Router();
let integrationName = Deno.env.get("INTEGRATION_FILE_NAME");

if (integrationName === undefined) {
  console.warn(
    "Warning: The env file does not specify INTEGRATION_FILE_NAME. Using consoleLog as fallback"
  );
  integrationName = "consoleLog";
}

// integration is a function that you can specify with the INTEGRATION_FILE_NAME
// env variable. IntegrationName
const integration: Integration = integrations[integrationName as "consoleLog"]; // ugly workaround for type safety

router
  .get("/", async (context) => {
    console.log({ env: Deno.env.toObject() });
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
