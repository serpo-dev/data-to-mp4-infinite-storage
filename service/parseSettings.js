const fs = require('fs');

const parseSettings = () => {
    const file = fs.readFileSync("./settings.txt", { encoding: 'utf8' });

    const params = file.split("\r").join("").split('\n');
    const settings = {};

    for (let i = 0; i < params.length; i++) {
        if (!params[i]) {
            continue;
        }
        const param = params[i].split("=");
        if (param[0] === "width" || param[0] === "height" || param[0] === "binSize") {
            settings[param[0]] = Number(param[1]);
        } else settings[param[0]] = param[1];
    }

    return settings;
}

module.exports = parseSettings;