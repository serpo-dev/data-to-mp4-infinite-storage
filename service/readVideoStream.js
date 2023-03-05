const fs = require('fs');
const parseFrame = require("./parseFrame");
const parseBin = require("./parseBin");

const readVideoStream = async (settings) => {

    let filesLength = fs.readdirSync("./cache").length;

    const writeStream = fs.createWriteStream(settings.OUTPUT);
    let allBin = "";

    for (let i = 0; i < filesLength; i++) {
        let binArr = await parseFrame(settings, i);
        allBin += binArr;
        console.log(`${(i / filesLength * 100).toFixed(2)} %`)
    }

    const bin = parseBin(allBin);
    writeStream.write(bin);

    console.log(bin.length, "READ")
}

module.exports = readVideoStream;