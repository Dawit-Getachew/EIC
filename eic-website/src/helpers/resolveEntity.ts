export const resolveEntity = (state: any, type: any = null) => {
    if (!type) return type
    return {
        entities: {
            [type]: state
        }
    }
}

export const unResolveEntity = (state: any, type: any = null) => {
    if (!type) return type
    return state.entities[type]
}