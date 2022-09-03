import { gql } from "apollo-boost"
import { IMessageEdit, IMessageInput, SenderRole } from "src/models/InvestmentModels/message"

export const FetchMessagesBodyTag = "fetchMessages"
export const FetchMessagesBody = () => ({
  query: `{
    fetchMessages {
      _id
      content
      from_user
      to_user
      sender_role
      chatID
      createdAt
      updatedAt
    }
  }`
})

export const CreateMessageBodyTag = "createMessage"
export const CreateMessageBody = (input: IMessageInput) => ({
  query: `mutation {
    createMessage(input: {
      content: "${input.content}",
      from_user: "${input.from_user}",
      to_user: "${input.to_user}"
      sender_role: ${SenderRole.ADMIN}
    }) {
      ...on IMessageSimple {
        _id
        content
        from_user
        to_user
        sender_role
        chatID
        createdAt
        updatedAt
      }
      ...on ValidationError {
        errors {
          error_code
          error_message
        }
        error_path
      }

      ...on SystemError {
        error_code
        error_message
      }

      ...on ValidationErrors {
        validation_errors {
          error_path
          errors {
            error_code
            error_message
          }
        }
      }      
    }
  }`
})

export const UpdateMessageBodyTag = "updateMessage"
export const UpdateMessageBody = (input: IMessageEdit) => ({
  query: `mutation {
    updateMessage(input: {
      _id: "61fa37597daecd8dd796a43d"
      title: "titlessss"
      project_stage: INITIAL
      environmental_impact: "environmental_impact"
      project_summary: "project_summary"
      address: {
        region: "String"
        zone: "String"
        city: "String"
        sub_city: "String"
        house_number: "String"
        email: "String"
        telephone_direct: "String"
        telephone_mobile: "String"
        fax: "String"
        po_box: "String"
        other_address: "String"
      }
      category_sector: "61f940e0c592db64b5bec50f"
      category_sub_sector: "61f940e0c592db64b5bec54c"
      category_activity: "61f940e0c592db64b5bec595"
      category_investment_activity: "61f940e1c592db64b5bec664"
    }) {
      ...on IMessageSimple {
        _id
        title
        project_stage
        environmental_impact
        project_summary
        category_sector
        category_sub_sector
        category_activity
        category_investment_activity
        address {
          region
          zone
          city
          kebele
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        createdAt
        updatedAt
      }

      ...on ValidationError {
        errors {
          error_code
          error_message
        }
        error_path
      }

      ...on SystemError {
        error_code
        error_message
      }

      ...on ValidationErrors {
        validation_errors {
          error_path
          errors {
            error_code
            error_message
          }
        }
      }
    }
  }`
})

export const RemoveMessageBodyTag = "removeOneMessage"
export const RemoveMessageBody = (_id: string) => ({
  query: `mutation {
    removeOneMessage(_id: "${_id}") {
      _id
      title
      project_stage
      environmental_impact
      project_summary
      category_sector
      category_sub_sector
      category_activity
      category_investment_activity
      address {
        region
        zone
        city
        kebele
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      createdAt
      updatedAt
    }
  }`
})

export const SubscribeToMessagesBodyTag = "subscribeToMessages"
export const SubscribeToMessagesBody = (_id: string) => {
  return gql`subscription {
    subscribeToMessages(_id: "${_id}") {
      _id
      content
      from_user
      to_user
      sender_role
      chatID
      createdAt
      updatedAt
    }
  }`
}