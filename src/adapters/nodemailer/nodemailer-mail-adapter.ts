import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "db6d3921f0bcf9",
      pass: "0cd9ec19bf5b6b"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: "Equipe Feedget <contato@feedget.com>",
            to: "Gabriel Barbosa <gotembarbosagd@gmail.com>",
            subject,
            html: body,
        })
    }
}