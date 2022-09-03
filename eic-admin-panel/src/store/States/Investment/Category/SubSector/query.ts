import { ISubSectorEdit, ISubSectorInput } from "src/models/InvestmentModels/Category/sub_sector"

export const FetchSubSectorsBodyTag = "fetchSubSectors"
export const FetchSubSectorsBody = () => ({
  query: `{
    fetchSubSectors {
      _id
      name
      sector
      createdAt
      updatedAt
    }
  }`
})

export const CreateSubSectorBodyTag = "createSubSector"
export const CreateSubSectorBody = (input: ISubSectorInput) => ({
  query: `mutation {
    createSubSector(input: {
        name: "${input.name}"
        sector: "${input.sector}"
    }) {
        ...on ISubSectorSimple {
          _id
          name
          sector
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

export const UpdateSubSectorBodyTag = "updateSubSector"
export const UpdateSubSectorBody = (input: ISubSectorEdit) => ({
  query: `mutation {
    updateSubSector(input: {
        _id: "${input._id}"
        name: "${input.name}"
        sector: "${input.sector}"
    }) {
        ...on ISubSectorSimple {
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

export const RemoveSubSectorBodyTag = "removeOneSubSector"
export const RemoveSubSectorBody = (_id: string) => ({
  query: `mutation {
    removeOneSubSector(_id: "${_id}") {
      _id
      name
      createdAt
      updatedAt
    }
  }`
})