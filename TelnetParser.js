export class TelnetParser {
    constructor() {
        this.state = TELNET_DATA;
        this.byte = null;
    }

    processByte(byte) {
        switch (byte) {
            case 0x0A:
                this.state = TELNET_DATA;
            case 0x0D:
                this.state = TELNET_NEWLINE;
            case 255:
                this.state = TELNET_IAC;
            case byte >= 0x20 && byte <= 0x7E:
                this.state = TELNET_DATA;
                this.byte = String.fromCharCode(byte);
        }
    }
}