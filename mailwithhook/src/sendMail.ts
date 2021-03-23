import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: 'a354b4087722f2',
        pass: 'b1738aa48d7fe9'
    }
});

const _mailOptions = (path: string) => {
    const emailOptions = {
        from: 'test@example',
        to: 'touyou@example.com',
        subject: 'mailWithHook',
        text: 'Plain Text',
        html: ({path: path})
    }
    return emailOptions;
}

router.get('/send-mail', (req, res) => {
    transporter.sendMail(_mailOptions('./public/mail.html'))
        .then(() => {
            res.send('<h2>Message sent.</h2>')
            res.end();
        })
        .catch(error => console.log(error))
        
});

router.get('/send-mail2', (req, res) => {
    transporter.sendMail(_mailOptions('./public/second_mail.html'))
    .then(() => {
        res.write('<h1>Check your email again.</h1>')
        res.end();
    })
    .catch(error => console.log(error))
})

export default router;