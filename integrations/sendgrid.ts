import { Status } from "https://deno.land/x/oak/mod.ts";
import { sendSimpleMail } from "https://deno.land/x/sendgrid@0.0.3/mod.ts";
import { Submission } from "../types/Submission.ts";

const requiredEnvVariables = [
  "SENDGRID_API_KEY",
  "SENDGRID_FROM_EMAIL",
  "SENDGRID_TO_EMAIL",
];

// sendSimpleMail()

export async function submission(args: {
  submission: Submission;
}): Promise<Status> {
  const env = Deno.env.toObject();
  if (requiredEnvVariables.some((value) => env[value] === undefined)) {
    throw `Missing required env variables ${requiredEnvVariables}`;
  }
  const mail = await sendSimpleMail(
    {
      subject: `Submission ${args.submission.categoryId}`,
      from: { email: env["SENDGRID_FROM_EMAIL"] },
      to: [{ email: env["SENDGRID_TO_EMAIL"] }],
      content: [
        {
          type: "text/html",
          value: `		
            <b><p>${args.submission.body}</p></b>
            <br>
            `,
        },
      ],
    },
    { apiKey: env["SENDGRID_API_KEY"] }
  );
  if (mail.errors) {
    return 500;
  } else {
    return 200;
  }
}
