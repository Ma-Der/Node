import express from 'express';
import routes from './sendMail';
import path from 'path';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve('./'), 'public', 'index.html'));
})

app.use(routes);


app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

