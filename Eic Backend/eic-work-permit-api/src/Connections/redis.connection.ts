import Redis from "ioredis";
// import RedisConfig from '../Config/redis.config'


// initialize redis connector class.
const redisClient = new Redis({
  port: 6379,
  host: "127.0.0.1",
  password: "redispw",
  // username: "default",
  // family: 6,
  lazyConnect: true,
});

// create connection with redis.
redisClient.connect()
  .then(() => console.log('success: redis connected successfully.'))
  .catch((error: any) => console.log('error: redis connection failed. \n', error));



export default redisClient