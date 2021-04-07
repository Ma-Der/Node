
const promises = [Promise.resolve('strange'), Promise.reject(2), Promise.resolve(3), Promise.resolve(4), Promise.reject(5), Promise.resolve(6), new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'lucky');
} )]


 const recursivePromise = async <T> (arrayOfPromises: Promise<T>[]): Promise<T[]> => {
    if(arrayOfPromises.length < 7) throw new Error("Array should have at least 7 promises.");

    let promArray: T[] = [];
        for(const prom of arrayOfPromises) {
            try {
                const result = await prom;
                promArray.push(result);
            }
            catch(err) {
                promArray.push(err);
                return promArray;
            }
        }
    return promArray;
}


recursivePromise(promises)
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))
