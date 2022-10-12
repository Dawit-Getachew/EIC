import { Role } from "../../../Common/constants"

export const ProductActions = {
  Query: {
    fetchAll: "fetchProducts", fetchOneByID: "fetchOneProductByID", fetchManyByID: "fetchManyProductsByID",
  },
  Mutation: {
    postMany: "createManyProducts", post: "createProduct", edit: "updateProduct",
    removeOne: "removeOneProduct", removeMany: "removeManyProducts", removeAll: "removeAllProducts"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(ProductActions.Query),
        ...Object.values(ProductActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(ProductActions.Query), ProductActions.Mutation.removeOne,
        ProductActions.Mutation.post, ProductActions.Mutation.edit, ProductActions.Mutation.removeMany,
        ProductActions.Mutation.postMany
      ]

    case Role.USER:
      return [
        ProductActions.Query.fetchOneByID,
        ProductActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
