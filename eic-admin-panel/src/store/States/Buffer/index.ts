export const constants = {
  "AUTHENTICATE_ADMIN": "AUTHENTICATE_ADMIN",
  "DEAUTHENTICATE_ADMIN": "DEAUTHENTICATE_ADMIN",
  "SET_SERVICE_ID": "SET_SERVICE_ID",
  "SET_USER_OBJECT": "SET_USER_OBJECT",
  "SET_USER_ROLE": "SET_USER_ROLE",
  "UPDATE_BACK_URL": "UPDATE_BACK_URL",
  "UPDATE_MAP_OBJECT": "UPDATE_MAP_OBJECT",
  "UPDATE_SEARCH_TYPE": "UPDATE_SEARCH_TYPE",
  "UPDATE_CATEGORY_TAB": "UPDATE_CATEGORY_TAB",
  "UPDATE_CREATE_WORK_PERMIT_TAB": "UPDATE_CREATE_WORK_PERMIT_TAB",
  "UPDATE_CREATE_WORK_PERMIT_FORM": "UPDATE_CREATE_WORK_PERMIT_FORM",
  "SET_READ_MESSAGES": "SET_READ_MESSAGES",
  "UPDATE_NEW_FORM": "UPDATE_NEW_FORM",
  "CLEAR_NEW_FORM": "CLEAR_NEW_FORM",
  "UPDATE_RENEW_FORM": "UPDATE_RENEW_FORM",
  "CLEAR_RENEW_FORM": "CLEAR_RENEW_FORM",
  "UPDATE_EXPANSION_FORM": "UPDATE_EXPANSION_FORM",
  "CLEAR_EXPANSION_FORM": "CLEAR_EXPANSION_FORM",
  "UPDATE_CANCELLATION_FORM": "UPDATE_CANCELLATION_FORM",
  "CLEAR_CANCELLATION_FORM": "CLEAR_CANCELLATION_FORM",
  "SET_USERS": "SET_USERS",
  "SET_SEARCH_VALUE": "SET_SEARCH_VALUE",
  "EDIT_INVESTMENT_APPLICATION": "EDIT_INVESTMENT_APPLICATION"
}

export const stateName = "buffer"

export const initialState = {
  isAuthenticated: false,
  backURL: "/",
  service_id:"",
  user_role: "",
  userObject: {},
  mapObject: {},
  searchType: "",
  categoryTab: "1",
  createWorkPermitTab: "1",
  createWorkPermitForm: {},
  readMessages: [],
  new_investment_permit: {},
  view_investment_permit_expansion: {},
  renew_investment_permit: {},
  cancellation_investment_permit: {},
  users: [],
  searchValue: ""
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.AUTHENTICATE_ADMIN: {
      return {
        ...state, isAuthenticated: true
      }
    }

    case constants.SET_SEARCH_VALUE: {
      return {
        ...state, searchValue: action.payload
      }
    }

    case constants.SET_USER_OBJECT: {
      return {
        ...state, userObject: action.payload
      }
    }

    case constants.SET_SERVICE_ID: {
      return {
        ...state, service_id: action.payload? action.payload : state.service_id
      }
    }

    case constants.SET_USERS: {
      return {
        ...state, users: action.payload
      }
    }

    case constants.SET_USER_ROLE: {
      return {
        ...state, user_role: action.payload
      }
    }

    case constants.SET_READ_MESSAGES: {
      return {
        ...state, readMessages: action.payload
      }
    }

    case constants.DEAUTHENTICATE_ADMIN: {
      return {
        ...state, isAuthenticated: false
      }
    }

    case constants.UPDATE_BACK_URL: {
      return {
        ...state, backURL: action.payload
      }
    }

    case constants.UPDATE_MAP_OBJECT: {
      return {
        ...state, mapObject: {
          ...state.mapObject,
          ...action.payload
        }
      }
    }

    case constants.UPDATE_CATEGORY_TAB: {
      return {
        ...state, categoryTab: action.payload
      }
    }

    case constants.UPDATE_CREATE_WORK_PERMIT_TAB: {
      return {
        ...state, createWorkPermitTab: action.payload
      }
    }

    case constants.UPDATE_CREATE_WORK_PERMIT_FORM: {
      return {
        ...state, createWorkPermitForm: {
          ...state.createWorkPermitForm,
          ...action.payload
        }
      }
    }

    case constants.UPDATE_NEW_FORM: {
      return {
        ...state, new_investment_permit: {
          ...state.new_investment_permit,
          ...action.payload
        }
      }
    }

    case constants.CLEAR_NEW_FORM: {
      return {
        ...state, new_investment_permit: {}
      }
    }

    case constants.UPDATE_CANCELLATION_FORM: {
      return {
        ...state, cancellation_investment_permit: {
          ...state.cancellation_investment_permit,
          ...action.payload
        }
      }
    }

    case constants.CLEAR_CANCELLATION_FORM: {
      return {
        ...state, cancellation_investment_permit: {}
      }
    }

    case constants.UPDATE_RENEW_FORM: {
      return {
        ...state, renew_investment_permit: {
          ...state.renew_investment_permit,
          ...action.payload
        }
      }
    }

    case constants.CLEAR_RENEW_FORM: {
      return {
        ...state, renew_investment_permit: {}
      }
    }

    case constants.UPDATE_EXPANSION_FORM: {
      return {
        ...state, view_investment_permit_expansion: {
          ...state.view_investment_permit_expansion,
          ...action.payload
        }
      }
    }

    case constants.CLEAR_EXPANSION_FORM: {
      return {
        ...state, view_investment_permit_expansion: {}
      }
    }

    case constants.EDIT_INVESTMENT_APPLICATION: {
      return {
        ...state, edit_investment_object: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const isAuthenticated = (state: any) => state.entities[stateName].isAuthenticated
export const selectBackURL = (state: any) => state.entities[stateName].backURL
export const selectMapObject = (state: any) => state.entities[stateName].mapObject
export const selectCategoryTab = (state: any) => state.entities[stateName].categoryTab
export const selectCreateWorkPermitTab = (state: any) => state.entities[stateName].createWorkPermitTab
export const selectCreateWorkPermitForm = (state: any) => state.entities[stateName].createWorkPermitForm
export const selectServiceID = (state: any) => state.entities[stateName].service_id
export const selectReadMessages = (state: any) => state.entities[stateName].readMessages

export const Selectors = {
  selectUserRole: (state: any) => state.entities[stateName].user_role,
  selectNewPermitBuffer: (state: any) => state.entities[stateName].new_investment_permit,
  selectExpansionPermitBuffer: (state: any) => state.entities[stateName].view_investment_permit_expansion,
  selectUserObject: (state: any) => state.entities[stateName].userObject,
  selectAllUsers: (state: any) => state.entities[stateName].users,
  selectSearchValue: (state: any) => state.entities[stateName].searchValue,
  selectRenewPermitBuffer: (state: any) => state.entities[stateName].renew_investment_permit,
  selectCancellationPermitBuffer: (state: any) => state.entities[stateName].cancellation_investment_permit,
  selectEditUserObject: (state: any) => state.entities[stateName].edit_investment_object
}

export const Actions = {
  Authenticate: () => ({ type: constants.AUTHENTICATE_ADMIN }),
  DeAuthenticate: () => ({ type: constants.DEAUTHENTICATE_ADMIN }),
  UpdateBackURL: (url: string) => ({ type: constants.UPDATE_BACK_URL, payload: url }),
  UpdateMapObject: (mapObject: any) => ({ type: constants.UPDATE_MAP_OBJECT, payload: mapObject }),
  UpdateCategoryTab: (payload: any) => ({ type: constants.UPDATE_CATEGORY_TAB, payload }),
  UpdateCreateWorkPermitTab: (payload: any) => ({ type: constants.UPDATE_CREATE_WORK_PERMIT_TAB, payload }),
  UpdateCreateWorkPermitForm: (payload: any) => ({ type: constants.UPDATE_CREATE_WORK_PERMIT_FORM, payload }),
  SetServiceID: (payload: string) => ({ type: constants.SET_SERVICE_ID, payload }),
  SetUserRole: (payload: string) => ({ type: constants.SET_USER_ROLE, payload }),
  SetReadMessages: (payload: any[]) => ({ type: constants.SET_READ_MESSAGES, payload }),
  SetUserObject: (payload: any[]) => ({ type: constants.SET_USER_OBJECT, payload }),
  SetAllUsers: (payload: any[]) => ({ type: constants.SET_USERS, payload }),
  SetNewPermitBuffer: (payload: any) => ({ type: constants.UPDATE_NEW_FORM, payload }),
  SetEditUserObject: (payload: any) => ({ type: constants.EDIT_INVESTMENT_APPLICATION, payload }),
  ClearNewPermitBuffer: () => ({ type: constants.CLEAR_NEW_FORM }),
  SetReNewPermitBuffer: (payload: any) => ({ type: constants.UPDATE_RENEW_FORM, payload }),
  ClearReNewPermitBuffer: () => ({ type: constants.CLEAR_RENEW_FORM }),
  SetExpansionPermitBuffer: (payload: any) => ({ type: constants.UPDATE_EXPANSION_FORM, payload }),
  ClearExpansionPermitBuffer: () => ({ type: constants.CLEAR_EXPANSION_FORM }),
  SetCancellationPermitBuffer: (payload: any) => ({ type: constants.UPDATE_CANCELLATION_FORM, payload }),
  ClearCancellationPermitBuffer: () => ({ type: constants.CLEAR_CANCELLATION_FORM }),
  SetSearchValue: (payload: string) => ({ type: constants.SET_SEARCH_VALUE, payload }),
}