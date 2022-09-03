export const UpdateStatusInvestmentPermitExpansionBodyTag = "updateInvestmentPermitExpansion"
export const UpdateStatusInvestmentPermitExpansionBody = (input: {
  _id: string, permit_status: string
}) => ({
  query: `mutation {
    updateInvestmentPermitExpansion(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IInvestmentPermitExpansionSimple {
        _id
        company_name
        company_name_amharic
        type_of_business
        type_of_ownership
        shareholders {
          name
          nationality
          country_of_incorporation
          address
        }
        manager_full_name
        company_address {
          region
          zone
          city
          sub_city
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
          zone
          city
          sub_city
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
          zone
          city
          sub_city
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        land_size_sqm
        investment_capital_usd
        investment_capital_birr
        investor_id
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

        heard_from
        enviromental_impact
        market_destination_local_amount
        market_destination_export_amount
        equity
        loan
        number_of_employees
        home_address {
          region
          zone
          city
          sub_city
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        representative_full_name
        company_expansion_address {
          region
          zone
          city
          sub_city
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        current_products {
          name
          quantity
          local_share_market
          export_share_market
          unit
        }
        anticipated_products {
          name
          quantity
          local_share_market
          export_share_market
          unit
          percentage_capacity_increased
          percentage_unit_increased
        }
        previous_employees {
          permanent_female_amount
          temporary_female_amount
          permanent_male_amount
          temporary_male_amount
        }
        expected_employees {
          permanent_amount
          temporary_amount
        }
        project_impl_plan {
          project_devt_feasiblility_study
          land_acquisition
          building_civil_work
          public_utility_acquisition {
            electricity
            water
            telecom
            other
          }
          machinery_procurement_purchase
          reaching_of_machinery_at_project_site
          work_permit_for_technician
          machinery_erection_installation
          preparation_of_raw_material
          co_missing_machines_and_make_ready_for_operator
          common_cement_of_product_service
          other
        }
        project_utilities {
          size_of_land_sqm
          electrical_power_kw
          water_m3
          telecom_services_needed
          other_services
        }
        investment_costs {
          land
          building
          working_capital
          machinery
          material
          other_costs
        }
        expansion_documents {
          copy_of_business_license
          financial_statement
          feasibility_study
          list_of_capital_good_and_raw_materials
          land_lice_agreement
        }
        raw_materials {
          name
          quantity
          local_source
          import_source
          unit
        }
        starting_date
        ending_date
        proposed_investment_capital
        factors_influencing_plan
        how_to_avoid_problems
        support_needed_from_eic
        other_documents
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchInvestmentPermitExpansionBodyTag = "fetchInvestmentPermitExpansions"
export const FetchInvestmentPermitExpansionBody = () => ({
  query: `{
    fetchInvestmentPermitExpansions {
      _id
      company_name
      company_name_amharic
      type_of_business
      type_of_ownership
      shareholders {
        name
        nationality
        country_of_incorporation
        address
      }
      manager_full_name
      company_address {
        region
        zone
        city
        sub_city
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
        zone
        city
        sub_city
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
        zone
        city
        sub_city
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      land_size_sqm
      investment_capital_usd
      investment_capital_birr
      investor_id
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

      heard_from
      enviromental_impact
      market_destination_local_amount
      market_destination_export_amount
      equity
      loan
      number_of_employees
      home_address {
        region
        zone
        city
        sub_city
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      representative_full_name
      company_expansion_address {
        region
        zone
        city
        sub_city
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      current_products {
        name
        quantity
        local_share_market
        export_share_market
        unit
      }
      anticipated_products {
        name
        quantity
        local_share_market
        export_share_market
        unit
        percentage_capacity_increased
        percentage_unit_increased
      }
      previous_employees {
        permanent_female_amount
        temporary_female_amount
        permanent_male_amount
        temporary_male_amount
      }
      expected_employees {
        permanent_amount
        temporary_amount
      }
      project_impl_plan {
        project_devt_feasiblility_study
        land_acquisition
        building_civil_work
        public_utility_acquisition {
          electricity
          water
          telecom
          other
        }
        machinery_procurement_purchase
        reaching_of_machinery_at_project_site
        work_permit_for_technician
        machinery_erection_installation
        preparation_of_raw_material
        co_missing_machines_and_make_ready_for_operator
        common_cement_of_product_service
        other
      }
      project_utilities {
        size_of_land_sqm
        electrical_power_kw
        water_m3
        telecom_services_needed
        other_services
      }
      investment_costs {
        land
        building
        working_capital
        machinery
        material
        other_costs
      }
      expansion_documents {
        copy_of_business_license
        financial_statement
        feasibility_study
        list_of_capital_good_and_raw_materials
        land_lice_agreement
      }
      raw_materials {
        name
        quantity
        local_source
        import_source
        unit
      }
      starting_date
      ending_date
      proposed_investment_capital
      factors_influencing_plan
      how_to_avoid_problems
      support_needed_from_eic
      other_documents
      createdAt
      updatedAt
    }
  }`
})