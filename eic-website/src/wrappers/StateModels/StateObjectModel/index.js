import { createSlice } from "@reduxjs/toolkit";
import {
  STATE_INI,
  STATE_REQ,
  STATE_OK,
  STATE_ERR,
} from "../../../constants/reduxStatus";
import { resolveEntity, unResolveEntity } from "../../../helpers/resolveEntity";
import { apiCallBegan } from "../../../store/api";
import { objectActions } from "../../../constants/apiActions";
import { getQuery } from "../../../helpers/basic";

export default class StateArrayModel {
  constructor({ stateName, initialState, state }) {
    this.config = {
      stateName: stateName ? stateName : "template",
      initialState: initialState ? initialState : { data: [] },
      results: this.enabledResults,
      isMock: false,
      hasCustomAct: false,
      customActTypes: {},
    };

    this.requestOptions = {
      url: {},
      data: "",
      method: "get",
      onStart: "",
      onSuccess: "",
      onError: "",
    };

    this.postReqest = this.requestOptions;
    this.fetchRequest = this.requestOptions;
    this.putRequest = this.requestOptions;
    this.deleteRequest = this.requestOptions;
    this.patchRequest = this.requestOptions;

    this.data = {
      state: state ? state : {},
    };
  }

  status = {
    addStatus: STATE_INI,
    fetchStatus: STATE_INI,
    editStatus: STATE_INI,
    deleteStatus: STATE_INI,
    patchStatus: STATE_INI,
  };

  core = {
    slice: {},
  };

  defaultURL = "";

  data = {
    state: {},
  };

  enabledResults = {
    fetchEnabled: true,
    editEnabled: false,
    postEnabled: false,
    deleteEnabled: false,
    patchEnabled: false,
  };

  setResults(config = this.enabledResults) {
    this.config.results = config;
  }

  enableResults = (config = this.enabledResults) => {
    this.config.results = {
      ...this.enabledResults,
      ...config,
    };
  };

  toggleCustomAct = (value = false) => {
    this.config = {
      ...this.config,
      hasCustomAct: value,
    };
  };

  enableCustomAct = (mapper = (dispatch, action) => null) => {
    this.config = {
      ...this.config,
      hasCustomAct: true,
      customActMapper: mapper,
    };
  };

  APIActions = {
    fetch: this.requestOptions,
    add: this.requestOptions,
    edit: this.requestOptions,
    remove: this.requestOptions,
    patch: this.requestOptions,
  };

  selectors = [];

  setMock = () => {
    this.config.isMock = true;
  };

  getData = () => {
    return unResolveEntity(this.data.state, this.config.stateName);
  };

  getConfig = () => {
    return this.config;
  };

  setConfig = (config) => {
    this.config = config;
  };

  getState = () => {
    return this.data.state;
  };

  setState = (state = this.config.initialState) => {
    this.data.state = state;
  };

  getInitialState = () => {
    return this.config.initialState;
  };

  setInitialState = (initialState = this.config.initialState) => {
    this.config.initialState = initialState;
  };

  getReducer = () => {
    return this.core.slice.reducer;
  };

  createSlice = () => {
    const {
      postEnabled,
      editEnabled,
      deleteEnabled,
      patchEnabled,
    } = this.enabledResults;
    this.core.slice = createSlice({
      initialState: {
        ...this.config.initialState,
        ...this.status,
      },
      reducers: {
        requestFetch(state, _) {
          state.fetchStatus = STATE_REQ;
        },
        successFetch(state, action) {
          if (action.payload.isMock) {
            state.fetchStatus = {
              ...STATE_OK,
              response: action.payload.data,
            };
            state.data = action.payload.data;
          } else {
            if (action.config.results.fetchEnabled) {
              state.fetchStatus = {
                ...STATE_OK,
                response: action.payload,
              };
              state.data = action.payload.results;
            } else {
              state.fetchStatus = {
                ...STATE_OK,
                response: action.payload,
              };
              state.data = action.payload;
            }
          }
        },
        failureFetch(state, action) {
          state.fetchStatus = STATE_ERR(action.payload);
        },

        requestAdd(state, _) {
          state.addStatus = STATE_REQ;
        },
        successAdd(state, action) {
          if (action.payload.isMock) {
            state.data.unshift(action.payload.data);
            state.addStatus = {
              ...STATE_OK,
              response: action.payload.data,
            };
          } else if (postEnabled) {
            state.data.unshift(action.payload.results);
            state.addStatus = {
              ...STATE_OK,
              response: action.payload.results,
            };
          } else {
            state.data.unshift(action.payload);
            state.addStatus = {
              ...STATE_OK,
              response: action.payload,
            };
          }
        },
        failureAdd(state, action) {
          state.addStatus = STATE_ERR(action.payload);
        },

        requestEdit(state, _) {
          state.editStatus = STATE_REQ;
        },

        successEdit(state, action) {
          state.editStatus = STATE_OK;
          if (editEnabled) {
            state.data = action.payload.results;
          } else {
            state.data = action.payload;
          }
        },
        failureEdit(state, action) {
          state.editStatus = STATE_ERR(action.payload);
        },

        requestPatch(state, _) {
          state.patchStatus = STATE_REQ;
        },

        successPatch(state, action) {
          if (patchEnabled) {
            state.patchStatus = {
              ...STATE_OK,
              response: action.payload.results,
            };
            state.data = {
              ...state.data,
              ...action.payload.results,
            };
          } else {
            state.patchStatus = {
              ...STATE_OK,
              response: action.payload,
            };
            state.data = {
              ...state.data,
              ...action.payload,
            };
          }
        },
        failurePatch(state, action) {
          state.patchStatus = STATE_ERR(action.payload);
        },

        requestDelete(state, _) {
          state.deleteStatus = STATE_REQ;
        },
        successDelete(state, action) {
          state.deleteStatus = STATE_OK;
          if (deleteEnabled) {
            state.data = state.data.filter(
              (element) => element.id !== action.payload.results.id
            );
          } else {
            state.data = state.data.filter(
              (element) => element.id !== action.payload.id
            );
          }
        },
        failureDelete(state, action) {
          state.deleteStatus = STATE_ERR(action.payload);
        },
      },
      name: this.config.stateName,
    });
  };

  getSlice = () => {
    return this.core.slice;
  };

  getStatus = () => {
    return this.status;
  };

  setStatus = (status = this.status) => {
    this.status = status;
  };

  getSelectors = () => {
    return {
      selectAddStatus: this.selectAddStatus,
      selectFetchStatus: this.selectFetchStatus,
      selectEditStatus: this.selectEditStatus,
      selectPatchStatus: this.selectPatchStatus,
      selectDeleteStatus: this.selectDeleteStatus,
      selectData: this.selectData,
    };
  };

  selectAddStatus = (state) => {
    const { addStatus } = unResolveEntity(state, this.config.stateName);
    return addStatus;
  };
  selectFetchStatus = (state) => {
    const { fetchStatus } = unResolveEntity(state, this.config.stateName);
    return fetchStatus;
  };
  selectEditStatus = (state) => {
    const { editStatus } = unResolveEntity(state, this.config.stateName);
    return editStatus;
  };
  selectPatchStatus = (state) => {
    const { patchStatus } = unResolveEntity(state, this.config.stateName);
    return patchStatus;
  };
  selectDeleteStatus = (state) => {
    const { deleteStatus } = unResolveEntity(state, this.config.stateName);
    return deleteStatus;
  };

  selectData = (state) => {
    const { data } = unResolveEntity(state, this.config.stateName);
    return data;
  };

  // Actions
  getActions = () => {
    var actions = {
      requestFetch: (state, action) => null,
      successFetch: (state, action) => null,
      failureFetch: (state, action) => null,
      requestAdd: (state, action) => null,
      successAdd: (state, action) => null,
      failureAdd: (state, action) => null,
      requestEdit: (state, action) => null,
      successEdit: (state, action) => null,
      failureEdit: (state, action) => null,
      requestPatch: (state, action) => null,
      successPatch: (state, action) => null,
      failurePatch: (state, action) => null,
      requestDelete: (state, action) => null,
      successDelete: (state, action) => null,
      failureDelete: (state, action) => null,
    };
    const {
      requestFetch,
      successFetch,
      failureFetch,
      requestAdd,
      successAdd,
      failureAdd,
      requestEdit,
      successEdit,
      failureEdit,
      requestPatch,
      successPatch,
      failurePatch,
      requestDelete,
      successDelete,
      failureDelete,
    } = this.core.slice.actions;
    actions.requestFetch = requestFetch;
    actions.successFetch = successFetch;
    actions.failureFetch = failureFetch;
    actions.requestAdd = requestAdd;
    actions.successAdd = successAdd;
    actions.failureAdd = failureAdd;
    actions.requestEdit = requestEdit;
    actions.successEdit = successEdit;
    actions.failureEdit = failureEdit;
    actions.requestPatch = requestPatch;
    actions.successPatch = successPatch;
    actions.failurePatch = failurePatch;
    actions.requestDelete = requestDelete;
    actions.successDelete = successDelete;
    actions.failureDelete = failureDelete;
    return actions;
  };

  resolveState = (state) => {
    return resolveEntity(state, this.config.stateName);
  };

  unResolveState = (state) => {
    return unResolveEntity(state, this.config.stateName);
  };

  getEntity = () => {
    return {
      stateName: this.config.stateName,
      reducer: this.getReducer(),
    };
  };

  setAdd = ({ url, data }) => {
    const { requestAdd, successAdd, failureAdd } = this.getActions();
    this.postReqest = {
      ...this.postReqest,
      onStart: requestAdd.type,
      onSuccess: successAdd.type,
      onError: failureAdd.type,
      method: "post",
    };
    if (url) {
      this.postReqest.url = url;
    }

    if (data) {
      this.postReqest.data = data;
    }

    this.APIActions.add = this.postReqest;
  };

  setFetch = ({ url, data }) => {
    const { requestFetch, successFetch, failureFetch } = this.getActions();
    this.fetchRequest = {
      ...this.fetchRequest,
      onStart: requestFetch.type,
      onSuccess: successFetch.type,
      onError: failureFetch.type,
      method: "get",
    };
    if (url) {
      this.fetchRequest.url = url;
    }

    if (data) {
      this.fetchRequest.data = data;
    }

    this.APIActions.fetch = this.fetchRequest;
  };

  setEdit = ({ url, data }) => {
    const { requestEdit, successEdit, failureEdit } = this.getActions();
    this.putRequest = {
      ...this.putRequest,
      onStart: requestEdit.type,
      onSuccess: successEdit.type,
      onError: failureEdit.type,
      method: "put",
    };
    if (url) {
      this.putRequest.url = url;
    }

    if (data) {
      this.putRequest.data = data;
    }

    this.APIActions.edit = this.putRequest;
  };

  setPatch = ({ url, data }) => {
    const { requestPatch, successPatch, failurePatch } = this.getActions();
    this.patchRequest = {
      ...this.patchRequest,
      onStart: requestPatch.type,
      onSuccess: successPatch.type,
      onError: failurePatch.type,
      method: "patch",
    };
    if (url) {
      this.patchRequest.url = url;
    }

    if (data) {
      this.patchRequest.data = data;
    }

    this.APIActions.patch = this.patchRequest;
  };

  setRemove = ({ url, id }) => {
    const { requestDelete, successDelete, failureDelete } = this.getActions();
    this.deleteRequest = {
      ...this.deleteRequest,
      onStart: requestDelete.type,
      onSuccess: successDelete.type,
      onError: failureDelete.type,
      method: "delete",
    };

    if (url && id) {
      this.deleteRequest.url = url + id;
    }

    if (url) {
      this.deleteRequest.url = url;
    }

    this.APIActions.remove = this.deleteRequest;
  };

  getAPITypes = () => {
    const { Fetch, Edit, Patch } = this.getAPIHandles();
    const {
      payload: { onSuccess: successFetch },
    } = Fetch();
    const {
      payload: { onSuccess: successEdit },
    } = Edit();
    const {
      payload: { onSuccess: successPatch },
    } = Patch();
    const stateActions = {
      successFetch,
      successEdit,
      successPatch,
    };

    return {
      stateActions,
      objectActions,
    };
  };

  getAPICallType = (apiCallType) => {
    const actionValues = Object.values(this.getAPITypes().stateActions);
    const index = actionValues.findIndex((action) => action === apiCallType);
    if (index >= 0) {
      return {
        apiType: Object.values(actionValues)[index],
        type: Object.values(objectActions)[index],
      };
    } else {
      return null;
    }
  };

  getAPIHandles = () => {
    return {
      Fetch: (keys, isMock = this.config.isMock, config = this.config) => {
        const { requestFetch, successFetch, failureFetch } = this.getActions();
        let url = this.defaultURL;
        if (keys) {
          url = getQuery(this.defaultURL, keys);
        } else {
          url = this.defaultURL;
        }
        this.fetchRequest = {
          ...this.config,
          ...this.fetchRequest,
          onStart: requestFetch.type,
          onSuccess: successFetch.type,
          onError: failureFetch.type,
          isMock,
          config,
          method: "get",
        };
        this.setFetch({ ...this.fetchRequest, url });
        return this.Fetch();
      },
      Edit: (data, isMock = this.config.isMock, config = this.config) => {
        const { requestEdit, successEdit, failureEdit } = this.getActions();
        this.putRequest = {
          ...this.config,
          ...this.putRequest,
          onStart: requestEdit.type,
          onSuccess: successEdit.type,
          onError: failureEdit.type,
          isMock,
          config,
          method: "put",
        };
        if (data) {
          this.putRequest.data = data;
          this.putRequest.url = this.requestOptions.url + "/" + data.id;
        }
        this.setEdit({ ...this.putRequest });
        return this.Edit();
      },
      Patch: (data, isMock = this.config.isMock, config = this.config) => {
        const { requestPatch, successPatch, failurePatch } = this.getActions();
        this.patchRequest = {
          ...this.config,
          ...this.patchRequest,
          onStart: requestPatch.type,
          onSuccess: successPatch.type,
          onError: failurePatch.type,
          isMock,
          config,
          method: "patch",
        };
        if (data) {
          this.patchRequest.data = data;
          this.patchRequest.url = this.requestOptions.url + "/" + data.id;
        }
        this.setPatch({ ...this.patchRequest });
        return this.Patch();
      },
    };
  };

  setURL = (url = this.requestOptions.url) => {
    this.requestOptions.url = url;
    this.defaultURL = url;
  };

  getURL = () => this.defaultURL;

  Add = () => apiCallBegan(this.APIActions.add);
  Fetch = () => apiCallBegan(this.APIActions.fetch);
  Edit = () => apiCallBegan(this.APIActions.edit);
  Patch = () => apiCallBegan(this.APIActions.patch);
  Remove = () => apiCallBegan(this.APIActions.remove);
}
