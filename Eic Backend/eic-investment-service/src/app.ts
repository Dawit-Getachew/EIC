import { Database } from "./Connections/database.connection";
import { RabbitMQConsumer } from "./Connections/RabbitMQ/rabbitmq_consumer";
import {
  BUSINESS_PROFILE_QUEUES, CATEGORY_QUEUES, MANAGER_QUEUES, PRODUCT_QUEUES, PROJECT_QUEUES,
  WORK_PERMIT_QUEUES, MESSAGE_QUEUES, INVESTMENT_PERMIT_QUEUES, INVESTMENT_PERMIT_RENEWAL_QUEUES,
  INVESTMENT_PERMIT_EXPANSION_QUEUES, INVESTMENT_PERMIT_CANCELLATION_QUEUES, NOTIFICATION_QUEUES,
  INVESTMENT_PERMIT_AMMENDMENT_QUEUES
} from "./Common/queue_names"
import {
  BusinessProfileController, CategoryController, ManagerController, ProductController, ProjectController,
  WorkPermitController, MessageController, InvestmentPermitController, InvestmentPermitRenewalController,
  InvestmentPermitExpansionController, InvestmentPermitCancellationController, NotificationController,
  InvestmentPermitAmmendmentController
} from "./Services/"

const database = new Database()
database.connect();

(async () => {
  await RabbitMQConsumer.startConsumerAndSendBackResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, InvestmentPermitController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, InvestmentPermitRenewalController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, InvestmentPermitExpansionController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, InvestmentPermitCancellationController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, NotificationController);
  await RabbitMQConsumer.startConsumerAndSendBackResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, InvestmentPermitAmmendmentController);
})()