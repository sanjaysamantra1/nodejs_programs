import { createClient } from 'redis';

export const redisClient = await createClient()
  .on('error', err => console.log('error connecting redis'))
  .connect();

export async function getFromCache(key) {
  const cachedData = await redisClient.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
}

export async function setInCache(key, value, expiryTime = 300) {
  await redisClient.set(key, JSON.stringify(value), { EX: expiryTime });
}