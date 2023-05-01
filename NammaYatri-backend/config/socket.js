const amqp = require('amqplib');
var server_message = [];

async function consume(io) {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqps://ioqshnea:oDbp-b63joB8xpiLQ8zbatkW6ewZ9KaM@vulture.rmq.cloudamqp.com/ioqshnea');

        // Create a channel
        const channel = await connection.createChannel();

        // Declare the queue
        await channel.assertQueue('my-queue', {
            durable: true
        });

        console.log('Waiting for messages...');

        // Consume messages from the queue
        channel.consume('my-queue', (message) => {
            const msg = message.content.toString();
            server_message.push(msg);
            console.log(`Received message: ${msg}`);

            // Emit the message to all connected sockets
            io.emit('newmsg', { message: msg });

            // Acknowledge the message
            channel.ack(message);
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.sockets.on('connection', function (socket) {
        console.log("new client added");

        socket.on('disconnect', function () {
            console.log("client got disconnected");
        })

        // Emit the latest message to the connected socket
        if (server_message.length > 0) {
            socket.emit('newmsg', { message: server_message[server_message.length - 1] });
        }
    });

    // Call the consume function and pass the io object
    consume(io);
}
