import {pl} from './data';

interface encodeResult {
  [key: string]: string;
}

interface decodeResult {
  [key: string]: any;
}

export class Preprocessor {

    encode<T>(obj: T, prefix ='', result: encodeResult = {}) {
        return Object.entries(obj).reduce((r, [key, value]) => {
            const prefixedKey = `${prefix}${key}`;
            if(value instanceof Object){ 
               this.encode(value, `${prefixedKey}.`, r)
            } else {
                result[prefixedKey] = value;
            }                      
            return r;
        }, result);
    }

    decode<T>(obj: T) {
            let result: decodeResult = {}
            for (const key in obj) {
              const keys = key.split('.')
              keys.reduce((r, e, i) => {
                return r[e] || (r[e] = isNaN(Number(keys[i + 1])) ? (keys.length - 1 === i ? obj[key] : {}) : [])
              }, result)
            }
            return result
    }
}
