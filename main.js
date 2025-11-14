const net = require('node:net');
const { TELNET_DATA, TELNET_NEWLINE, TELNET_CARRIAGE_RETURN } = require('./protocols');
const TelnetParser = require('./TelnetParser');

class TelnetSession {
    constructor(socket) {
        this.socket = socket;
        this.textBuffer = null; // buffer
        this.telnetParser = new TelnetParser();
        this.string = this.instruction();
    }

    instruction(data) {
        data.forEach((byte) => {
            this.telnetParser.processByte(byte);

            if (this.telnetParser.state === TELNET_DATA) {
                this.textBuffer += this.telnetParser(byte).char();
            }
        })

        this.string = textBuffer;
        this.textBuffer = null;
        return this.string;
    }
}

class App {
    start() {
        const server = net.createServer((socket) => {
            const session = new TelnetSession(socket);

            if (session.string.includes("echo")) {
                this.write(session);
            }
            if (session.string.includes("help")) {
                this.listCommands(session)
            }
            if (session.string.includes("image")) {
                this.asciiArt(session)
            }
            if (session.string.includes("exit")) {
                this.exit(session);
            }
        });

        server.listen(23, () => {
            console.log('TCP server running on port 23');
        })
    }

    listCommands() {
        return ```
                echo: returns message
                help: lists all commands
                image: generates ascii image
                exit: leaves the program
            ```
    }

    write() {
        this.session.write(this.string);
    }

    listCommands() {
        this.socket.write(listCommands());
    }

    asciiArt() {
        // ...
    }

    exit() {
        this.socket.write("the user requested to end session. ending...")
        this.socket.end();
    }
}

const app = new App();
app.start();