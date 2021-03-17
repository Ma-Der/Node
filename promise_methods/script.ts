import { promiseAll, promiseRace, promiseLast, promiseIgnoreErrors} from './methods';
import { promiseAllAsyncAwait, promiseLastAsyncAwait, promiseIgnoreErrorsAsyncAwait} from './methodsAsyncAwait';

const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 84);
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1500, 85);
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 86);
})

const prom1 = new  Promise((resolve, reject) => {
    resolve(8);
})

const promi = [promise1, 4, prom1, promise2, promise3, new Error('Some error')];


promiseAllAsyncAwait(promi)
    .then(res => console.log('promiseAllAA: '+res))
    .catch(err => console.log(err))

promiseLastAsyncAwait(promi)
    .then(res => console.log('promiseLastAA: '+res))

promiseIgnoreErrorsAsyncAwait(promi)
    .then(res => console.log('promiseIgnoreErrorsAA: '+res))
    .catch(err => {})

    const timeProm = new Promise(resolve => setTimeout(resolve, 1000, 45))
    const prom = [timeProm, Promise.resolve(34), 7, new Error('Ooops'), timeProm, "rtre"];
 
    promiseRace(prom)
     .then(res => console.log('race: '+res))
 
    promiseLast(prom)
     .then((res) => console.log('last: '+res))
     .catch(err => console.log(err))
 
 
 
 const promises = [ 2, 'srt', prom1, Promise.reject(5), 34, true]
 promiseIgnoreErrors(promises)
     .then(res => console.log('promiseIgnore: '+res))
     .catch(err => console.log(err))
 
 