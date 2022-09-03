import amqplib, { Channel } from "amqplib/callback_api";
import Bluebird from "bluebird";
import { rabbitMQ } from "../../Config/rabbitMQ.config";

export class SingletonRabbitMQConnection {

    private static _instance: SingletonRabbitMQConnection;
    private _connection!: amqplib.Connection;
    private _channel!: amqplib.Channel;

    private constructor() { }


    /**
     * 1. check if @_instance is empty 
     *      if it is empty initialize with this class object and then create connection and channel with RabbitMQ.
     * 2. return the channel created.
     * 
     * 
     * @returns @amqplib.Channel
     */
    public static async getChannel(): Promise<Channel> {
        if (!this._instance) {
            this._instance = new this();
            await this._instance.initialization();
        }
        return this._instance._channel;
    }
    /**
     * 1. create connection.
     * 2. create channel.
     */
    private async initialization() {
        await this.createConnection();
        await this.createChannel();
        console.log("channel created.")
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
    }

    //create channel.
    private async createChannel(): Promise<Channel> {
        return new Promise((resolver, reject) => {
            this._connection.createChannel((error, channel) => {
                this._channel = channel;
                resolver(channel);
            });
        })
    }
}