import { Database } from "./Connections/database.connection";
import { RabbitMQConsumer } from "./Connections/RabbitMQ/rabbitmq_consumer";
import {
  WORK_PERMIT_QUEUES, RENEW_WORK_PERMIT_QUEUES, REPLACE_WORK_PERMIT_QUEUES, CANCEL_WORK_PERMIT_QUEUES,
  DOCUMENT_NUMBER_QUEUES
} from "./Common/queue_names"
import {
  WorkPermitController, RenewWorkPermitController, ReplaceWorkPermitController, CancelWorkPermitController,
  DocumentNumberController
} from "./Services"

const database = new Database()
database.connect();

(async () => {
  await RabbitMQConsumer.startConsumerAndSendBackResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, WorkPermitController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, RenewWorkPermitController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, ReplaceWorkPermitController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, CancelWorkPermitController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, DocumentNumberController);
})()