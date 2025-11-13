const net = require('node:net');

const server = net.createServer((socket) => {
    console.log("client connected");

    socket.setEncoding('utf8');

    // sequential callbacks in the listeners array
    socket.on('data', (data) => {
        console.log(`received from client: ${data}`);

        socket.write(`Echo: ${data}`);
    })

    socket.on('end', () => {
        console.log(`Client disconnected`);
        socket.end();
    })

    socket.on('error', (error) => {
        console.log('Socket error:', error);
    })

    socket.write('Welcome to the TCP server!\r\n')
});

server.listen(23, () => {
    console.log('TCP server running on port 23');
})