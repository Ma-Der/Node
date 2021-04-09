import express from 'express';

import { Translator } from './Translator';
import { FileHandler } from './FileHandler';
import { pl, requestBody } from './data';

const PORT = process.env.port || 3000;
const key = 'AIzaSyDnEN3BauxzHlTCWAnK09Sv47U2hJfb4ZU';

const app = express();

app.get('/', (req, res) => {
    const translator = new Translator(pl, key, requestBody.lang).createTranslatedObject()
    const fileHandler = new FileHandler(`./translations/${requestBody.lang}.json`);

    if(fileHandler.checkCacheExist()) {
        fileHandler.readFromFile()
            .then(data => {
                res.write(JSON.stringify(data));
                res.end();
            })
    } else {
        translator
        .then(data => {
            fileHandler.saveToFile(data);
            res.write(JSON.stringify(data));
            res.end();
        })
    }


})

app.listen(PORT, () => {
    console.log(`Listening o port ${PORT}.`);
});