const { createCanvas } = require("canvas");
const fs = require("fs");

const createFrame = ({ width, height, binSize }, binArr) => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, width, height);

    let x = 0;
    let y = 0;

    for (let i = 0; i < binArr.length; i++) {
        if (x >= width) {
            x = 0;
            y += binSize;
        }
        if (binArr[i] === "1") {
            ctx.fillStyle = "red";
            ctx.fillRect(x, y, binSize, binSize);
        }
        if (binArr[i] === "0") {
            ctx.fillStyle = "blue";
            ctx.fillRect(x, y, binSize, binSize);
        }
        x += binSize;
    }

    return ctx;
    // const buffer = canvas.toBuffer("image/jpeg", { quality: 0.8, progressive: true, chromaSubsampling: true });
    // fs.writeFileSync(`./cache/${number}.jpg`, buffer);
}

module.exports = createFrame;