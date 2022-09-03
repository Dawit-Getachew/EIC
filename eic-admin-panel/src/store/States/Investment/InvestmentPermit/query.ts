import { IInvestmentPermitInput as Input } from "./types"

export const UpdateInvestmentPermitBodyTag = "updateInvestmentPermit"
export const UpdateInvestmentPermitBody = (input: {
  _id: string, company_name: string, company_name_amharic: string, trade_name: string,
  edited_name: string, edited_name_amharic: string, edited_trade_name: string, edited_trade_name_amharic: string,
  trade_name_amharic: string, type_of_business: string, type_of_ownership: string,
  shareholders: [{ name: string, nationality: string, country_of_incorporation: string, address: string }],
  manager_full_name: string, manager_full_name_amharic: string, investment_capital_usd: number, investment_capital_birr: number
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      company_name: "${input.company_name}"
      company_name_amharic: "${input.company_name_amharic}"
      edited_name: "${input.edited_name}"
      edited_name_amharic: "${input.edited_name_amharic}"
      edited_trade_name: "${input.edited_trade_name}"
      edited_trade_name_amharic: "${input.edited_trade_name_amharic}"
      trade_name: "${input.trade_name}"
      trade_name_amharic: "${input.trade_name_amharic}"
      type_of_business: "${input.type_of_business}"
      type_of_ownership: "${input.type_of_ownership}"
      shareholders: [${input.shareholders.map(item => `{
        name: "${item.name}"
        nationality: "${item.nationality}"
        country_of_incorporation: "${item.country_of_incorporation}"
        address: "${item.address}"
      }`)}]
      manager_full_name: "${input.manager_full_name}"
      manager_full_name_amharic: "${input.manager_full_name_amharic}"
      investment_capital_usd: ${input.investment_capital_usd}
      investment_capital_birr: ${input.investment_capital_birr}
    }) {
      ...on IInvestmentPermitSimple {
        _id
        permit_status
        company_name
        company_name_amharic
        edited_name
        edited_name_amharic
        memorandum_of_association
        edited_trade_name
        edited_trade_name_amharic
        trade_name
        trade_name_amharic
        investor_nationality
        type_of_business
        type_of_ownership
        service_fee_bank_slip_form
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
        registration_number
        tin_number
        investment_capital_usd
        investment_capital_birr
        company_registration_form
        company_registration_bank_slip_form
        memorandum_bank_slip_form
        credit_service_bank_slip_form
        createdAt
        updatedAt
      }
    }
  }`
})

export const UpdateStatusInvestmentPermitBodyTag = "updateInvestmentPermit"
export const UpdateStatusInvestmentPermitBody = (input: {
  _id: string, permit_status: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IInvestmentPermitSimple {
        _id
      company_name
      service_fee_bank_slip_form
      company_name_amharic
      edited_name
      edited_name_amharic
      edited_trade_name
      memorandum_of_association
      edited_trade_name_amharic
      investor_id
      trade_name
      registration_number
      tin_number
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
      memorandum_bank_slip_form
      company_registration_form
      company_registration_bank_slip_form
      credit_service_bank_slip_form
      createdAt
      updatedAt
      }
    }
  }`
})

export const UpdateTinRegNumberBodyTag = "updateInvestmentPermit"
export const UpdateTinRegNumberBody = (input: {
  _id: string, registration_number: string, tin_number: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      registration_number: "${input.registration_number}"
      tin_number: "${input.tin_number}"
      permit_status: REGISTERED_TIN_NUMBER
    }) {
      ...on IInvestmentPermitSimple {
        _id
      company_name
      service_fee_bank_slip_form
      company_name_amharic
      edited_name
      edited_name_amharic
      edited_trade_name
      memorandum_of_association
      edited_trade_name_amharic
      investor_id
      trade_name
      registration_number
      tin_number
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
      memorandum_bank_slip_form
      company_registration_form
      company_registration_bank_slip_form
      credit_service_bank_slip_form
      createdAt
      updatedAt
      }
    }
  }`
})

export const UpdateCompanyNameInvestmentPermitBodyTag = "updateInvestmentPermit"
export const UpdateCompanyNameInvestmentPermitBody = (input: {
  _id: string, permit_status: string,
  edited_name: string, edited_name_amharic: string,
  edited_trade_name: string, edited_trade_name_amharic: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      company_name: "${input.edited_name}"
      company_name_amharic: "${input.edited_name_amharic}"
      trade_name: "${input.edited_trade_name}"
      trade_name_amharic: "${input.edited_trade_name_amharic}"
      permit_status: ${input.permit_status}
    }) {
      ...on IInvestmentPermitSimple {
          _id
        company_name
        company_name_amharic
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        investor_id
        trade_name
        registration_number
        tin_number
        memorandum_of_association
        trade_name_amharic
        type_of_business
        type_of_ownership
        service_fee_bank_slip_form
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
        memorandum_bank_slip_form
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
        company_registration_form
        company_registration_bank_slip_form
        credit_service_bank_slip_form
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchInvestmentPemitBodyTag = "fetchInvestmentPermits"
export const FetchInvestmentPemitBody = () => ({
  query: `{
    fetchInvestmentPermits {
      _id
      company_name
      company_name_amharic
      investor_id
      edited_name
      edited_name_amharic
      edited_trade_name
      edited_trade_name_amharic
      trade_name
      trade_name_amharic
      registration_number
      tin_number
      memorandum_of_association
      memorandum_bank_slip_form
      type_of_business
      type_of_ownership
      service_fee_bank_slip_form
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
      company_registration_form
      company_registration_bank_slip_form
      credit_service_bank_slip_form
      selected_bank
      createdAt
      updatedAt
    }
  }`
})

export interface IEditBody extends Input {
  _id: string
}
export const _UpdateInvestmentPermitBodyTag = "updateInvestmentPermit"
export const _UpdateInvestmentPermitBody = (input: IEditBody) => ({
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
          region_amharic: ""
          zone: "${input.company_address.zone}"
          zone_amharic: ""
          city: "${input.company_address.city}"
          city_amharic: ""
          sub_city: "${input.company_address.sub_city}"
          sub_city_amharic: ""
          wereda: ""
          wereda_amharic: ""
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
        country: ""
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

export const FetchUnAssignedInvestmentPermitsBodyTag = "fetchUnAssignedInvestmentPermits"
export const FetchUnAssignedInvestmentPermitsBody = () => ({
  query: `{
    fetchUnAssignedInvestmentPermits {
      _id
      company_name
      company_name_amharic
      investor_id
      edited_name
      edited_name_amharic
      edited_trade_name
      edited_trade_name_amharic
      trade_name
      trade_name_amharic
      registration_number
      tin_number
      memorandum_of_association
      memorandum_bank_slip_form
      type_of_business
      type_of_ownership
      service_fee_bank_slip_form
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
      company_registration_form
      company_registration_bank_slip_form
      credit_service_bank_slip_form
      selected_bank
      isAssigned
      assignedTo {
        case_worker
        team_leader
        director
      }
      createdAt
      updatedAt
    }
  }`
})

export const FetchAssignedInvestmentPermitsBodyTag = "fetchAssignedInvestmentPermits"
export const FetchAssignedInvestmentPermitsBody = () => ({
  query: `{
    fetchAssignedInvestmentPermits {
      _id
      company_name
      company_name_amharic
      investor_id
      edited_name
      edited_name_amharic
      edited_trade_name
      edited_trade_name_amharic
      trade_name
      trade_name_amharic
      registration_number
      tin_number
      memorandum_of_association
      memorandum_bank_slip_form
      type_of_business
      type_of_ownership
      service_fee_bank_slip_form
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
      company_registration_form
      company_registration_bank_slip_form
      credit_service_bank_slip_form
      selected_bank
      isAssigned
      assignedTo {
        case_worker
        team_leader
        director
      }
      createdAt
      updatedAt
    }
  }`
})

export interface InputAssignEmployeeToInvestmentPermitBody {
  _id: string;
  case_worker: string;
  team_leader: string;
  director: string;
}
export const AssignEmployeeToInvestmentPermitBodyTag = "assignInvestmentPermitToAdmins"
export const AssignEmployeeToInvestmentPermitBody = (input: InputAssignEmployeeToInvestmentPermitBody) => ({
  query: `mutation {
    assignInvestmentPermitToAdmins(input: {
      _id: "${input._id}"
      assignedTo: {
        case_worker: "${input.case_worker}"
        team_leader: "${input.team_leader}"
        director: "${input.director}"
      }
      isAssigned: true
    }) {
      ...on IInvestmentPermitSimple {
        _id
        company_name
        company_name_amharic
        investor_id
        edited_name
        edited_name_amharic
        edited_trade_name
        edited_trade_name_amharic
        trade_name
        trade_name_amharic
        registration_number
        tin_number
        memorandum_of_association
        memorandum_bank_slip_form
        type_of_business
        type_of_ownership
        service_fee_bank_slip_form
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
        company_registration_form
        company_registration_bank_slip_form
        credit_service_bank_slip_form
        selected_bank
        isAssigned
        assignedTo {
          case_worker
          team_leader
          director
        }
        createdAt
        updatedAt
      }
      
      ...on SystemError {
        error_code
        error_message
        error_resource
      }
      
      ...on ValidationError {
        errors {
          error_code
          error_message
        }
      }
      
      ...on ValidationErrors {
        validation_errors {
          errors {
            error_code
            error_message
          }
        }
      }
    }
  }`
})

export interface InputFetchAdminInvestmentPermitsBody {
  _id: string;
  role: string;
}
export const FetchAdminInvestmentPermitsBodyTag = "fetchAdminInvestmentPermits"
export const FetchAdminInvestmentPermitsBody = (input: InputFetchAdminInvestmentPermitsBody) => ({
  query: `{
    fetchAdminInvestmentPermits(input: {
      _id: "${input._id}"
      role: ${input.role}
    }) {
      _id
      company_name
      company_name_amharic
      investor_id
      edited_name
      edited_name_amharic
      edited_trade_name
      edited_trade_name_amharic
      trade_name
      trade_name_amharic
      registration_number
      tin_number
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
      company_registration_form
      createdAt
      updatedAt
      isAssigned
      assignedTo {
        case_worker
        team_leader
        director
      }
    }
  }`
})