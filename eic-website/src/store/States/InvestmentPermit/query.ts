import { IInvestmentPermitInput } from "src/models/InvestmentModels/investment_permit";
import { IInvestmentPermitInput as Input } from "./types"

export const AddInvestmentPermitBodyTag = "createInvestmentPermit"
export const AddInvestmentPermitBody = (input: IInvestmentPermitInput) => ({
  query: `mutation {
      createInvestmentPermit(input: {
        company_name: "${input.company_name}"
        company_name_amharic: "${input.company_name_amharic}"
        trade_name: "${input.trade_name}"
        trade_name_amharic: "${input.trade_name_amharic}"
        investor_nationality: "${input.investor_nationality}"
        type_of_business: "${input.type_of_business}"
        type_of_ownership: "${input.type_of_ownership}"
        shareholders: [${input.shareholders.map((item: any) => (
          `{
            name: "${item.name}"
            nationality: "${item.nationality}"
            country_of_incorporation: "${item.country_of_incorporation}"
            address: "${item.address}"
          }`
        ))}]
        manager_full_name: "${input.manager_full_name}"
        manager_full_name_amharic: "${input.manager_full_name_amharic}"
        company_address: {
          region: "${input.company_address.region}"
          region_amharic: "${input.company_address.region_amharic}"
          zone: "${input.company_address.zone}"
          zone_amharic: "${input.company_address.zone_amharic}"
          city: "${input.company_address.city}"
          city_amharic: "${input.company_address.city_amharic}"
          sub_city: "${input.company_address.sub_city}"
          sub_city_amharic: "${input.company_address.sub_city_amharic}"
          wereda: "${input.company_address.wereda}"
          wereda_amharic: "${input.company_address.wereda_amharic}"
          house_number: "${input.company_address.house_number}"
          email: "${input.company_address.email}"
          telephone_direct: "${input.company_address.telephone_direct}"
          telephone_mobile: "${input.company_address.telephone_mobile}"
          fax: "${input.company_address.fax}"
          po_box: "${input.company_address.po_box}"
          other_address: "${input.company_address.other_address}"
        }
        representative_address: {
          region: "${input.representative_address.region}"
          zone: "${input.representative_address.zone}"
          city: "${input.representative_address.city}"
          sub_city: "${input.representative_address.sub_city}"
          house_number: "${input.representative_address.house_number}"
          email: "${input.representative_address.email}"
          telephone_direct: "${input.representative_address.telephone_direct}"
          telephone_mobile: "${input.representative_address.telephone_mobile}"
          fax: "${input.representative_address.fax}"
          po_box: "${input.representative_address.po_box}"
          other_address: "${input.representative_address.other_address}"
        }
        sector: "${input.sector}"
        investment_activity: "${input.investment_activity}"
        investment_activity_amharic: "${input.investment_activity_amharic}"
        project_description: "${input.project_description}"
        investment_address: {
          region: "${input.investment_address.region}"
          zone: "${input.investment_address.zone}"
          city: "${input.investment_address.city}"
          sub_city: "${input.investment_address.sub_city}"
          house_number: "${input.investment_address.house_number}"
          email: "${input.investment_address.email}"
          telephone_direct: "${input.investment_address.telephone_direct}"
          telephone_mobile: "${input.investment_address.telephone_mobile}"
          fax: "${input.investment_address.fax}"
          po_box: "${input.investment_address.po_box}"
          other_address: "${input.investment_address.other_address}"
        }
      land_size_sqm: ${input.land_size_sqm}
      land_acquisition_type: "${input.land_acquisition_type}"
      investment_capital_usd: ${input.investment_capital_usd}
      investment_capital_birr: ${input.investment_capital_birr}
      permit_documents: {
        power_of_attorney: "${input.permit_documents.power_of_attorney}"
        investment_visa_for_foreigners: "${input.permit_documents.investment_visa_for_foreigners}"
        notarized_minutes_of_resolution: "${input.permit_documents.notarized_minutes_of_resolution}"
        passport: "${input.permit_documents.passport}"
        project_proposal: "${input.permit_documents.project_proposal}"
        certificate_of_incorporation: "${input.permit_documents.certificate_of_incorporation}"
        memorandum_and_articles_of_association: "${input.permit_documents.memorandum_and_articles_of_association}"
        business_background: "${input.permit_documents.business_background}"
      }
      products: [${input.products.map(item => `{
        name: "${item.name}"
        quantity: ${item.quantity}
        local_share_market: ${item.local_share_market}
        export_share_market: ${item.export_share_market}
        unit: "${item.unit}"
      }`)}]
      raw_materials: [${input.raw_materials.map(item => `{
        name: "${item.name}"
        quantity: ${item.quantity}
        local_source: ${item.local_source}
        import_source: ${item.import_source}
        unit: "${item.unit}"
      }`)}]
      heard_from: "${input.heard_from}"
      enviromental_impact: "${input.enviromental_impact}"
      market_destination_local_amount: ${input.market_destination_local_amount}
      market_destination_export_amount: ${input.market_destination_export_amount}
      equity: ${input.equity}
      loan: ${input.loan}
      number_of_employees: ${input.number_of_employees}
      home_address: {
        country: "${input.home_address.country}"
        region: "${input.home_address.region}"
        zone: "${input.home_address.zone}"
        city: "${input.home_address.city}"
        sub_city: "${input.home_address.sub_city}"
        house_number: "${input.home_address.house_number}"
        email: "${input.home_address.email}"
        telephone_direct: "${input.home_address.telephone_direct}"
        telephone_mobile: "${input.home_address.telephone_mobile}"
        fax: "${input.home_address.fax}"
        po_box: "${input.home_address.po_box}"
        other_address: "${input.home_address.other_address}"
      }
      representative_full_name: "${input.representative_full_name}"
      investor_id: "${input.investor_id}"
      employee_information: {
        permanent_female_amount: ${input.employee_information.permanent_female_amount}
        temporary_female_amount: ${input.employee_information.temporary_female_amount}
        permanent_male_amount: ${input.employee_information.permanent_male_amount}
        temporary_male_amount: ${input.employee_information.temporary_male_amount}
      }
    }) {
      ...on IInvestmentPermitSimple {
        _id
        investor_id
        company_name
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchMyInvestmemitsBodyTag = "fetchMyInvestmentPermits"
export const FetchMyInvestmemitsBody = (_id: string) => ({
  query: `{
    fetchMyInvestmentPermits(_id: "${_id}") {
      _id
      company_name
      company_name_amharic
      investor_id
      trade_name
      trade_name_amharic
      type_of_business
      type_of_ownership
      shareholders {
        name
        nationality
        country_of_incorporation
        address
      }
      manager_full_name
      manager_full_name_amharic
      investor_nationality
      employee_information {
        permanent_female_amount
        temporary_female_amount
        permanent_male_amount
        temporary_male_amount
      }
      company_address {
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      representative_address {
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      sector
      investment_activity
      investment_activity_amharic
      project_description
      investment_address {
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      land_size_sqm
      land_acquisition_type
      investment_capital_usd
      investment_capital_birr
      permit_status
      permit_documents {
        power_of_attorney
        investment_visa_for_foreigners
        notarized_minutes_of_resolution
        passport
        project_proposal
        certificate_of_incorporation
        memorandum_and_articles_of_association
        business_background
      }
      products {
        name
        quantity
        local_share_market
        export_share_market
        unit
      }
      raw_materials {
        name
        quantity
        local_source
        import_source
        unit
      }
      heard_from
      ref_number
      enviromental_impact
      market_destination_local_amount
      market_destination_export_amount
      equity
      loan
      number_of_employees
      home_address {
        country
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      representative_full_name
      selected_bank
      createdAt
      updatedAt
    }
  }`
})

export const FetchInvestmentPermitsBodyTag = "fetchInvestmentPermits"
export const FetchInvestmentPermitsBody = () => ({
  query: `{
    fetchInvestmentPermits {
      _id
      company_name
      company_name_amharic
      investor_id
      trade_name
      trade_name_amharic
      type_of_business
      type_of_ownership
      shareholders {
        name
        nationality
        country_of_incorporation
        address
      }
      manager_full_name
      manager_full_name_amharic
      investor_nationality
      employee_information {
        permanent_female_amount
        temporary_female_amount
        permanent_male_amount
        temporary_male_amount
      }
      company_address {
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      representative_address {
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      sector
      investment_activity
      investment_activity_amharic
      project_description
      investment_address {
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      land_size_sqm
      land_acquisition_type
      investment_capital_usd
      investment_capital_birr
      permit_status
      permit_documents {
        power_of_attorney
        investment_visa_for_foreigners
        notarized_minutes_of_resolution
        passport
        project_proposal
        certificate_of_incorporation
        memorandum_and_articles_of_association
        business_background
      }
      products {
        name
        quantity
        local_share_market
        export_share_market
        unit
      }
      raw_materials {
        name
        quantity
        local_source
        import_source
        unit
      }
      heard_from
      ref_number
      enviromental_impact
      market_destination_local_amount
      market_destination_export_amount
      equity
      loan
      number_of_employees
      home_address {
        country
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      representative_full_name
      selected_bank
      createdAt
      updatedAt
    }
  }`
})

export const UpdateCompanyRegistrationFormBodyTag = "updateInvestmentPermit"
export const UpdateCompanyRegistrationFormBody = (input: {
  _id: string, company_registration_form: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      company_registration_form: "${input.company_registration_form}"
      permit_status: SENT_COMPANY_NAME
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
      }
    }
  }`
})

export const UpdateNewCompanyNameBodyTag = "updateInvestmentPermit"
export const UpdateNewCompanyNameBody = (input: {
  _id: string, memorandum_of_association: string,
  edited_name: string, edited_name_amharic: string,
  edited_trade_name: string, edited_trade_name_amharic: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      memorandum_of_association: "${input.memorandum_of_association}"
      edited_name: "${input.edited_name}"
      edited_name_amharic: "${input.edited_name_amharic}"
      edited_trade_name: "${input.edited_trade_name}"
      edited_trade_name_amharic: "${input.edited_trade_name_amharic}"
      permit_status: SENT_NEW_COMPANY_NAME
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
      }
    }
  }`
})

export const UpdateCompanyRegistrationBankSlipFormBodyTag = "updateInvestmentPermit"
export const UpdateCompanyRegistrationBankSlipFormBody = (input: {
  _id: string, company_registration_bank_slip_form: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      company_registration_bank_slip_form: "${input.company_registration_bank_slip_form}"
      permit_status: SENT_COMPANY_REGISTRATION_BANK_SLIP
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
      }
    }
  }`
})

export const UpdateMemorandumArticleFormBodyTag = "updateInvestmentPermit"
export const UpdateMemorandumArticleFormBody = (input: {
  _id: string, memorandum_of_association: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      memorandum_of_association: "${input.memorandum_of_association}"
      permit_status: SENT_MEMORANDUM_OF_ARTICLES
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
      }
    }
  }`
})

export const UpdateMemorandumArticleBankSlipBodyTag = "updateInvestmentPermit"
export const UpdateMemorandumArticleBankSlipBody = (input: {
  _id: string, memorandum_bank_slip_form: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      memorandum_bank_slip_form: "${input.memorandum_bank_slip_form}"
      permit_status: SENT_MEMORANDUM_BANK_SLIP
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
      }
    }
  }`
})

export const UpdateCreditServiceBankSlipBodyTag = "updateInvestmentPermit"
export const UpdateCreditServiceBankSlipBody = (input: {
  _id: string, credit_service_bank_slip_form: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      credit_service_bank_slip_form: "${input.credit_service_bank_slip_form}"
      permit_status: SENT_CREDIT_SERVICE_BANK_SLIP
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
      }
    }
  }`
})

export const UpdateServiceFeeBankSlipBodyTag = "updateInvestmentPermit"
export const UpdateServiceFeeBankSlipBody = (input: {
  _id: string, service_fee_bank_slip_form: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      permit_status: SENT_SERVICE_FEE_BANK_SLIP
      service_fee_bank_slip_form: "${input.service_fee_bank_slip_form}"
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
      }
    }
  }`
})

export const UpdateSelectedBankBodyTag = "updateInvestmentPermit"
export const UpdateSelectedBankBody = (input: {
  _id: string, selected_bank: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      selected_bank: "${input.selected_bank}"
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
        selected_bank
      }
    }
  }`
})

export interface IEditBody extends Input {
  _id: string
}
export const UpdateInvestmentPermitBodyTag = "updateInvestmentPermit"
export const UpdateInvestmentPermitBody = (input: IEditBody) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      company_name: "${input.company_name}"
        company_name_amharic: "${input.company_name_amharic}"
        trade_name: "${input.trade_name}"
        trade_name_amharic: "${input.trade_name_amharic}"
        investor_nationality: "${input.investor_nationality}"
        type_of_business: "${input.type_of_business}"
        type_of_ownership: "${input.type_of_ownership}"
        shareholders: [${input.shareholders.map((item: any) => (
          `{
            name: "${item.name}"
            nationality: "${item.nationality}"
            country_of_incorporation: "${item.country_of_incorporation}"
            address: "${item.address}"
          }`
        ))}]
        manager_full_name: "${input.manager_full_name}"
        manager_full_name_amharic: "${input.manager_full_name_amharic}"
        company_address: {
          region: "${input.company_address.region}"
          region_amharic: "${input.company_address.region_amharic}"
          zone: "${input.company_address.zone}"
          zone_amharic: "${input.company_address.zone_amharic}"
          city: "${input.company_address.city}"
          city_amharic: "${input.company_address.city_amharic}"
          sub_city: "${input.company_address.sub_city}"
          sub_city_amharic: "${input.company_address.sub_city_amharic}"
          wereda: "${input.company_address.wereda}"
          wereda_amharic: "${input.company_address.wereda_amharic}"
          house_number: "${input.company_address.house_number}"
          email: "${input.company_address.email}"
          telephone_direct: "${input.company_address.telephone_direct}"
          telephone_mobile: "${input.company_address.telephone_mobile}"
          fax: "${input.company_address.fax}"
          po_box: "${input.company_address.po_box}"
          other_address: "${input.company_address.other_address}"
        }
        representative_address: {
          region: "${input.representative_address.region}"
          zone: "${input.representative_address.zone}"
          city: "${input.representative_address.city}"
          sub_city: "${input.representative_address.sub_city}"
          house_number: "${input.representative_address.house_number}"
          email: "${input.representative_address.email}"
          telephone_direct: "${input.representative_address.telephone_direct}"
          telephone_mobile: "${input.representative_address.telephone_mobile}"
          fax: "${input.representative_address.fax}"
          po_box: "${input.representative_address.po_box}"
          other_address: "${input.representative_address.other_address}"
        }
        sector: "${input.sector}"
        investment_activity: "${input.investment_activity}"
        investment_activity_amharic: "${input.investment_activity_amharic}"
        project_description: "${input.project_description}"
        investment_address: {
          region: "${input.investment_address.region}"
          zone: "${input.investment_address.zone}"
          city: "${input.investment_address.city}"
          sub_city: "${input.investment_address.sub_city}"
          house_number: "${input.investment_address.house_number}"
          email: "${input.investment_address.email}"
          telephone_direct: "${input.investment_address.telephone_direct}"
          telephone_mobile: "${input.investment_address.telephone_mobile}"
          fax: "${input.investment_address.fax}"
          po_box: "${input.investment_address.po_box}"
          other_address: "${input.investment_address.other_address}"
        }
      land_size_sqm: ${input.land_size_sqm}
      land_acquisition_type: "${input.land_acquisition_type}"
      investment_capital_usd: ${input.investment_capital_usd}
      investment_capital_birr: ${input.investment_capital_birr}
      products: [${input.products.map(item => `{
        name: "${item.name}"
        quantity: ${item.quantity}
        local_share_market: ${item.local_share_market}
        export_share_market: ${item.export_share_market}
        unit: "${item.unit}"
      }`)}]
      raw_materials: [${input.raw_materials.map(item => `{
        name: "${item.name}"
        quantity: ${item.quantity}
        local_source: ${item.local_source}
        import_source: ${item.import_source}
        unit: "${item.unit}"
      }`)}]
      heard_from: "${input.heard_from}"
      enviromental_impact: "${input.enviromental_impact}"
      market_destination_local_amount: ${input.market_destination_local_amount}
      market_destination_export_amount: ${input.market_destination_export_amount}
      equity: ${input.equity}
      loan: ${input.loan}
      number_of_employees: ${input.number_of_employees}
      home_address: {
        country: "${input.home_address.country}"
        region: "${input.home_address.region}"
        zone: "${input.home_address.zone}"
        city: "${input.home_address.city}"
        sub_city: "${input.home_address.sub_city}"
        house_number: "${input.home_address.house_number}"
        email: "${input.home_address.email}"
        telephone_direct: "${input.home_address.telephone_direct}"
        telephone_mobile: "${input.home_address.telephone_mobile}"
        fax: "${input.home_address.fax}"
        po_box: "${input.home_address.po_box}"
        other_address: "${input.home_address.other_address}"
      }
      representative_full_name: "${input.representative_full_name}"
      investor_id: "${input.investor_id}"
      employee_information: {
        permanent_female_amount: ${input.employee_information.permanent_female_amount}
        temporary_female_amount: ${input.employee_information.temporary_female_amount}
        permanent_male_amount: ${input.employee_information.permanent_male_amount}
        temporary_male_amount: ${input.employee_information.temporary_male_amount}
      }
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        company_name_amharic
        trade_name
        trade_name_amharic
        type_of_business
        type_of_ownership
        employee_information {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        manager_full_name_amharic
        investor_nationality
        company_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        sector
        investment_activity
        investment_activity_amharic
        project_description
        investment_address {
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        land_acquisition_type
        investment_capital_usd
        investment_capital_birr
        permit_status
        permit_documents {
          power_of_attorney
          investment_visa_for_foreigners
          notarized_minutes_of_resolution
          passport
          project_proposal
          certificate_of_incorporation
          memorandum_and_articles_of_association
          business_background
        }
        products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        heard_from
        ref_number
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          country
          region
          region_amharic
          zone
          zone_amharic
          city
          city_amharic
          sub_city
          sub_city_amharic
          wereda
          wereda_amharic
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        createdAt
        updatedAt
        permit_status
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
        selected_bank
      }
    }
  }`
})