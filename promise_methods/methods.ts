function createPromise<T>(input: T): Promise<T> {
    return new Promise((resolve, reject) => {  
        setTimeout(resolve, 1000, input);
    });
};

//promise.all

function promiseAll<T>(arrayOfPromises: T[]): Promise<T[]> {
    
    let resultArr: T[] = [];

    return new Promise((resolve, reject) => {
        arrayOfPromises.reduce((previousPromise, input) => {
            return previousPromise.then(() => {
                return createPromise(input)
                    .then((element) => {
                        if (element instanceof Error) throw element;
                        resultArr.push(element);
                        if (arrayOfPromises.length !== resultArr.length) return;
                        resolve(resultArr);
                    })
                    .catch((error) => {
                        if (error) throw error;
                        reject(error);
                    });
            });
        }, Promise.resolve());
    });
}

//promise.race as promiseRace

function promiseRace<T> (arrayOfPromises: T[]): Promise<T> {

    let resultArr: T[] = [];   
    
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise) => {
            Promise.resolve(promise)
                .then((element) => {
                    if (element instanceof Error) throw element;
                    if (arrayOfPromises.length === 0) return new Promise((resolve, reject) => {});
                    resultArr.push(element);
                    resolve(resultArr[0]);
                })
                .catch((error) => {
                    if (error) throw error;
                    reject(error);
                });
        });   
    });
}

//promise.all with async/await

async function promiseAllAsyncAwait<T> (arrayOfPromises: T[]): Promise<T[]> {
    let result: T[] = [];
    for(const promise of arrayOfPromises) {
        await createPromise(promise)
                .then((element) => {
                    if (element instanceof Error) throw element;
                        result.push(element);
                    if (arrayOfPromises.length !== result.length) return;
                })
                .catch((error) => {
                    if (error) throw error;
                })
    }
    return result;
}

//promise.race with async/await

function promiseRaceAsyncAwait<T> (arrayOfPromises: T[]): Promise<T> {
    let result: T[] = [];

    return new Promise((resolve, reject) => {
         arrayOfPromises.forEach(async (promise) => {
             await createPromise(promise)
                .then((element) => {
                    if (element instanceof Error) throw element;
                    if (arrayOfPromises.length === 0) return new Promise((resolve, reject) => {});
                    result.push(element);
                    resolve(result[0]);
                })
                .catch((error) => {
                    if (error) throw error;
                    reject(error);
                });
        });

})
}

// promise.Last 

        // zwraca ostatni element, ale tylko jeśli wszystkie wykonają się bez opóźnienia 

function promiseLast<T> (arrayOfPromises: T[]): Promise<T> {
    let resultArr: T[] = [];
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach(promise => {
            Promise.resolve(promise)
                .then(promis => {
                    if(promis instanceof Error) throw promis;
                    resultArr.push(promis)
                })
                .then(() => resolve(resultArr[resultArr.length-1]))
                .catch((err) => {
                    console.log("Oops: "+err);
                    reject(err)
                })
        }) 
    })
    };

//promise Ignore Errors

function promiseIgnoreErrors<T>(arrayOfPromises: T[]): Promise<T[]> {
    let promises: Promise<T>[] = [];
    let result: T[] = [];
    return new Promise((resolve, reject) => {
        for (const element of arrayOfPromises) {
            promises.push(Promise.resolve(element));
        }
        for (const promise of promises) {
            promise
                .then((res) => {
                    if (res instanceof Error) return;
                    result.push(res);
                })
                .then(() => resolve(result))
                .catch((err) => {
                    if (err) return;
                });
        }

    });
   
}
    const timeProm = new Promise(resolve => setTimeout(resolve, 1000, 45))
   const prom = [ Promise.resolve(34), 7,  timeProm, "rtre"];


   promiseLast(prom)
    .then((res) => console.log(res))
    .catch(err => console.log(err))

   const prom1 = new  Promise((resolve, reject) => {
    reject(8);
})
   const promises = [ 2, 'srt', prom1, 34, true]
promiseIgnoreErrors(promises)
    .then(res => console.log(res))
    .catch(err => console.log(err))
