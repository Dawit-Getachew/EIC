export default {
  redisHost: process.env.DEPLOYED === "true"? process.env.REDIS_HOST : "localhost",
  redisPort: process.env.DEPLOYED === "true"? process.env.REDIS_PORT : 6379,
  redisUserName: process.env.DEPLOYED === "true"? '' : process.env.REDIS_USER_NAME ?? '',
  redisPassword: process.env.DEPLOYED === "true"? process.env.REDIS_PASSWORD : process.env.REDIS_PASSWORD ?? '',
};
