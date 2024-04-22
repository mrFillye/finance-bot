import amqp from "amqplib";

export const consume = async (queue: string, channel: amqp.Channel) => {
  try {
    await channel.assertQueue(queue);

    return channel.consume(queue, (data) => {
      if (!data) return;

      console.log(`${Buffer.from(data.content)}`);
      channel.ack(data);

      return data;
    });
  } catch (error) {
    console.log(error);
  }
};
