import nodeMailer from "nodemailer";
import { envs } from "../config";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachements?: attachments[];
}

interface attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter;

  constructor(
    service: string=envs.MAILER_SERVICE,
    user: string=envs.MAILER_EMAIL,
    pass: string=envs.MAILER_SECRET_KEY,
    private readonly send: boolean=envs.SEND_EMAIL
  ) {
    this.transporter = nodeMailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  async sendEmail(opt: SendEmailOptions): Promise<boolean> {
    try {
      if (!this.send) return true;
      const sendInformation = await this.transporter.sendMail(opt);
      // console.log(sendInformation);
      return true;
    } catch (error) {
      return false;
    }
  }
}
