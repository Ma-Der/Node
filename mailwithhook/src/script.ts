import express from 'express';
import routes from './sendMail';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.write("<h1>Hello</h1>")
    res.write('<button onclick=window.location.href="http://localhost:3000/send-mail">SEND SPAM MAIL</button>')
    res.end();
})

app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

