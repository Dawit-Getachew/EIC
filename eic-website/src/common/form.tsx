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
  "UPDATE_FORM_DATA": "UPDATE_FORM_DATA",
  "UPDATE_SINGLE_ERROR": "UPDATE_SINGLE_ERROR"
}

interface IAction {
  type: string
  payload: any
}

export const getFormError = (formState = formInitState, name: string) => {
  const foundIndex = formState.errors.findIndex(item => item.path === name)
  return foundIndex >= 0? formState.errors[foundIndex] : {}
}

export const getFormData = (formState = formInitState, name: string) => {
  const values = Object.values(formState.formData)
  const keys = Object.keys(formState.formData)
  const foundIndex = keys.findIndex(item => item === name)
  return foundIndex >= 0? values[foundIndex] : null
}

export const selectFormErrors = (formState: any) => formState.errors

export const selectFormData = (formState: any) => formState.formData

interface IRegisterForm {
  name: string
  formState: any,
  dispatch: any
  isRequired?: boolean
  exactValue?: any
  isCheckbox?: boolean
  disable?: boolean
}

export const registerForm = ({
  name, formState, dispatch, isRequired, exactValue, disable, isCheckbox
}: IRegisterForm) => {
  const foundIndex = formState.errors.findIndex(error => String(error.path) === String(name))
  const values = Object.values(formState.formData)
  const keys = Object.keys(formState.formData)
  const getDefaultValue = (name: string) => {
    const foundKey = keys.findIndex(key => String(key) === String(name))
    return foundKey >= 0? values[foundKey] : ""
  }

  const payloadOne = foundIndex >= 0 && isRequired ? {
    ...formState.errors[foundIndex],
    name,
    onChange: (event) => {
      const { name, value } = event.target
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value }
      })
    },
    value: getDefaultValue(name),
  } : {
    name,
    onChange: (event) => {
      const { name, value } = event.target
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value }
      })
    },
    value: getDefaultValue(name)
  }

  const payloadTwo = exactValue? {
    ...payloadOne,
    checked: (() => {
      return exactValue === getDefaultValue(name)
    })(),
    onChange: () => {
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value: exactValue }
      })
    }
  } : payloadOne

  const payloadThree = disable? {
      ...payloadTwo,
      onChange: () => ({})
    }: payloadTwo
  
  const payloadFour = isCheckbox? {
    ...payloadThree,
    onChange: () => {
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value: !Boolean(getDefaultValue(name)) }
      })
    }
  } : payloadThree

  return payloadFour
}

export const register = (name: string, formState = formInitState, dispatch, isRequired = true, disable = false) => {
  const foundIndex = formState.errors.findIndex(error => String(error.path) === String(name))
  const values = Object.values(formState.formData)
  const keys = Object.keys(formState.formData)
  const getDefaultValue = (name: string) => {
    const foundKey = keys.findIndex(key => String(key) === String(name))
    return foundKey >= 0? values[foundKey] : ""
  }

  const payloadOne = foundIndex >= 0 && isRequired ? {
    ...formState.errors[foundIndex],
    name,
    onChange: (event) => {
      const { name, value } = event.target
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value }
      })
    },
    value: getDefaultValue(name)
  } : {
    name,
    onChange: (event) => {
      const { name, value } = event.target
      dispatch({
        type: constants.UPDATE_INPUT,
        payload: { name, value }
      })
    },
    value: getDefaultValue(name)
  }

  const payloadTwo = disable? {
    ...payloadOne,
    onChange: () => ({})
  }: payloadOne

  return payloadTwo
}

export const FormActions = {
  UpdateFormInput: (payload: any, dispatch: any) => dispatch({
    type: constants.UPDATE_INPUT,
    payload
  }),
  UpdateFormData: (payload: any, dispatch: any) => dispatch({
    type: constants.UPDATE_FORM_DATA,
    payload
  }),
  UpdateSingleError: (payload: { callback: Function, path: string, message: string }, dispatch: any) => dispatch({
    type: constants.UPDATE_SINGLE_ERROR,
    payload
  })
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

    case constants.UPDATE_SINGLE_ERROR: {
      const { callback, path, message } = action.payload
      const response = callback()
      return response ? {
        ...state, errors: state.errors.concat({
          path,
          error: true,
          helperText: message
        })
      } : {
        ...state, errors: state.errors.filter(error => String(error.input) !== String(path))
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

    case constants.UPDATE_FORM_DATA: {
      return {
        ...state, formData: {
          ...state.formData,
          ...action.payload
        }
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
          if (typeof values[foundIndex] === "object") {
            let newValue = values[foundIndex] as any[]
            if (newValue.length === 0) {
              errors.push({
                path: input,
                error: true,
                helperText: `${input} is required`
              })
            } else {
              const errorIndex = state.errors.findIndex(error => String(error.path) === String(input))
              if (errorIndex >= 0) toBeRemoved.push(errorIndex)
            }
          }
          if (values[foundIndex] && values[foundIndex] !== "") {
            const errorIndex = state.errors.findIndex(error => String(error.path) === String(input))
            if (errorIndex >= 0) toBeRemoved.push(errorIndex)
          }
        }
      })

      if (errors.filter((_, idx) => toBeRemoved.findIndex(_idx => _idx === idx) < 0).length === 0) {
        if (Object.values(state.formData).length >= state.required_inputs.length) {
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

export const selectRequriedKeys = (required_list: string[], payload: any) => {
  let exportedObject: any = {}
  required_list.forEach(item => {
    if (payload[item]) {
      exportedObject[item] = payload[item]
    }
  })
  
  return exportedObject
}