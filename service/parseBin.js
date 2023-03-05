const parseBin = (binArr) => {
    const array = binArr.split(" ");

    let res = new Buffer.alloc(array.length);

    for (let i = 0; i < array.length; i++) {
        res[i] = parseInt(array[i], 2);
    }

    return res;
}

module.exports = parseBin;