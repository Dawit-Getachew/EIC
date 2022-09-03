import { Role } from "../../../Common/constants"

export const DocumentNumberActions = {
  Query: {
    fetchAll: "fetchDocumentNumbers", fetchOneByID: "fetchOneDocumentNumberByID", fetchManyByID: "fetchManyDocumentNumbersByID"
  },
  Mutation: {
    post: "createDocumentNumber", edit: "updateDocumentNumber",
    removeOne: "removeOneDocumentNumber", removeMany: "removeManyDocumentNumbers", removeAll: "removeAllDocumentNumbers"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(DocumentNumberActions.Query),
        ...Object.values(DocumentNumberActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(DocumentNumberActions.Query), DocumentNumberActions.Mutation.removeOne,
        DocumentNumberActions.Mutation.post, DocumentNumberActions.Mutation.edit, DocumentNumberActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        DocumentNumberActions.Query.fetchOneByID,
        DocumentNumberActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
