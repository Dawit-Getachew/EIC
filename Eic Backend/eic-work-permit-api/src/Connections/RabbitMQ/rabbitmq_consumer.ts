import amqplib from "amqplib";
import _ from "lodash";

import { SingletonRabbitMQConnection } from "./singleton_rabbitmq_connection";



export class RabbitMQConsumer {
    private _channel!: amqplib.Channel;
    private _queueName!: string;

    /**
     * 1. initialization.
     * 2. log message to show that queue is up and running.
     * 3. consume data from specified queue .
     * 
     * 
     * @param queueName string
     */
    public static async startConsumerOnly(queueName: string, callback: Function) {
        const rabbitMQ: RabbitMQConsumer = new this();
        await rabbitMQ.initialization(queueName);
        rabbitMQ.log();
        await rabbitMQ.consumeOnly(callback);
    }

    /**
     * 1. initialization.
     * 2. log message to show that queue is up and running.
     * 3. consume data from specified queue .
     * 
     * 
     * @param queueName string
     */
    public static async startConsumerAndSendBackResponse(queueName: string, callback: Function) {
        const rabbitMQ: RabbitMQConsumer = new this();
        await rabbitMQ.initialization(queueName);
        rabbitMQ.log();
        await rabbitMQ.consumeAndSendResponse(callback);

    }

    /**
     * 1. initialize queueName.
     * 2. get channel from @BaseRabbitMQ class.
     * 3. create queue with initialized queueName.
     * 4.  make the channel receive one request at a time.
     * 
     * 
     * @param queueName string.
     */
    private async initialization(queueName: string) {
        this._queueName = queueName;
        await this.getChannel();
        await this.createQueue();
        await this.assignRequestReceivedAtATime();
    }

    // get channel from @BaseRabbitMQ class.
    private async getChannel() {
        this._channel = await SingletonRabbitMQConnection.getChannel() as any;
    }

    // create queue
    private async createQueue() {
        try {
            return await this._channel.assertQueue(this._queueName, { durable: true, });
        } catch (error) {
            console.log('error: Error occured during naming channel on rabbitmq.', error);
            throw new Error("Rabbitmq: channel naming error.");
        }
    }

    // make the channel receive one request at a time.
    private async assignRequestReceivedAtATime() {
        await this._channel!.prefetch(1);
    }

    // console
    private log() {
        console.log(" [*.*] Waiting for messages in %s coming to " + this._queueName + " queue.");
    }

    /**
     * 1. start consuming 
     * 2. when request is published start processing.
     * 
     * 
     * @param callback Function
     */
    private async consumeOnly(callback: Function) {
        await this._channel.consume(this._queueName, async (message: any) => {
            await this.consumerProcessor(message, callback, false);
        }, { noAck: false });
    }

    /**
    * 1. consume data
     * 2. log the received data.
     * 3. and execute call back 
     * 4. send acknowledgment.
     * 
     * 
     * @param message any
     * @param callback Function
     */
    private async consumerProcessor(message: any, callback: Function, sendResponse: boolean = false) {
        let data = this.parseIncomingData(message);
        console.log(" [x] received data: ", data);
        if (sendResponse) {
            const result: any = await this.executeCallbackAndReturnResult(callback, data);
            await this.sendResponseBack(message, this.toJson(result));
        } else {
            await this.executeCallback(callback, data);
        }

        this.sendAcknowledgement(message);
    }

    /**
     * 1. start consuming 
     * 2. when reques is published start processing.
     * 
     * 
     * @param callback Function
     */
    private async consumeAndSendResponse(callback: Function) {
        await this._channel.consume(this._queueName, async (message: any) => {
            await this.consumerProcessor(message, callback, true);
        }, { noAck: false });
    }

    // execute callback which is the real logic to execute for particular request.
    private async executeCallback(callback: Function, data: any) {
        await callback(data);
    }

    // execute callback which is the real logic to execute for particular request.
    private executeCallbackAndReturnResult(callback: Function, data: any): any {
        return callback(data);
    }

    // send back response to particular request.
    private sendResponseBack(message: any, data: any) {
        this._channel!.sendToQueue(
            message.properties.replyTo,
            Buffer.from(this.toJson(data)),
            {
                correlationId: message.properties.correlationId
            }
        );
    }

    // send acknowledgment.
    private sendAcknowledgement(message: any) {
        this._channel!.ack(message);
    }

    // convert incoming message to native javascript object
    private parseIncomingData(message: any) {
        return !_.isEmpty(message.content) ? JSON.parse(message.content) : [];
    }

    // convert data to json format
    private toJson(data: { [key: string]: any }) {
        return !_.isEmpty(data) ? JSON.stringify(data) : [];
    }
}