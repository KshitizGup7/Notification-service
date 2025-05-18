const amqp = require('amqplib');

const QUEUE = 'notifications';

async function sendToQueue(notification) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)), {
        persistent: true
    });
    setTimeout(() => {
        connection.close();
    }, 500);
}

async function consumeQueue(callback) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    channel.consume(QUEUE, async (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            try {
                await callback(data);
                channel.ack(msg);
            } catch (error) {
                console.error('Failed to process message:', error);
                // Optionally requeue
                channel.nack(msg, false, false);
            }
        }
    });
}

module.exports = { sendToQueue, consumeQueue };
