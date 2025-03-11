import { Kafka, Partitioners } from 'kafkajs';
import { json } from 'stream/consumers';
import { measureMemory } from 'vm';

// Kafka connection
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Kafka broker address
});

const message =  [
  {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Anytown, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Sarah Smith",
    age: 28,
    email: "sarah.smith@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave, Springfield, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Michael Johnson",
    age: 35,
    email: "michael.j@example.com",
    phone: "+1234567892",
    address: "789 Pine Rd, Rivertown, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Emily Brown",
    age: 25,
    email: "emily.brown@example.com",
    phone: "+1234567893",
    address: "321 Maple Dr, Lakeside, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "David Wilson",
    age: 42,
    email: "david.wilson@example.com",
    phone: "+1234567894",
    address: "654 Cedar Ln, Hillside, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Lisa Anderson",
    age: 31,
    email: "lisa.a@example.com",
    phone: "+1234567895",
    address: "987 Birch St, Mountain View, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Robert Taylor",
    age: 38,
    email: "rob.taylor@example.com",
    phone: "+1234567896",
    address: "147 Elm Court, Seaside, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Jennifer Martinez",
    age: 29,
    email: "jen.martinez@example.com",
    phone: "+1234567897",
    address: "258 Willow Way, Valley City, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "William Davis",
    age: 45,
    email: "will.davis@example.com",
    phone: "+1234567898",
    address: "369 Aspen Ave, Forest Hills, USA",
    createdAt: new Date().toISOString()
  },
  {
    name: "Maria Garcia",
    age: 33,
    email: "maria.g@example.com",
    phone: "+1234567899",
    address: "741 Redwood Blvd, Sunset City, USA",
    createdAt: new Date().toISOString()
  }
];

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  console.log("Producer connected");

  // Send a message
  await producer.send({
    topic: "test-topic",
    messages: [{ key: "key1", value: JSON.stringify(message)
     }],
  });

  console.log("Message sent");
  await producer.disconnect();
};

run().catch(console.error);
