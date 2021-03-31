import express, { request, text } from 'express';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
const PORT = process.env.port || 3000;
const key = 'AIzaSyDnEN3BauxzHlTCWAnK09Sv47U2hJfb4ZU';

const pl = {
    attention:{
        title:'Dobrze, że jesteś, sprawdź to zadanie',
        subtitle:'Pomoże Ci ogarnąć jak zmieniać język w apkach reacta',
        ctaButton:'Dowiedź się więcej',
    },
    newsletter:{
        title:'Bądź na bieżąco',
        ctaButton:'Idź do repo ->',
        action:'/new-subscriber?lang=pl'
    }
}

const requestBody = {
    lang:'it' 
}

app.get('/', (req, res) => {
    translate(req, res, pl)
        .then(data => {
            data.map(el => {
            res.write(`<div>${el}<div>`)

        })
        res.end();   
        })
        .catch(err => err)
})

async function translate<T>(req: express.Request, res: express.Response, obj: T): Promise<string[]>{
    const path = `./translations/${requestBody.lang}.json`;
    const targetParam = `&target=${requestBody.lang}`;
    
    const values  = Object.values(obj);
    const [...value] = values;
    const textArray: string[] = [];

    if(fs.existsSync(path)) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                console.log("Response from a file.");
                resolve(JSON.parse(data.toString()));
                reject(err);
            })
        })
    }
    for(const val of value) {
        for(const text of Object.values(val)) {

            let qParam = `&q=${encodeURIComponent(text)}`;
            if(text.length > 128) throw new Error('Phrase must contain maximum of 128 digits.');

            const phrase = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
                method: 'POST',
                body: new URLSearchParams(targetParam+qParam)
            })
            .then(res => res.json())
            
            textArray.push(decodeURIComponent(phrase.data.translations[0].translatedText));
        }
    }
    fs.writeFile(`./translations/${requestBody.lang}.json`, JSON.stringify(textArray), () => console.log(`Saved to ${requestBody.lang}.json`));
    
    return textArray;
}

app.listen(PORT, () => {
    console.log(`Listening o port ${PORT}.`);
});

