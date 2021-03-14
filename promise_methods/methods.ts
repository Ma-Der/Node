export function createPromise<T>(input: T): Promise<T> {
    return new Promise((resolve, reject) => {  
        setTimeout(resolve, 1000, input);
    });
};

//promise.all

export function promiseAll<T>(arrayOfPromises: T[]): Promise<T[]> {
    
    let resultArr: T[] = [];

    return new Promise((resolve, reject) => {
        arrayOfPromises.reduce((previousPromise, input) => {
            return previousPromise.then(() => {
                return createPromise(input)
                    .then((element) => {
                        resultArr.push(element);
                        if (arrayOfPromises.length !== resultArr.length) return;
                        resolve(resultArr);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }, Promise.resolve());
    });
}

//promise.race

export function promiseRace<T> (arrayOfPromises: T[]): Promise<T> {
    if (arrayOfPromises.length === 0) return new Promise((resolve, reject) => {});
    let resultArr: T[] = [];   
    
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise) => {
            Promise.resolve(promise)
                .then((element) => {
                    resultArr.push(element);
                    resolve(resultArr[0]);
                })
                .catch((error) => {
                    reject(error);
                });
        });   
    });
}

// promise.Last 

export function promiseLast<T> (arrayOfPromises: T[]): Promise<T> {
    if (arrayOfPromises.length === 0) return new Promise((resolve, reject) => {});
    let resultArr: T[] = [];
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach(promise => {
            Promise.resolve(promise)
                .then(promis => {
                    resultArr.push(promis)
                })
                .then(() => {
                    if(arrayOfPromises.length === resultArr.length) resolve(resultArr[resultArr.length-1]);
                })
                .catch((err) => {
                    console.log("Oops: "+err);
                    reject(err)
                })
        }) 
    })
    };

//promise Ignore Errors

export function promiseIgnoreErrors<T>(arrayOfPromises: T[]): Promise<T[]> {
    let promises: Promise<T>[] = [];
    let result: T[] = [];
    return new Promise((resolve, reject) => {
        for (const element of arrayOfPromises) {
            promises.push(Promise.resolve(element));
        }
        for (const promise of promises) {
            promise
                .then((res) => {
                    result.push(res);
                })
                .then(() => {
                    const finalResult = result.filter(element => {if(!(element instanceof Error)) return element });
                    resolve(finalResult)
                })
                .catch((err) => {
                    if (err) return;
                });
        }
    });
}    