const fs = require('fs');
const createBin = require("./createBin");
const createVideo = require("./createVideo");
const writeVideoConsole = require("./console/writeVideoConsole");
const parseBin = require("./parseBin");

const writeVideoStream = async (settings) => {
    const readStream = fs.createReadStream(settings.INPUT, { encoding: "binary" });

    const countTotal = await (async () => {
        const totalReadStream = fs.createReadStream(settings.INPUT, { encoding: "binary" });
        const promiseTotal = new Promise((resolve) => {
            let totalLength = 0;
            let chunksAmount = 0;
            totalReadStream.on("data", (chunk) => {
                chunksAmount++;
                totalLength += chunk.length
            })
            totalReadStream.on("end", () => {
                resolve({ totalLength, chunksAmount });
            })
        })

        return promiseTotal;
    })();
    let current = "";
    
    let datePrev = Date.now();

    let allChunks = ''

    let binArr = "";

    let binBlocks = [];

    let counter = 0;
    let lastCounter = 0;

    const amount = Math.floor(settings.width / settings.binSize) * Math.floor(settings.height / settings.binSize);

    const promise = new Promise((resolve) => {
        let curChunkNumber = 0;

        readStream.on("data", async (chunk) => {
            curChunkNumber++;
            current += chunk;
            writeVideoConsole(current.length, countTotal.totalLength, curChunkNumber, countTotal.chunksAmount, datePrev);
            datePrev = Date.now();

            allChunks += chunk
            let bin = createBin(chunk);

            if (binArr.length !== 0) {
                binArr += " ";
            }

            while ((binArr.length && (binArr.length + " ".length + bin.length >= amount)) || (!binArr.length && bin.length >= amount)) {
                const diff = amount - binArr.length;
                const lastPart = bin.slice(0, diff);
                binArr += lastPart;

                binBlocks.push(binArr);
                // createFrame(settings, binArr, counter);

                counter++;
                binArr = "";

                bin = bin.slice(diff);
            }

            if (binArr.length !== 0) {
                binArr += ` ${bin}`;
            } else {
                binArr = bin;
            }

            lastCounter = counter;
        }).on("end", () => {
            binBlocks.push(binArr);
            // createFrame(settings, binArr, counter);
            createVideo(settings, binBlocks)

            console.log(allChunks.length, "WRITE")
            return resolve("OK");
        })
    });

    return promise;
}

module.exports = writeVideoStream; 