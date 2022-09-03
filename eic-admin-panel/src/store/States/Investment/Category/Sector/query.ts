import { ISectorEdit, ISectorInput } from "src/models/InvestmentModels/Category/sector"

export const FetchSectorsBodyTag = "fetchSectors"
export const FetchSectorsBody = () => ({
  query: `{
    fetchSectors {
      _id
      name
      createdAt
      updatedAt
    }
  }`
})

export const CreateSectorBodyTag = "createSector"
export const CreateSectorBody = (input: ISectorInput) => ({
  query: `mutation {
    createSector(input: {
        name: "${input.name}"
    }) {
        ...on ISectorSimple {
            _id
            name
            createdAt
            updatedAt
        }

        ...on ValidationError {
            errors {
                error_code
                error_message
            }
            error_path
        }

        ...on SystemError {
            error_code
            error_message
        }

        ...on ValidationErrors {
            validation_errors {
                error_path
                errors {
                    error_code
                    error_message
                }
            }
        }
    }
  }`
})

export const UpdateSectorBodyTag = "updateSector"
export const UpdateSectorBody = (input: ISectorEdit) => ({
  query: `mutation {
    updateSector(input: {
        _id: "${input._id}"
        name: "${input.name}"
    }) {
        ...on ISectorSimple {
            _id
            name
            createdAt
            updatedAt
        }

        ...on ValidationError {
            errors {
                error_code
                error_message
            }
            error_path
        }

        ...on SystemError {
            error_code
            error_message
        }

        ...on ValidationErrors {
            validation_errors {
                error_path
                errors {
                    error_code
                    error_message
                }
            }
        }
    }
  }`
})

export const RemoveSectorBodyTag = "removeOneSector"
export const RemoveSectorBody = (_id: string) => ({
  query: `mutation {
    removeOneSector(_id: "${_id}") {
      _id
      name
      createdAt
      updatedAt
    }
  }`
})