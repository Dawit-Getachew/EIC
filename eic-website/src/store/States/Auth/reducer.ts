
const initState = {
  isAuthenticated: false,
  authenticatedUser: null,
};

const AuthReducer = (state = initState, action: IAuthAction) => {
  switch (action.type) {
    case ActionType.ADD_USER:
      return {
        ...state, isAuthenticated: action.payload.isAuthenticated, authenticatedUser: action.payload.authenticatedUser,
      }
  }
  return state;
}
export interface ISelectAuth {
  isAuthenticated: boolean,
  authenticatedUser: object | null,
}
export const selectAuth = (state: any): ISelectAuth => ({
  isAuthenticated: state.entities.auth.isAuthenticated, authenticatedUser: state.entities.auth.authenticatedUser,
})

export const Authenticate = (user: any) => ({
  type: ActionType.ADD_USER,
  payload: { isAuthenticated: true, authenticatedUser: user }
})

export const SignOutUser = () => ({
  type: ActionType.ADD_USER,
  payload: { isAuthenticated: false, authenticatedUser: null },
})

const stateName = "auth";

export { AuthReducer, stateName };


export interface IAuthAction {
  type: string,
  payload: IPayload
}

export interface IPayload {
  isAuthenticated: boolean,
  authenticatedUser: object
}

export enum ActionType {
  "ADD_USER" = "ADD_USER",
}