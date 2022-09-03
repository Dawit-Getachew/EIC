// load rabbitMQ config information from enviroment.
export const rabbitMQ = {
    rabbitMQHost: process.env.RABBITMQ_HOST,
    rabbitMQPort: process.env.RABBITMQ_PORT,
    DEPLOYED: process.env.DEPLOYED === "true",
    rabbitMQURL: String(process.env.RABBITMQ_URL)
};