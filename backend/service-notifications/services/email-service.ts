import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mail-config';

import { SendMailOptionsDto } from "../dto/SendMailOptionsDto"

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: mailConfig.service,
      secure: mailConfig.secure,
      auth: mailConfig.auth,
    });
  }

  async sendMail(options: SendMailOptionsDto) {
    await this.transporter.sendMail({
      from: mailConfig.auth.user,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }
}

module.exports = new EmailService();