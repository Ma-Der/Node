import {pl} from './data';

export class Preprocessor {

    encode<T>(obj: T, prefix ='', result: any={}) {
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
            let result: any = {}
            for (const key in obj) {
              const keys = key.split('.')
              keys.reduce(function(r, e, j) {
                return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? obj[key] : {}) : [])
              }, result)
            }
            return result
    }
}
