import { IManagerEdit, IManagerInput } from "src/models/InvestmentModels/manager"

export const FetchManagersBodyTag = "fetchManagers"
export const FetchManagersBody = () => ({
  query: `{
    fetchManagers {
      _id
      first_name
      middle_name
      last_name
      address {
        region
        zone
        city
        kebele
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      createdAt
      updatedAt
    }
  }`
})

export const CreateManagerBodyTag = "createManager"
export const CreateManagerBody = (input: IManagerInput) => ({
  query: `mutation {
    createManager(input: {
      first_name: "${input.first_name}"
      middle_name: "${input.middle_name}"
      last_name: "${input.last_name}"
      address: {
        region: "${input.address.region}"
        zone: "${input.address.zone}"
        city: "${input.address.city}"
        sub_city: "${input.address.sub_city}"
        house_number: "${input.address.house_number}"
        email: "${input.address.email}"
        telephone_direct: "${input.address.telephone_direct}"
        telephone_mobile: "${input.address.telephone_mobile}"
        fax: "${input.address.fax}"
        po_box: "${input.address.po_box}"
        other_address: "${input.address.other_address}"
      }
    }) {
      ...on IManagerSimple {
          _id
          first_name
          middle_name
          last_name
          address {
            region
            zone
            city
            kebele
            house_number
            email
            telephone_direct
            telephone_mobile
            fax
            po_box
            other_address
          }
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

export const UpdateManagerBodyTag = "updateManager"
export const UpdateManagerBody = (input: IManagerEdit) => ({
  query: `mutation {
    updateManager(input: {
      _id: "${input._id}"
      first_name: "${input.first_name}"
      middle_name: "${input.middle_name}"
      last_name: "${input.last_name}"
      address: {
        region: "${input.address.region}"
        zone: "${input.address.zone}"
        city: "${input.address.city}"
        sub_city: "${input.address.sub_city}"
        house_number: "${input.address.house_number}"
        email: "${input.address.email}"
        telephone_direct: "${input.address.telephone_direct}"
        telephone_mobile: "${input.address.telephone_mobile}"
        fax: "${input.address.fax}"
        po_box: "${input.address.po_box}"
        other_address: "${input.address.other_address}"
      }
    }) {
      ...on IManagerSimple {
        _id
        first_name
        middle_name
        last_name
        address {
          region
          zone
          city
          kebele
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
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

export const RemoveManagerBodyTag = "removeOneManager"
export const RemoveManagerBody = (_id: string) => ({
  query: `mutation {
    removeOneManager(_id: "${_id}") {
      _id
      first_name
      middle_name
      last_name
      address {
        region
        zone
        city
        kebele
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      createdAt
      updatedAt
    }
  }`
})