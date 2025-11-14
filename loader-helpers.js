const fs = require('fs');
const path = require('path');

const LIGHT_BROWN = '\x1b[38;5;180m';
const RESET = '\x1b[0m';
const STATIC_ASCII_DIR = 'loading-ascii';
const MOVE_CURSOR_HOME = '\x1b[H';
const CLEAR_FROM_CURSOR = '\x1b[J';

const staticDir = path.join(__dirname, STATIC_ASCII_DIR);
const files = fs.readdirSync(staticDir).map(file => {
    return fs.readFileSync(path.join(staticDir, file), 'utf-8');
});

function startLoader() {
    const frames = [...files];
    let i = 0;

    return setInterval(() => {
        process.stdout.write(MOVE_CURSOR_HOME);
        process.stdout.write(CLEAR_FROM_CURSOR);
        process.stdout.write(LIGHT_BROWN + frames[i % frames.length] + RESET);
        i++;
    }, 200);
}

function stopLoader(interval) {
    clearInterval(interval);
    process.stdout.write(MOVE_CURSOR_HOME + CLEAR_FROM_CURSOR);
}

module.exports = { startLoader, stopLoader };