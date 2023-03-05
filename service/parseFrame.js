const fs = require('fs');
const Jimp = require('jimp');

const parseFrame = async ({ width, height, binSize }, frame_id) => {
    const binArr = await Jimp.read(`./cache/${frame_id}.jpg`).then((image) => {
        const length = Math.floor(width / binSize) * Math.floor(height / binSize);
        let binArr = new Array(length);
        let x = 0;
        let y = 0;
        for (let i = 0; i < length; i++) {

            if (x >= width) {
                x = 0;
                y += binSize;
            }

            const centerX = Math.floor(x + (binSize / 2));
            const centerY = Math.floor(y + (binSize / 2));

            const hex = image.getPixelColor(centerX, centerY);
            const rgb = Jimp.intToRGBA(hex);

            if (rgb.r > rgb.g && rgb.r > rgb.b) {
                binArr[i] = "1";
            } else if (rgb.b > rgb.r && rgb.b > rgb.g) {
                binArr[i] = "0";
            } else if (rgb.g > rgb.r && rgb.g > rgb.b) {
                if (binArr[i - 1] && binArr[i - 1] === " ") {
                    binArr[i - 1] = undefined;
                    break;
                }
                binArr[i] = " ";
            } else binArr[i] = "?"

            x += binSize;
        }
        return binArr.join("");
    });

    return binArr;
}

module.exports = parseFrame;