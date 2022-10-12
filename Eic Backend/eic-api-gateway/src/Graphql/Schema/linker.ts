import { gql } from "apollo-server-express"

export default gql`
    scalar Date
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }

    enum Gender {
        MALE 
        FEMALE
    }

    enum IRoleAccount {
        SUPER_ADMIN
        ADMIN
        TESTING
        INSPECTOR
        CASE_WORKER
        TEAM_LEADER
        DIRECTOR
    }
    
    enum IRole {
        ADMIN
        USER
        TESTING
    }

    enum Unit {
        SQUARE_METERS
    }

    enum ProjectStages {
        INITIAL
    }

    enum CurrencyTypes {
        BIRR
        DOLLAR
    }

    type Error {
        error_code: Int
        error_message: String!
    }

    # Use for providing validation error during signup if the provided user information fails server side validation.
    # @error_path tells the which field of the input form failed during validation and the @errors provide error message.
    type ValidationError  {
        errors: [Error]
        error_path: String
    }

    # It simply Provide list of @ValidationError models.
    # use when declaring union. B/c union declaration doesn't support array(list).
    type ValidationErrors {
        validation_errors: [ValidationError!]
    }

    # use when we want to notify that a service is down.
    # @error_resource tell which service was call and it is not responding.
    type SystemError {
        error_code: Int
        error_message: String!
        error_resource: String
        error_source: String!
    }

    type SessionError {
        error_message: String
    }

    type UnAuthorizationError {
        error_message: String!
        status: Int
    }

     type UnAuthenticatedError {
        error_message: String!
        status: Int
    }

    type Message {
        message: String!
    }

    input AddressInput {
        sub_city: String!
        city: String!
        kebele: String!
    }

    input AddressEdit {
        sub_city: String
        city: String
        kebele: String
    }

    type IAddress {
        sub_city: String
        city: String
        kebele: String
    }

    type Count {
        amount: Int
    }

    input InputFilter {
        pagination: IPaginationInput!
    }

    input IPaginationInput {
        limit: Int!
        offset: Int!
    }

    type IPagination {
        limit: Int
        offset: Int   
    }

    type IBusinessAddress {
        country: String
        region: String
        region_amharic: String
        zone: String
        zone_amharic: String
        city: String
        city_amharic: String
        sub_city: String
        sub_city_amharic: String
        wereda: String
        wereda_amharic: String
        house_number: String
        email: String
        telephone_direct: String
        telephone_mobile: String
        fax: String
        po_box: String
        other_address: String
    }
    input InputBusinessAddress {
        country: String
        region: String
        region_amharic: String
        zone: String
        zone_amharic: String
        city: String
        city_amharic: String
        sub_city: String
        sub_city_amharic: String
        wereda: String
        wereda_amharic: String
        house_number: String
        email: String
        telephone_direct: String
        telephone_mobile: String
        fax: String
        po_box: String
        other_address: String
    }


  enum InvestmentPermitStatus {
    DRAFTED,
    ACCEPTED,
    REVIEWED,
    VERIFIED,
    APPROVED,
    RENEWED,
    CANCELLED,
    SENT_COMPANY_NAME,
    SENT_NEW_COMPANY_NAME,
    REGISTERED_TIN_NUMBER,
    REGISTERED_COMPANY_NAME,
    SENT_COMPANY_REGISTRATION_BANK_SLIP,
    SENT_MEMORANDUM_BANK_SLIP,
    SENT_MEMORANDUM_OF_ARTICLES,
    SENT_CREDIT_SERVICE_BANK_SLIP,
    SENT_SERVICE_FEE_BANK_SLIP,
    ACCEPTED_MEMORANDUM_OF_ARTICLES,
    ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP,
    ACCEPTED_MEMORANDUM_BANK_SLIP,
    ACCEPTED_CREDIT_SERVICE_BANK_SLIP,
    ACCEPTED_SERVICE_FEE_BANK_SLIP,
  }

  type IPermitProduct {
    name: String
    quantity: Float
    local_share_market: Float
    export_share_market: Float
    unit: String
  }

  input InputPermitProduct {
    name: String!
    quantity: Float!
    local_share_market: Float!
    export_share_market: Float!
    unit: String!
  }

`;