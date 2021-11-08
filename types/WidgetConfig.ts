import { SubmissionCategory } from "./SubmissionCategory.ts";

export type WidgetConfig = {
  organizationName: string;
  projectName: string;
  submissionCategories: SubmissionCategory[];
};
