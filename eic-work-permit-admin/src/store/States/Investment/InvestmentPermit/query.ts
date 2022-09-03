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
        edited_trade_name
        edited_trade_name_amharic
        trade_name
        trade_name_amharic
        investor_nationality
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
        registration_number
        tin_number
        investment_capital_usd
        investment_capital_birr
        company_registration_form
        bank_slip_form
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
      company_name_amharic
      edited_name
      edited_name_amharic
      edited_trade_name
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
      company_registration_form
      bank_slip_form
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
  edited_trade_name: string, edited_trade_name_amharic: string,
  registration_number: string, tin_number: string
}) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      company_name: "${input.edited_name}"
      company_name_amharic: "${input.edited_name_amharic}"
      trade_name: "${input.edited_trade_name}"
      trade_name_amharic: "${input.edited_trade_name_amharic}"
      permit_status: ${input.permit_status}
      registration_number: "${input.registration_number}"
      tin_number: "${input.tin_number}"
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
      company_registration_form
      bank_slip_form
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
      bank_slip_form
      createdAt
      updatedAt
    }
  }`
})