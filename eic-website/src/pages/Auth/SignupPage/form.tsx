export const formInitState = {
  formData: {},
  errors: [],
  required_inputs: [],
  onSubmit: (data: any) => null,
  dispatch: (data: any) => null
}

const constants = {
  "UPDATE_INPUT": "UPDATE_INPUT",
  "UPDATE_ERRORS": "UPDATE_ERRORS",
  "SET_INPUTS": "SET_INPUTS",
  "SET_CALLBACK": "SET_CALLBACK",
}

interface IAction {
  type: string
  payload: any
}

export const register = (name: string, formState, dispatch) => {
  const foundIndex = formState.errors.findIndex(error => String(error.path) === String(name))
  return foundIndex >= 0 ? {
    ...formState.errors[foundIndex],
    name,
    onChange: (event) => {
      const { name, value } = event.target
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value }
      })
    },
  } : {
    name,
    onChange: (event) => {
      const { name, value } = event.target
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value }
      })
    }
  }
}

export const formSubmit = (dispatch: any) => {
  dispatch({
    type: constants.UPDATE_ERRORS,
    payload: {}
  })
}

export const setFormDefaults = (inputs: string[], onSubmit: Function, dispatch) => {
  dispatch({
    type: constants.SET_INPUTS,
    payload: inputs
  })

  dispatch({
    type: constants.SET_CALLBACK,
    payload: onSubmit
  })
}

export const formReducer = (state = formInitState, action: IAction) => {
  switch (action.type) {
    case constants.UPDATE_INPUT: {
      const { name, value } = action.payload
      return {
        ...state, formData: {
          ...state.formData,
          [name]: value
        }
      }
    }

    case constants.SET_INPUTS: {
      return {
        ...state, required_inputs: action.payload
      }
    }

    case constants.SET_CALLBACK: {
      return {
        ...state, onSubmit: action.payload
      }
    }

    case constants.UPDATE_ERRORS: {
      const keys = Object.keys(state.formData)
      const values = Object.values(state.formData)

      const errors: any[] = []
      const toBeRemoved: number[] = []
      state.required_inputs.forEach(input => {
        const foundIndex = keys.findIndex(key => String(key) === String(input))
        if (foundIndex < 0) {
          errors.push({
            path: input,
            error: true,
            helperText: `${input} is required`
          })
        } else {
          if (values[foundIndex] && values[foundIndex] !== "") {
            const errorIndex = state.errors.findIndex(error => String(error.path) === String(input))
            if (errorIndex >= 0) toBeRemoved.push(errorIndex)
          }
        }
      })

      if (errors.filter((_, idx) => toBeRemoved.findIndex(_idx => _idx === idx) < 0).length === 0) {
        if (Object.values(state.formData).length === state.required_inputs.length) {
          state.onSubmit(state.formData)
        }
      }

      return {
        ...state,
        errors: errors.filter((_, idx) => toBeRemoved.findIndex(_idx => _idx === idx) < 0)
      }
    }

    default: return state
  }
}