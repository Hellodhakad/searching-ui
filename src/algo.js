export const linerSearch = (arr, elem) => {
    let result = {
        index: '-1',
        value: elem
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == elem) {
            result = {
                index: i,
                value: elem
            }
        }
    }

    return result
}

export const binarySearch = (arr, elem) => {
    console.log('eleleel', arr, elem)

    
}