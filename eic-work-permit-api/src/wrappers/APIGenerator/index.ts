import { Model, Document, Schema } from "mongoose"
import { getError } from "./helpers/formatError"
import { IBasicDBAction, IBasicStatus, IBasicDocument, SystemError, ErrorTypes } from "./common/interface"
import { ErrorCodes } from "../../Common/constants"
import { IPagination } from "./common/interface"

class API {
    schema = ""
    model: Model<Document> | undefined
    __typename: string = ""
    constructor(modelInput?: Model<Document>, __typename: string = "IDoc") {
        if (modelInput) {
            this.model = modelInput
        }
        if (__typename) {
            this.__typename = __typename
        }
    }

    getSchema = () => this.schema

    setSchema = (schemaString: string) => this.schema = schemaString

    getModel = () => this.model

    setModel = (model: any) => this.model = model

    defaultCallback = async (data: any, err: any = null): Promise<void | null> => null

    getAPICalls = () => ({
        Fetch: async (paginationOptions: IPagination | null = null, callback = this.defaultCallback): Promise<IBasicDocument<any>> => {
            let response: any[] = []
            if (paginationOptions) {
                response = await this.model?.find({}).skip(paginationOptions.pagination.offset).limit(paginationOptions.pagination.limit).exec() as any[]
            } else {
                response = await this.model?.find({}) as any[]
            }
            callback(response, null)
            return {
                data: response,
                status: IBasicStatus.SUCCESS,
                action: IBasicDBAction.FETCH
            }
        },
        Find: async (finObj = {}, paginationOptions: IPagination | null = null, callback = this.defaultCallback): Promise<IBasicDocument<any>> => {
            let response: any = {}
            if (paginationOptions) {
                response = await this.model?.find(finObj).skip(paginationOptions.pagination.offset).limit(paginationOptions.pagination.limit)
            } else {
                response = await this.model?.find(finObj)
            }
            callback(response, null)
            return {
                data: response,
                status: IBasicStatus.SUCCESS,
                action: IBasicDBAction.FETCH
            }
        },
        FetchMany: async(_ids: any[], fetchTag = "_id", paginationOptions: IPagination | null = null): Promise<IBasicDocument<any>> => {
            let data: any = []
            try {
                if (paginationOptions) {
                    const response = await this.model?.find({ [fetchTag]: {$in: _ids} }).skip(paginationOptions.pagination.offset).limit(paginationOptions.pagination.limit).exec()
                    data = response
                } else {
                    const response = await this.model?.find({ [fetchTag]: {$in: _ids} }).exec()
                    data = response
                }
            } catch(_: any) {}
            return {
                data,
                status: IBasicStatus.SUCCESS,
                action: IBasicDBAction.FETCH
            }
        },
        FetchOne: async (tagValue: any, fetchTag: string = "_id", callback = this.defaultCallback): Promise<IBasicDocument<any>> => {
            let foundItem!: any
            try {
                const response: any = await this.model?.findOne({ [fetchTag]: tagValue })
                foundItem = response
            } catch (_: any) {}
            if (!foundItem) {
                callback(null, getError(400, "Item could not be found"))
                return {
                    data: {
                        __typename: ErrorTypes.ValidationError,
                        errors: [
                            {
                                error_code: ErrorCodes.NOT_FOUND,
                                error_message: "Item could not be found"
                            }
                        ],
                        error_path: fetchTag
                    },
                    status: IBasicStatus.NOT_FOUND,
                    action: IBasicDBAction.FETCH
                }
            }
            callback(foundItem)
            return {
                data: {
                    __typename: this.__typename,
                    ...foundItem.toJSON()
                },
                status: IBasicStatus.SUCCESS,
                action: IBasicDBAction.FETCH
            }
        },
        Edit: async (prop: any, callback = this.defaultCallback): Promise<IBasicDocument<any>> => {
            let foundItem!: any
            try {
                const response: any = await this.model?.findOne({ _id: prop._id })
                foundItem = response
            } catch (_: any) {}
            if (!foundItem) {
                callback(null, getError(400, "Item could not be found"))
                return {
                    data: {
                        __typename: ErrorTypes.ValidationError,
                        errors: [{ error_code: ErrorCodes.NOT_FOUND, error_message: "Item could not be found" }],
                        error_path: "unknown"
                    },
                    status: IBasicStatus.NOT_FOUND,
                    action: IBasicDBAction.FETCH
                }
            }
            const objectProps: any = {}
            for (const item in foundItem.toJSON()) {
                if (item) {
                    objectProps[item] = foundItem[item]
                }
            }
            const editResponse = {
                ...prop
            }
            const response = await this.model?.updateOne({ _id: prop._id }, editResponse)
                .then(() => {
                    const data = {
                        ...objectProps,
                        ...editResponse,
                        __typename: this.__typename
                    }
                    const payload: IBasicDocument<any> = {
                        data, status: IBasicStatus.SUCCESS, action: IBasicDBAction.EDIT
                    }
                    callback(data, null)
                    return payload
                })
                .catch(err => {
                    callback(null, getError(500, err))
                    const payload: IBasicDocument<any> = {
                        data: {
                            __typename: ErrorTypes.SystemError,
                            error_code: ErrorCodes.INTERNAL_SERVER_ERROR,
                            error_message: String(err)
                        } as unknown as SystemError, status: IBasicStatus.BAD_ARGS, action: IBasicDBAction.EDIT
                    }
                    return payload
                })
                return response as unknown as IBasicDocument<any>
        },
        Create: async (prop: any, callback = this.defaultCallback): Promise<IBasicDocument<any>> => {
            const response = await this.model?.create(prop)
                .then(newUser => {
                    callback(newUser, null)
                    const payload: IBasicDocument<any> = {
                        data: {
                            __typename: this.__typename,
                            ...newUser.toJSON(),
                        }, status: IBasicStatus.SUCCESS, action: IBasicDBAction.CREATE
                    }
                    return payload
                })
                .catch(err => {
                    callback(null, getError(500, err))
                    const payload: IBasicDocument<any> = {
                        data: {
                            __typename: ErrorTypes.SystemError,
                            error_code: ErrorCodes.INTERNAL_SERVER_ERROR,
                            error_message: String(err)
                        } as unknown as SystemError, status: IBasicStatus.BAD_ARGS, action: IBasicDBAction.CREATE
                    }
                    return payload
                })
            return response as unknown as IBasicDocument<any>
        },
        Remove: async (_id: Schema.Types.ObjectId, callback = this.defaultCallback): Promise<IBasicDocument<any>>=> {
            let foundItem!: any
            try {
                const response: any = await this.model?.findOne({ _id })
                foundItem = response
            } catch(_: any) {}
            if (!foundItem) {
                callback(null, getError(400, "Item could not be found"))
                const payload: IBasicDocument<any> = {
                    data: {
                        __typename: ErrorTypes.ValidationError,
                        errors: [
                            {
                                error_code: ErrorCodes.NOT_FOUND,
                                error_message: "Item could not be found"
                            }
                        ],
                        error_path: "_id"
                    }, status: IBasicStatus.NOT_FOUND, action: IBasicDBAction.REMOVE
                }
                return payload
            }
            const objectProps: any = {}
            for (const item in foundItem.toJSON()) {
                if (item) {
                    objectProps[item] = foundItem[item]
                }
            }
            const response = await this.model?.deleteOne({ _id })
                .then(() => {
                    callback(objectProps, null)
                    const payload: IBasicDocument<any> = {
                        data: {
                            ...objectProps,
                            __typename: this.__typename
                        }, status: IBasicStatus.SUCCESS, action: IBasicDBAction.REMOVE
                    }
                    return payload
                })
                .catch(err => {
                    callback(null, getError(500, err))
                    const payload: IBasicDocument<any> = {
                        data: getError(500, err), status: IBasicStatus.BAD_ARGS, action: IBasicDBAction.REMOVE
                    }
                    return payload
                })
            return response as unknown as IBasicDocument<any>
        },
        RemoveMany: async(_ids: Schema.Types.ObjectId[]): Promise<IBasicDocument<any>> => {
            const data = await this.model?.find({ _id: { $in: _ids } })
            await this.model?.deleteMany({ _id: { $in: _ids } })
            return {
                data,
                status: IBasicStatus.SUCCESS,
                action: IBasicDBAction.FETCH
            }
            
        },
        RemoveAll: async (): Promise<IBasicDocument<any>> => {
            const response = await this.model?.deleteMany({})
                .then(() => {
                    const payload: IBasicDocument<any> = {
                        data: "Done!", status: IBasicStatus.SUCCESS, action: IBasicDBAction.REMOVE
                    }
                    return payload
                })
                .catch(err => {
                    const payload: IBasicDocument<any> = {
                        data: {
                            __typename: ErrorTypes.ValidationError,
                            errors: [
                                {
                                    error_code: ErrorCodes.NOT_FOUND,
                                    error_message: "Item could not be found"
                                }
                            ],
                            error_path: "_id"
                        }, status: IBasicStatus.BAD_ARGS, action: IBasicDBAction.REMOVE
                    }
                    return payload
                })
            return response as unknown as IBasicDocument<any>
        },
    })
}

export default API