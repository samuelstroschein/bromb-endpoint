import { Status } from "https://deno.land/x/oak/mod.ts";
import type { Submission } from "../types/Submission.ts";

// const requiredEnvVariables = []

export function submission(args: { submission: Submission }): Status {
  console.log({ submission: args.submission });
  return 200;
}
