import amqplib from "amqplib/callback_api";
import { IRabbitMQServerMessage } from "../../Common/interface"

import { RabbitMQConnection } from "./rabbitmq_connection";

export class RabbitMQProducer {
    private _baseRabbitMQ!: RabbitMQConnection;
    private _channel!: amqplib.Channel;
    private _queue: amqplib.Replies.AssertQueue | undefined;
    private _queueName!: string;

    /**
     * 1. initialization.
     * 2. log message to show that queue is up and running.
     * 3. consume data from specified queue .
     * 
     */
    public static async sendRequestOnly(queueName: string, message: any) {
        const rabbitMQ: RabbitMQProducer = new this();
        await rabbitMQ.initialization(queueName);
        await rabbitMQ.sendRequestOnly(message);

    }

    /**
     * 1. initialization current class object.
     * 2. run all initializations.
     * 3. send request and receive response.
     * 
     */
    public static async sendRequestAndReceiveResponse(queueName: string, message: IRabbitMQServerMessage) {
        const rabbitMQ: RabbitMQProducer = new this();
        await rabbitMQ.initialization(queueName);
        return await rabbitMQ.sendRequestAndWaitResponse(message);
    }

    /**
     * 1. initialize queueName.
     * 2. get channel from @RabbitMQConnection class.
     * 3. create queue with initialized queueName.
     * 
     */
    private async initialization(queueName: string) {
        this._queueName = queueName;
        await this.getChannel();
        this._queue = await this.createQueue() as any;
    }

    // get channel from @RabbitMQConnection class.
    private async getChannel() {
        this._baseRabbitMQ = await RabbitMQConnection.getInstance();
        this._channel = this._baseRabbitMQ.getChannel();
    }

    // create queue
    private async createQueue() {
        return new Promise((resolver, reject) => {
            this._channel.assertQueue('', { exclusive: true }, (error, q) => {
                resolver(q)
            })
        })
        // .then((queue: any) => {
        //     return queue
        // })
        // .catch((error: any) => {
        //     console.log('error: Error occurred during naming channel on rabbitmq.', error);
        //     throw new Error("Rabbitmq: channel naming error.");
        // });
    }

    /**
     * send request. In this action the response will not be waited. 
     * 
     */
    private async sendRequestOnly(message: any) {
        this._channel.sendToQueue(this._queueName, Buffer.from(this.toJson(message)), {
            // persistent: true,
        });
        this._baseRabbitMQ.closeConnection();
    }

    /**
     * 1. get unique id for correlation id
     * 2. start consuming response attached to  the above correlation id 
     * 3. send request 
     * 
     */
    private async sendRequestAndWaitResponse(message: any): Promise<{ any: any }> {
        let correlationId: string = this.generateUuid();
        return new Promise((resolver, reject) => {
            this.startConsuming(correlationId, resolver);
            this.sendRequest(message, correlationId);
        })
    }

    //send request to rabbitmq.
    private sendRequest(message: any, correlationId: string) {
        this._channel.sendToQueue(this._queueName, Buffer.from(this.toJson(message)), {
            persistent: true,
            correlationId: correlationId,
            replyTo: this._queue!.queue,
        });
    }

    // wait response for a specific request
    private startConsuming(correlationId: string, resolver: (value: any | PromiseLike<{ any: any; }>) => void) {
        this._channel.consume(this._queue!.queue, (msg: any) => {
            if (msg.properties.correlationId == correlationId) {
                this.sendAcknowledgement(msg);
                let data = this.parseIncomingData(msg);
                this._baseRabbitMQ.closeConnection();
                resolver(data)
            }
        }, {
            noAck: true
        });
    }

    // generate unique id
    private generateUuid(): string {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }

    // send acknowledgment.
    private sendAcknowledgement(message: any) {
        this._channel!.ack(message);
    }

    // convert incoming message to native javascript object
    private parseIncomingData(message: any) {
        try {
            return JSON.parse(message.content);
        } catch (error) {
            const data = { error: "error parsing incoming data." };
            console.error(data)
            return JSON.stringify([])
        }
    }

    // convert data to json format
    private toJson(data: { [key: string]: any }): string | any[] {
        return JSON.stringify(data)
    }
}