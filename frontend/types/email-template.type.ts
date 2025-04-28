export interface IEmailTemplate {
  id: string;
  subject: string;
  group: string;
  htmlContent: string;
  metaData: string;
  textContent: string;
  archived: boolean;
  isSystemDefault: boolean;
}
