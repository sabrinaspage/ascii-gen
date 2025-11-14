function startLoader() {
    const frames = ['~^~^~^~', '^~^~^~^'];
    let i = 0;

    return setInterval(() => {
        process.stdout.write(`\r${frames[i % frames.length]}`.repeat(i));
        i++;
    }, 200); // change every 200ms
}

function stopLoader(interval) {
    clearInterval(interval);
    process.stdout.write('\r\x1b[K'); // clears the line
}

module.exports = { startLoader, stopLoader };