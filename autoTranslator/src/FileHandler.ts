import fs from 'fs';

interface Content {
    [key: string]: string | {};
}

export class FileHandler {

    path: string;

    constructor(path: string) {
        this.path = path;
    }

    checkCacheExist(): boolean {
        if(fs.existsSync(this.path)) {
            return true;
        }
        return false;
    }

    readFromFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, (err, data) => {
                console.log("Response from a file.");
                resolve(JSON.parse(data.toString()));
                reject(err);
            })
        })
    }

    saveToFile(content: Content) {
        fs.writeFile(this.path, JSON.stringify(content), () => console.log(`Saved to ${this.path}`));
    }
}