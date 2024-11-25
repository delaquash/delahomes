import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
    if(process.env.REDIS_URI) {
        console.log("Redis Connected...")
        return process.env.REDIS_URI;
    }

    throw new Error ("Redis Connection Failed")
}

export const redis = new Redis(redisClient(), {
    maxRetriesPerRequest: null, 
    retryStrategy: (times) => {
        console.log(`[ioredis] Retry attempt: ${times}`);
        if (times >= 10) {
          // Stop retrying after 10 attempts
          console.error("Too many retries, aborting connection.");
          return null;
        }
        return Math.min(times * 100, 2000); // Retry with exponential backoff
      },
})