const { gallop } = require('./loading-ascii/horses');

const LIGHT_BROWN = '\x1b[38;5;180m';
const RESET = '\x1b[0m';
const MOVE_CURSOR_HOME = '\x1b[H';
const CLEAR_FROM_CURSOR = '\x1b[J';
const MAX_SCREEN_WIDTH = 40;

function startLoader() {
    let i = 0;

    return setInterval(() => {
        if (i > MAX_SCREEN_WIDTH) {
            i = 0;
        }
        process.stdout.write(MOVE_CURSOR_HOME);
        process.stdout.write(CLEAR_FROM_CURSOR);
        const frame = gallop[i % gallop.length].map(line => ' '.repeat(i) + line).join('\n');
        process.stdout.write(LIGHT_BROWN + frame + RESET);
        i++;
    }, 100);
}

function stopLoader(interval) {
    clearInterval(interval);
    process.stdout.write(MOVE_CURSOR_HOME + CLEAR_FROM_CURSOR);
}

module.exports = { startLoader, stopLoader };