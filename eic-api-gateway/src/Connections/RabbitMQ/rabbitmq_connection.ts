import amqplib from "amqplib/callback_api";
import Bluebird from 'bluebird';
import { rabbitMQ } from "../../Config/rabbitMQ.config";

export class RabbitMQConnection {

    private _connection!: amqplib.Connection;
    private _channel!: amqplib.Channel;

    private constructor() { }


    /**
     * 1. initialize with this class object and then create connection and channel with RabbitMQ.
     * 2. return the channel created.
     * 
     * 
     * @returns Promise<BaseRabbitMQ>
     */
    public static async getInstance(): Promise<RabbitMQConnection> {
        const instance: RabbitMQConnection = new this();
        await instance.initialization();
        return instance;
    }

    /**
     * 1. create connection.
     * 2. create channel.
     */
    private async initialization() {
        await this.createConnection();
        await this.createChannel();
        console.log("channel created separately")
    }

    // create connection
    private async createConnection(): Promise<Bluebird<amqplib.Connection>> {
        return new Promise((resolver, reject) => {
            amqplib.connect(
                rabbitMQ.DEPLOYED ? rabbitMQ.rabbitMQURL : `amqp://${rabbitMQ.rabbitMQHost}`
                , (error, connection) => {
                    this._connection = connection
                    resolver(connection);
                })
        })
        //     try {
        //         return await amqplib.connect(`amqp://${rabbitMQ.rabbitMQHost}`);
        //     } catch (error) {
        //         console.log("error: Error occurred during rabbitmq connecting", error);
        //         throw new Error("Rabbitmq: connection error.");
        //     }
    }

    //create channel.
    private async createChannel(): Promise<amqplib.Channel> {
        return new Promise((resolver, reject) => {
            this._connection.createChannel((error, channel) => {
                this._channel = channel;
                resolver(channel);
            });
        })
        // try {
        //     return await this._connection.createChannel();

        // } catch (error) {
        //     console.log('error: Error occured during creating channel on rabbitmq.', error);
        //     throw new Error("Rabbitmq: channel creation error.");
        // }
    }

    // return channel
    public getChannel(): amqplib.Channel {
        return this._channel;
    }

    // close channel and connection
    public async closeConnection() {
        return new Promise((resolver, reject) => {
            this._channel.close((error) => {
                this._connection.close();
                console.log("connection closed")
                resolver("success")
            });
        })
    }
}