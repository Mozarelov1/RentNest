export interface SendMailOptionsDto {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}