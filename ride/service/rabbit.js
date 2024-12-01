import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBIT_URL;
let connection, channel;


const connect = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        console.log(connection);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.log('Error connecting rabbit', " ", error);
    }

}


connect();

const subscribeToQueue = async (queueName, callback) => {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}

const publishToQueue = async (queueName, data) => {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
}

export { subscribeToQueue, publishToQueue, connect };