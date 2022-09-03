import { IBusinessProfileEdit, IBusinessProfileInput } from "src/models/InvestmentModels/business_profile"

export const FetchBusinessProfilesBodyTag = "fetchBusinessProfiles"
export const FetchBusinessProfilesBody = () => ({
  query: `{
    fetchBusinessProfiles {
      _id
      legal_status
      form_of_ownership
      company_of_incorporation
      company_name
      company_name_amharic
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
      tin_number
      registration_number
      createdAt
      updatedAt
    }
  }`
})

export const CreateBusinessProfileBodyTag = "createBusinessProfile"
export const CreateBusinessProfileBody = (input: IBusinessProfileInput) => ({
  query: `mutation {
    createBusinessProfile(input: {
        legal_status: ${input.legal_status}
        form_of_ownership: ${input.form_of_ownership}
        company_of_incorporation: "${input.company_of_incorporation}"
        company_name: "${input.company_name}"
        company_name_amharic: "${input.company_name_amharic}"
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
        tin_number: "2123f23232323"
        registration_number: "sdvsdvsdvsdvsdv"
    }) {
      ...on IBusinessProfileSimple {
        _id
        legal_status
        form_of_ownership
        company_of_incorporation
        company_name
        company_name_amharic
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
        tin_number
        registration_number
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

export const UpdateBusinessProfileBodyTag = "updateBusinessProfile"
export const UpdateBusinessProfileBody = (input: IBusinessProfileEdit) => ({
  query: `mutation {
    updateBusinessProfile(input: {
      _id: "${input._id}"
      legal_status: ${input.legal_status}
      form_of_ownership: ${input.form_of_ownership}
      company_of_incorporation: "${input.company_of_incorporation}"
      company_name: "${input.company_name}"
      company_name_amharic: "${input.company_name_amharic}"
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
      tin_number: "${input.tin_number}"
      registration_number: "${input.registration_number}"
    }) {
      ...on IBusinessProfileSimple {
        _id
        legal_status
        form_of_ownership
        company_of_incorporation
        company_name
        company_name_amharic
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
        tin_number
        registration_number
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

export const RemoveBusinessProfileBodyTag = "removeOneBusinessProfile"
export const RemoveBusinessProfileBody = (_id: string) => ({
  query: `mutation {
    removeOneBusinessProfile(_id: "${_id}") {
      _id
      legal_status
      form_of_ownership
      company_of_incorporation
      company_name
      company_name_amharic
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
      tin_number
      registration_number
      createdAt
      updatedAt
    }
  }`
})