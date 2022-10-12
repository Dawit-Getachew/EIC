import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { ProductActions } from "../../Schema/Product/action";
import { PRODUCT_QUEUES } from "../../../Common/queue_names"
import { ProductRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, postMany, post, removeOne, removeMany, removeAll }
} = ProductActions

const ProductResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.GET_ALL_PRODUCTS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.GET_ONE_PRODUCT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.GET_MANY_PRODUCTS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.POST_PRODUCT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [postMany](_: any, data: { input: { products: any[] }}, context: any) {
      let createdItems: any[] = []
      for (let i = 0; i < data.input.products.length; ++i) {
        const foundItem = await ProductResolver.Mutation[post]({}, {
          input: data.input.products[i]
        }, {})
        if (foundItem._id) {
          createdItems.push(foundItem)
        }
      }
      return createdItems
    },
    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.EDIT_PRODUCT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.REMOVE_MANY_PRODUCTS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.REMOVE_PRODUCT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PRODUCT_QUEUES.QUEUE_FOR_PRODUCT, {
        route: ProductRoutes.REMOVE_ALL_PRODUCTS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default ProductResolver