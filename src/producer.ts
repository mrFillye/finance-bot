import amqp from "amqplib";
//to main
export const connnectRabbit = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    return { channel, connection };
  } catch (error) {
    console.log("error", error);
  }
};

export const produce = async <T extends Object>(
  queue: string,
  channel: amqp.Channel,
  connection: amqp.Connection,
  message: T
) => {
  try {
    const test = await channel.assertQueue(queue, { durable: false });
    console.log("test", test);

    console.log("queue", queue);

    const sentMessage = await channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message))
    );

    console.log(" [x] Sent '%s'", message);

    // await channel.close();
    // await connection.close;

    return sentMessage;
  } catch (error) {
    console.warn(error);
  }
};
