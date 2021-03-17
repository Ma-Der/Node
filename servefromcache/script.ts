import fetch from 'node-fetch';
import axios from 'axios';

const fs = require('fs');

function withFetch<T>(query: string): Promise<T> {
    if(query.length < 3) throw new Error('Not enough digits');

    const url = 'https://www.googleapis.com/books/v1/volumes?';
    const path = `./cache/${query}.json`;

    return new Promise((resolve, reject) => {
        if(fs.existsSync(path)){
            fs.readFile(path, (err, data) => {
                if(err) throw err;
                console.log('From a file: ')
                resolve(JSON.parse(data));
            });
        } else {
            const queryToURL = new URLSearchParams({q: query})
            fetch(url + queryToURL)
                .then(resp => resp.json())
                .then(data => {
                    fs.writeFile(`./cache/${query}.json`, JSON.stringify(data), () => console.log(`Saved to ${query}.json`));
                    resolve(data);
                })
                .catch(err => reject(err))
        }
    })

}

function withAxios<T>(query: string): Promise<T> {
    if(query.length < 3) throw new Error('Not enough digits');

    const url = 'https://www.googleapis.com/books/v1/volumes?';
    const path = `./cache/${query}.json`;

    return new Promise((resolve, reject) => {
        if(fs.existsSync(path)){
            fs.readFile(path, (err, data) => {
                if(err) throw err;
                console.log('From a file: ')
                resolve(JSON.parse(data));
            });
        } else {
            const queryToURL = new URLSearchParams({q: query})
            axios.get(url + queryToURL)
                .then(resp => {
                    fs.writeFile(`./cache/${query}.json`, JSON.stringify(resp.data), () => console.log(`Saved to ${query}.json`));
                    resolve(resp.data);
                })
                .catch(err => reject(err))
        }
    })
}

withFetch('clarkson')
    .then(resp => console.log(resp))
withAxios('mickiewicz')
    .then(resp => console.log(resp));


    