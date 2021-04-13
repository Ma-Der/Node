import { Preprocessor } from './Preprocessor';
import { Translate } from './Translate';

interface EntryObject {
    [key: string]: unknown;
}

export class Translator {
    
    obj: EntryObject;
    key: string;
    targetLanguage: string;
    
    constructor(obj: EntryObject, key: string, targetLanguage: string) {
        this.obj = obj;
        this.key = key;
        this.targetLanguage = targetLanguage;
    }

    createArrayForTranslate(): string[] {
        const preprocessor = new Preprocessor();
        const flat = preprocessor.encode(this.obj);
        return Object.values(flat);
    }

    createFlatTranslatedObject(translatedText: string[]) {
        const preprocessor = new Preprocessor();
        const flat = preprocessor.encode(this.obj);

        let i: number = 0;
        const flatEntries = Object.entries(flat);
        const translatedArr = flatEntries.map(entry => {
            let [key, value] = entry;
            value = translatedText[i++];
            return [key, value];
        })
        const translatedObject = Object.fromEntries(translatedArr)
        return translatedObject;
    }

    createTranslatedObject() {

        const arrayForTranslate = this.createArrayForTranslate();
        const preprocessor = new Preprocessor();

        const translate = new Translate(arrayForTranslate, this.key, this.targetLanguage).translate()
        return translate.then(data => {
            const translatedFlatObject = this.createFlatTranslatedObject(data);
            const translatedObject = preprocessor.decode(translatedFlatObject);
            return translatedObject;
        });
    }  
}