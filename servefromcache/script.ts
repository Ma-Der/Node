global.fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');

function withFetch(query: string) {
    if(query.length < 3) throw new Error('Not enough digits');
    const url = 'https://www.googleapis.com/books/v1/volumes?';
    const path = `./cache/${query}.json`;
    if(fs.existsSync(path)){
        fs.readFile(path, (err, data) => {
            if(err) throw err;
            console.log('From a file: ')
            console.log(JSON.parse(data));
        });
    } else {
        const queryToURL = new URLSearchParams({q: query})
        fetch(url + queryToURL)
            .then(res => res.json())
            .then(data => {
                fs.writeFile(`./cache/${query}.json`, JSON.stringify(data), () => console.log('Written'));
            })
    }
}

function withAxios(query: string) {
    if(query.length < 3) throw new Error('Not enough digits');
    const url = 'https://www.googleapis.com/books/v1/volumes?';
    const path = `./cache/${query}.json`;
    if(fs.existsSync(path)){
        fs.readFile(path, (err, data) => {
            if(err) throw err;
            console.log(`From ${path}: `)
            console.log(JSON.parse(data));
        });
    } else {
        const queryToURL = new URLSearchParams({q: query})
        axios.get(url + queryToURL)
            .then(resp => {
                fs.writeFile(`./cache/${query}.json`, JSON.stringify(resp.data), () => console.log('Written'));
            })
    }
}

withAxios('clarkson');