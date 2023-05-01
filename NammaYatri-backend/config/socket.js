const amqp = require('amqplib');
var server_message = [];
async function consume() {
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
            server_message.push(message.content.toString())
            // console.log(`Received message: ${message.content.toString()}`);

            // Acknowledge the message
            channel.ack(message);
        });
    } catch (error) {
        console.error(error);
    }
}

consume();

module.exports.chatSockets = function (socketServer) {
    console.log(server_message.length);
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "*"
        }
    });
    io.sockets.on('connection', function (socket) {
        console.log("new client added");

        socket.on('disconnect', function () {
            console.log("client got disconnected");
        })
        setTimeout(() => {
            console.log(server_message[0]);
            socket.emit('newmsg', { message: server_message[0] });
        }, 1000);

        socket.on('ackmsg', function (e) {
            console.log(e);
        })
    })




}