//promise.all

function createPromise<T>(input: T): Promise<T> {
    return new Promise((resolve) => {  
        resolve(input);
    });
};

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

const prom1 = new  Promise((resolve, reject) => {
    resolve(8);
})

const promises = [ 2, 'srt', prom1, 34, true]

const result = promiseAll(promises);
console.log(result.then((resolved) => console.log(resolved)))