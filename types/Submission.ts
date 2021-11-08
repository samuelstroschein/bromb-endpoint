export type Submission = {
  organizationName: string;
  projectName: string;
  categoryId: string;
  body: string;
  attachments: { name: string; dataUrl: string }[];
  metadata: Record<string, string>;
};
