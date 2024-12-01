import amqp from 'amqplib';
import express from 'express';
const app = express();
const port = 3006;


const amqpUrl = ' amqps://akioclss:bvK-OIZEQo7Wy3WaxSv2bpfqleuYkPZN@seal.lmq.cloudamqp.com/akioclss';
let connection;
let channel;
async function connectToRabbitMQ() {
    try {
        connection = await amqp.connect(amqpUrl);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

const subscribeToQueue = async (queueName, callback) => {
    if (!channel) await connectToRabbitMQ();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}

const publishToQueue = async (queueName, data) => {
    if (!channel) await connectToRabbitMQ();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
}

export { subscribeToQueue, publishToQueue, connectToRabbitMQ };



