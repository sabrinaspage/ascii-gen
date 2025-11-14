export class TelnetSession {
    constructor(socket) {
        this.socket = socket;
        this.textBuffer = null; // buffer
        this.telnetParser = new TelnetParser();
        this.string = this.instruction();
    }

    instruction() {
        this.socket.on('data', (data) => {
            data.forEach((byte) => {
                this.telnetParser.processByte(byte);

                if (this.telnetParser.state === TELNET_DATA) {
                    this.textBuffer += this.telnetParser(byte).char();
                }
            })

            this.string = textBuffer;
            this.textBuffer = null;
            return this.string;
        })
    }
}