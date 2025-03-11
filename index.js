import { startConsumer } from './kafka/consumer.js';
// or import { startConsumer } from './kafka/postgresConsumer.js';

startConsumer().catch(console.error); 