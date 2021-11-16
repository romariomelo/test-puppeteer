import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  async sendMail(html) {
    console.log(
      `>>> Sending email from ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`,
    );
    // const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      // port: Number(process.env.EMAIL_PORT),
      // secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      service: 'Outlook365',
    });

    const info = await transporter.sendMail({
      from: `"Romario" <${process.env.EMAIL_ADDR}>`,
      to: ['romario.melo@omegaenergia.com.br'],
      subject: 'Pautas Aneel',
      text: 'Hello world?',
      html,
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
