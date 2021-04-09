import fetch from "node-fetch";
import {URLSearchParams} from 'url';

export class Translate {

    textToTranslate: string[];
    key: string;
    targetLanguage: string;

    constructor(textToTranslate: string[], key: string, targetLanguage: string) {
        this.textToTranslate = textToTranslate;
        this.key = key;
        this.targetLanguage = targetLanguage;
    }

    async translate() {
        const targetParam = `&target=${this.targetLanguage}`;
        const textArray: string[] = [];

        for(const i in this.textToTranslate) {
            const qParam = `&q=${this.textToTranslate[i]}`;
            const result = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.key}`, {
                method: 'POST',
                body: new URLSearchParams(targetParam+qParam)
            })
            .then(res => res.json())

            textArray.push(result.data.translations[0].translatedText)
        }
        return textArray;

    }
}