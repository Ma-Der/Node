import { createPromise } from './methods';

//promise.all

export async function promiseAllAsyncAwait<T> (arrayOfPromises: T[]): Promise<T[]> {
    let result: T[] = [];
     
    for(const promise of arrayOfPromises) {
        const promiseResult = await Promise.resolve(promise);
        try{
            result.push(promiseResult);
        }
        catch(error){
            console.log('An error occured: '+error.message);
        } 
    }
    if (arrayOfPromises.length !== result.length) return new Promise(() => {});
    return result;
}

//promise.last

export function promiseLastAsyncAwait<T>(arrayOfPromises: T[]): Promise<T> {
    if (arrayOfPromises.length === 0) return new Promise((resolve, reject) => {});
    let result: T[] = [];
    return new Promise((resolve, reject) => {
            arrayOfPromises.forEach( async promis => {
                const promiseResult = await Promise.resolve(promis);
                try {
                    result.push(promiseResult);
                    if(arrayOfPromises.length === result.length) resolve(result[result.length-1]);
                }
                catch(error) {
                    reject(error);
                }
            })
    })
}

//promise.ignoreErrors

export async function promiseIgnoreErrorsAsyncAwait<T>(arrayOfPromises: T[]): Promise<T[] | undefined> {
    let result: T[] | undefined = [];
        for (const promise of arrayOfPromises) {
            let promiseResult = await Promise.resolve(promise);
            try {
                result.push(promiseResult);
            }
            catch {}
        }
        return result;
}