import StateArrayModel from "../../../wrappers/StateModels/StateArrayModelGQL"
import { IUserDoc } from "./user.types"

const User = new StateArrayModel({ stateName: "users_data" })

User.setInitialState()

User.setFetchBody("fetchUsers")
User.setAddBody("postUser")
User.setEditBody("editUser")
User.setDeleteBody("removeUser")

User.createSlice()

export const {
  selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = User.getSelectors()

export const {
  stateName, reducer
} = User.getEntity()

export const {
  Fetch, Add, Remove, Edit
} = User.getAPIHandles()

export const selectUsers = (state: any): IUserDoc[] => {
  const base: IUserDoc[] = []
  const result = selectData(state)
  return [...base, ...result]
};

export const FetchUsers = () => ({
  query: `{
    fetchUsers {
      _id
      phone_number
      first_name
      last_name
      user_name
  }
}`
})