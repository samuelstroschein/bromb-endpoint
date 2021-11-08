import { Status } from "https://deno.land/x/oak/mod.ts";
import { Submission } from "./Submission.ts";

export type Integration = {
  submission: (args: { submission: Submission }) => Promise<Status>;
};
