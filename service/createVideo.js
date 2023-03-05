const fs = require('fs');
const HME = require("h264-mp4-encoder");
const createFrame = require("./createFrame");

const createVideo = ({ width, height, binSize }, binArr) => {
    HME.createH264MP4Encoder().then(encoder => {
        encoder.width = width;
        encoder.height = height;
        encoder.frameRate = 30;
        encoder.speed = 10;
        encoder.initialize();

        for (let i = 0; i < binArr.length; i++) {
            const ctx = createFrame({ width, height, binSize }, binArr[i]);
            encoder.addFrameRgba(ctx.getImageData(0, 0, width, height).data);
            console.log("Creating video...   " + (((i + 1) / binArr.length) * 100).toFixed(2) + " %")
        }

        encoder.finalize();
        const mp4 = encoder.FS.readFile(encoder.outputFilename);
        fs.writeFileSync("./video.mp4", Buffer.from(mp4));
        encoder.delete();
    });
}


module.exports = createVideo;
