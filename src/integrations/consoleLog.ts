import { Status } from "https://deno.land/x/oak/mod.ts";
import type { Submission } from "../types/Submission.ts";
import type { Integration } from "../types/Integration.ts";

// const requiredEnvVariables = []

function submission(args: { submission: Submission }): Status {
  console.log({ submission: args.submission });
  return 200;
}

export const consoleLog: Integration = {
  submission,
};
