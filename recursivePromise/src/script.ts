
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4), Promise.resolve(5), Promise.resolve(6), Promise.resolve(7)]


 const recursivePromise = async (arrayOfPromises: Promise<unknown>[], index: number = 0, result: unknown[] = []): Promise<unknown[]> => {
    
    if(arrayOfPromises.length == result.length) return result;
            try { 
                const promRes = await arrayOfPromises[index];
                result[index] = promRes;
                index++;
                recursivePromise(arrayOfPromises, index, result);
            }
            catch(err) {
                result[index] = err;
                return result;
            }
    return result;
}


recursivePromise(promises)
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))