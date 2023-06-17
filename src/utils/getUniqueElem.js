function getUniqueElem(arr) {
    const uniqueArray = arr.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
    return uniqueArray
}

export default getUniqueElem