import nodemailer from 'nodemailer';

export class EmailSender {
    transporter: nodemailer.Transporter;
    emailOptions: nodemailer.SendMailOptions;

    constructor(transporter: nodemailer.Transporter, emailOptions: nodemailer.SendMailOptions) {
        this.transporter = transporter;
        this.emailOptions = emailOptions;
    }

    send<T>(): Promise<T> {
       return this.transporter.sendMail(this.emailOptions)
    }

}