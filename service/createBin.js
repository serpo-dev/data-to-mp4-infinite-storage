const getLength = require("./getLength");

const createBin = (chunk) => {
    const buffer = Buffer.from(chunk, "binary");
    
    let res = "";
    for (let i = 0; i < getLength(buffer); i++) {
        res += buffer[i].toString(2);
        if (i < getLength(buffer) - 1) {
            res += " ";
        }
    }
    return res;
}

module.exports = createBin;