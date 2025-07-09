import { Kafka, logLevel, Partitioners } from 'kafkajs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID!,
  brokers: process.env.KAFKA_BROKERS!.split(','),
  logLevel: logLevel.INFO,
});

export const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
export const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! });

export async function initKafka() {
  const inputTopic  = process.env.KAFKA_INPUT_TOPIC!;
  const outputTopic = process.env.KAFKA_OUTPUT_TOPIC!;

  await Promise.all([producer.connect(), consumer.connect()]);

  await consumer.subscribe({ topic: inputTopic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const key   = message.key?.toString()   || null;
        const value = message.value?.toString() || '';
        console.log(`← ${topic}[${partition}@${message.offset}] key=${key} value=${value}`);

        
        const processed = `${value}`;

        await producer.send({
          topic: outputTopic,
          messages: [{ key, value: processed }],
        });
        console.log(`→ ${outputTopic} key=${key} value=${processed}`);
      } catch (err) {
        console.error( err);
      }
    },
  });

  console.log('Kafka producer and consumer are both connected');
}
