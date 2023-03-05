const parseSettings = require("./service/parseSettings");
const writeVideoStream = require("./service/writeVideoStream");
const readVideoStream = require("./service/readVideoStream");
const readVideo = require("./service/readVideo");

const settings = parseSettings();

async function main() {
    return new Promise(async (res) => {
        res(await writeVideoStream(settings));
    }).then(async (res) => {
        // res(await readVideoStream(settings));
    }).then(async (res) => {
        // res(await readVideo());
    });
}

main();