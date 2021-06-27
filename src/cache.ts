import { redis } from './redis';

const fetch = async <T>(key: string, fetcher: () => T, expires: number) => {
  /**
   * If it's in the cache return from redis
   * else make an API call and set result in redis
   */
  const isItInTheCache = await get<T>(key);
  if (isItInTheCache !== null) return isItInTheCache;
  return set(key, fetcher, expires);
};

const get = async <T>(key: string): Promise<T | null> => {
  const value = await redis.get(key);
  if (value === null) return null;
  return JSON.parse(value);
};

const set = async <T>(key: string, fetcher: () => T, expires: number) => {
  const value = await fetcher();
  // eslint-disable-next-line no-console
  console.log(value);
  await redis.set(key, JSON.stringify(value), 'EX', expires);
  return value;
};

const del = async (key: string) => {
  await redis.del(key);
};

export default {
  fetch,
  get,
  set,
  del,
};
