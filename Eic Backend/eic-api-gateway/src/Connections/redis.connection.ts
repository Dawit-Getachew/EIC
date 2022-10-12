import Redis from "ioredis";
import RedisConfig from '../Config/redis.config'

// initialize redis connector class.
const redisClient = new Redis({
  lazyConnect: true,
  host: RedisConfig.redisHost,
  password: RedisConfig.redisPassword,
  port: Number(RedisConfig.redisPort)
});

// create connection with redis.
redisClient.connect()
  .then(() => console.log('success: redis connected successfully.'))
  .catch((error: any) => console.log('error: redis connection failed. \n', error));



export default redisClient