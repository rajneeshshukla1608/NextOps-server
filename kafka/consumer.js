import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "opsifyi",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic1", fromBeginning: true });

  console.log("Consumer connected");
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const jsonMessage = JSON.parse(message.value.toString());
      console.log("Received JSON Message:", jsonMessage);
    },
  });
};

run().catch(console.error);
