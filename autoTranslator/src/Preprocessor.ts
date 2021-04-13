interface encodeResult {
  [key: string]: string;
}

interface decodeResult {
  [key: string]: string | {}; // lub any
}

export class Preprocessor {

    encode<T>(obj: T, prefix ='', result: encodeResult = {}) {
        return Object.entries(obj).reduce((res, [key, value]) => {
            const prefixedKey = `${prefix}${key}`;
            if(value instanceof Object){ 
               this.encode(value, `${prefixedKey}.`, res)
            } else {
                result[prefixedKey] = value;
            }                      
            return res;
        }, result);
    }

    decode<T>(obj: T) {
            let result: decodeResult = {}
            for (const key in obj) {
              const keys = key.split('.')
              keys.reduce((res, k, i) => {
                return res[k] || (res[k] = isNaN(Number(keys[i + 1])) ? (keys.length - 1 === i ? obj[key] : {}) : [])
              }, result)
            }
            return result
    }
}