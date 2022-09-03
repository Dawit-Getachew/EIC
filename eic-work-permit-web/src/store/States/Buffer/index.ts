export const constants = {
  "AUTHENTICATE_ADMIN": "AUTHENTICATE_ADMIN",
  "DEAUTHENTICATE_ADMIN": "DEAUTHENTICATE_ADMIN",
  "SET_SERVICE_ID": "SET_SERVICE_ID",
  "UPDATE_BACK_URL": "UPDATE_BACK_URL",
  "SET_READ_MESSAGES": "SET_READ_MESSAGES",
  "UPDATE_BREADCRUMPS": "UPDATE_BREADCRUMPS",
  "UPDATE_NEW_FORM": "UPDATE_NEW_FORM",
  "CLEAR_NEW_FORM": "CLEAR_NEW_FORM",
  "UPDATE_EXPANSION_FORM": "UPDATE_EXPANSION_FORM",
  "CLEAR_EXPANSION_FORM": "CLEAR_EXPANSION_FORM",
  "UPDATE_VIEW_FORM": "UPDATE_VIEW_FORM",
  "CLEAR_VIEW_FORM": "CLEAR_VIEW_FORM",
  "UPDATE_RENEW_FORM": "UPDATE_RENEW_FORM",
  "CLEAR_RENEW_FORM": "CLEAR_RENEW_FORM",
  "UPDATE_CANCELLATION_FORM": "UPDATE_CANCELLATION_FORM",
  "CLEAR_CANCELLATION_FORM": "CLEAR_CANCELLATION_FORM",
  "UPDATE_AMMENDMENT_FORM": "UPDATE_AMMENDMENT_FORM",
  "CLEAR_AMMENDMENT_FORM": "CLEAR_AMMENDMENT_FORM",
  "SET_USER_OBJ": "SET_USER_OBJ",
  "SET_ALL_USERS": "SET_ALL_USERS"
}

export const stateName = "buffer"

export const initialState = {
  isAuthenticated: false,
  backURL: "/",
  service_id:"",
  readMessages: [],
  breadCrumps: [],
  new_investment_permit: {},
  expansion_investment_permit: {},
  view_investment_permit: {},
  renew_investment_permit: {},
  cancellation_investment_permit: {},
  ammendment_investment_permit: {},
  user_object: {},
  users: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.AUTHENTICATE_ADMIN: {
      return {
        ...state, isAuthenticated: true
      }
    }

    case constants.SET_ALL_USERS: {
      return {
        ...state, users: action.payload
      }
    }

    case constants.SET_USER_OBJ: {
      return {
        ...state, user_object: action.payload
      }
    }

    case constants.SET_SERVICE_ID: {
      return {
        ...state, service_id: action.payload? action.payload : state.service_id
      }
    }

    case constants.UPDATE_BREADCRUMPS: {
      return {
        ...state, breadCrumps: action.payload
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

    case constants.UPDATE_AMMENDMENT_FORM: {
      return {
        ...state, ammendment_investment_permit: {
          ...state.ammendment_investment_permit,
          ...action.payload
        }
      }
    }

    case constants.UPDATE_EXPANSION_FORM: {
      return {
        ...state, expansion_investment_permit: {
          ...state.expansion_investment_permit,
          ...action.payload
        }
      }
    }

    case constants.UPDATE_VIEW_FORM: {
      return {
        ...state, view_investment_permit: {
          ...state.view_investment_permit,
          ...action.payload
        }
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

    case constants.UPDATE_CANCELLATION_FORM: {
      return {
        ...state, cancellation_investment_permit: {
          ...state.cancellation_investment_permit,
          ...action.payload
        }
      }
    }

    case constants.CLEAR_NEW_FORM: {
      return {
        ...state, new_investment_permit: {}
      }
    }

    case constants.CLEAR_AMMENDMENT_FORM: {
      return {
        ...state, ammendment_investment_permit: {}
      }
    }

    case constants.CLEAR_RENEW_FORM: {
      return {
        ...state, renew_investment_permit: {}
      }
    }

    case constants.CLEAR_CANCELLATION_FORM: {
      return {
        ...state, cancellation_investment_permit: {}
      }
    }

    case constants.CLEAR_EXPANSION_FORM: {
      return {
        ...state, expansion_investment_permit: {}
      }
    }

    case constants.CLEAR_VIEW_FORM: {
      return {
        ...state, view_investment_permit: {}
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

    default: {
      return state
    }
  }
}

export const isAuthenticated = (state: any) => state.entities[stateName].isAuthenticated
export const selectBackURL = (state: any) => state.entities[stateName].backURL
export const selectServiceID = (state: any) => state.entities[stateName].service_id
export const selectReadMessages = (state: any) => state.entities[stateName].readMessages
export const selectBreadCrumps = (state: any) => state.entities[stateName].breadCrumps

export const Selectors = {
  selectNewPermitBuffer: (state: any) => state.entities[stateName].new_investment_permit,
  selectExpansionPermitBuffer: (state: any) => state.entities[stateName].expansion_investment_permit,
  selectViewPermitBuffer: (state: any) => state.entities[stateName].view_investment_permit,
  selectRenewPermitBuffer: (state: any) => state.entities[stateName].renew_investment_permit,
  selectCancellationPermitBuffer: (state: any) => state.entities[stateName].cancellation_investment_permit,
  selectAmmendmentPermitBuffer: (state: any) => state.entities[stateName].ammendment_investment_permit,
  selectUserObject: (state: any) => state.entities[stateName].user_object,
  selectAllUsers: (state: any) => state.entities[stateName].users,
}

export const Actions = {
  Authenticate: () => ({ type: constants.AUTHENTICATE_ADMIN }),
  DeAuthenticate: () => ({ type: constants.DEAUTHENTICATE_ADMIN }),
  UpdateBackURL: (url: string) => ({ type: constants.UPDATE_BACK_URL, payload: url }),
  SetServiceID: (payload: string) => ({ type: constants.SET_SERVICE_ID, payload }),
  SetReadMessages: (payload: any[]) => ({ type: constants.SET_READ_MESSAGES, payload }),
  SetBreadCrumps: (payload: any[]) => ({ type: constants.UPDATE_BREADCRUMPS, payload }),
  SetNewPermitBuffer: (payload: any) => ({ type: constants.UPDATE_NEW_FORM, payload }),
  SetExpansionPermitBuffer: (payload: any) => ({ type: constants.UPDATE_EXPANSION_FORM, payload }),
  SetViewPermitBuffer: (payload: any) => ({ type: constants.UPDATE_VIEW_FORM, payload }),
  SetRenewPermitBuffer: (payload: any) => ({ type: constants.UPDATE_RENEW_FORM, payload }),
  SetCancellationPermitBuffer: (payload: any) => ({ type: constants.UPDATE_CANCELLATION_FORM, payload }),
  SetAmmendmentPermitBuffer: (payload: any) => ({ type: constants.UPDATE_AMMENDMENT_FORM, payload }),
  ClearNewPermitBuffer: () => ({ type: constants.CLEAR_NEW_FORM }),
  ClearExpansionPermitBuffer: () => ({ type: constants.CLEAR_EXPANSION_FORM }),
  ClearViewPermitBuffer: () => ({ type: constants.CLEAR_VIEW_FORM }),
  ClearRenewPermitBuffer: () => ({ type: constants.CLEAR_RENEW_FORM }),
  ClearCancellationPermitBuffer: () => ({ type: constants.CLEAR_CANCELLATION_FORM }),
  ClearAmmendmentPermitBuffer: () => ({ type: constants.CLEAR_AMMENDMENT_FORM, payload: {} }),
  SetUserObject: (payload: any) => ({ type: constants.SET_USER_OBJ, payload }),
  SetAllUsers: (payload: any[]) => ({ type: constants.SET_ALL_USERS, payload })
}