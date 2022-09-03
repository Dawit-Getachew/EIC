import { IMessage, SenderRole } from "src/models/InvestmentModels/message"

export const getUnReadMessagesCount = (new_messages: any[], messages: any[]) => {
  let totalCount = 0
  const new_ids = new_messages.filter(message => message.sender_role === SenderRole.USER).map(item => String(item._id))
  const old_ids = messages.filter(message => message.sender_role === SenderRole.USER).map(item => String(item._id))
  new_ids.forEach(id => {
    const foundIndex = old_ids.findIndex(_id => _id === id)
    if (foundIndex < 0) ++totalCount
  })
  return totalCount
}

export const getUpdatedReadMessages = (new_messages: any[], messages: any[]) => {
  const updated_old_messages = [...messages].filter(message => message.sender_role === SenderRole.USER)
  const updated_new_messages = [...new_messages].filter(message => message.sender_role === SenderRole.USER)
  updated_new_messages.forEach(message => {
    const foundIndex = updated_old_messages.findIndex(item => String(item._id) === String(message._id))
    if (foundIndex < 0) {
      updated_old_messages.push(message)
    }
  })
  return updated_old_messages
}

export const getMessage = (_id: string, messages: IMessage[]): IMessage => {
  const foundIndex = messages.findIndex(message => String(message._id) === String(_id))
  return foundIndex >= 0? messages[foundIndex] : {} as unknown as IMessage
}

export const getFromAndToMessages = (messages: IMessage[]): IMessage[] => {
  const resolvedMessages: IMessage[] = []
  messages.forEach(item => {
    const foundIndex = resolvedMessages.findIndex(prop => prop.chatID === item.chatID)
    if (foundIndex >= 0) {
      resolvedMessages[foundIndex] = item
    } else {
      resolvedMessages.push(item)
    }
  })
  return resolvedMessages
}

export const getDefaultFromAndToMessages = (chatID: string, messages: IMessage[]): IMessage[] => {
  return messages.filter((item: any) => item.chatID === chatID)
}