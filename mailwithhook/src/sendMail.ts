require('dotenv').config()
import express from 'express';
import nodemailer from 'nodemailer';
import { EmailSender } from './EmailSender';

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

const email1 = new EmailSender(transporter, {
    from: 'test@example',
    to: 'touyou@example.com',
    subject: 'mailWithHook',
    text: 'Plain Text',
    html: ({path: './public/mail.html'})
})
const email2 = new EmailSender(transporter, {
    from: 'test@example',
    to: 'touyou@example.com',
    subject: 'mailWithHook',
    text: 'Secondary text',
    html: ({path: './public/second_mail.html'})
})



router.get('/send-mail', (req, res) => {
    email1.send()
        .then(() => {
            res.send('<h2>Message sent.</h2>')
            res.end();
        })
        .catch(error => {
            res.send(`<h1>Ooop ... Error has occured.</h1>
            <h3>${error}</h3>`);
            res.end();
        })
});

router.get('/send-mail2', (req, res) => {
    email2.send()
    .then(() => {
        res.write('<h1>Check your email again.</h1>')
        res.end();
    })
    .catch(error =>  {
        res.send(`<h1>Ooop ... Error has occured.</h1>
                <h3>${error}</h3>`);
        res.end();
    })
})

export default router;