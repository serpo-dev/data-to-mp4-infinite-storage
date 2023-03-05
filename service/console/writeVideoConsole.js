const writeVideoConsole = (chunkSize, totalSize, curChunkNumber, chunksAmount, datePrev) => {
    const percentage = (() => {
        let res = ((chunkSize / totalSize) * 100);
        if (res !== 100 && res !== 0) {
            res = res.toFixed(2);
        } else {
            res = res.toFixed(0);
        }
        return res;
    })();

    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine();

    const dateDiff = Date.now() - datePrev;
    const remainingChunks = chunksAmount - curChunkNumber;
    const remainigTime = remainingChunks * dateDiff;
    const secondsTime = Math.floor(remainigTime / 1000);
    let totalTime = "0 seconds";
    const hours = Math.floor(secondsTime / 3600);
    const minutes = Math.floor(secondsTime / 60 - hours * 60);
    const seconds = secondsTime - (hours * 3600 + minutes * 60);
    if (hours > 0) {
        totalTime = `${hours} hour${hours === 1 ? "" : "s"} ${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} second${seconds === 1 ? "" : "s"}`
    } else if (minutes > 0) {
        totalTime = `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} second${seconds === 1 ? "" : "s"}`
    } else if (seconds > 0) {
        totalTime = `${seconds} second${seconds === 1 ? "" : "s"}`
    }

    console.log(`Converting to binary.... ${percentage} %. Wait for ${totalTime}`)
}

module.exports = writeVideoConsole;