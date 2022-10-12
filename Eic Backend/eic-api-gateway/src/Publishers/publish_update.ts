import { pubsub } from "../app"

export const publishUpdate = async (update_type: string, payload: any, subscriptionTag: string) => {
  await pubsub.publish(update_type, {
    [subscriptionTag]: payload
  })
}