import { IInvestmentPermitExpansionInput } from "src/models/InvestmentModels/investment_permit_expansion"
import { getGQLDate } from "../Helpers/date"

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
        permit_status
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

export const CreateInvestmentPermitExpansionBodyTag = "createInvestmentPermitExpansion"
export const CreateInvestmentPermitExpansionBody = (input: IInvestmentPermitExpansionInput) => {
  console.log("input", input)
  return {
    query: `mutation {
      createInvestmentPermitExpansion(input: {
        company_name: "${input.company_name}"
        company_name_amharic: "${input.company_name_amharic}"
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
        proposed_investment_capital: ${input.proposed_investment_capital}
        raw_materials:[${input.raw_materials.map(item => `{
          name: "${item.name}"
          quantity: ${item.quantity}
          local_source: ${item.local_source}
          import_source: ${item.import_source}
          unit: "${item.unit}"
        }`)}]
        starting_date: "${getGQLDate(input.starting_date)}"
        ending_date: "${getGQLDate(input.ending_date)}"
        manager_full_name: "${input.manager_full_name}"
        company_address: {
          region: "${input.company_address.region}"
          zone: "${input.company_address.zone}"
          city: "${input.company_address.city}"
          sub_city: "${input.company_address.sub_city}"
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
        company_expansion_address: {
          region: "${input.company_expansion_address.region}"
          zone: "${input.company_expansion_address.zone}"
          city: "${input.company_expansion_address.city}"
          sub_city: "${input.company_expansion_address.sub_city}"
          house_number: "${input.company_expansion_address.house_number}"
          email: "${input.company_expansion_address.email}"
          telephone_direct: "${input.company_expansion_address.telephone_direct}"
          telephone_mobile: "${input.company_expansion_address.telephone_mobile}"
          fax: "${input.company_expansion_address.fax}"
          po_box: "${input.company_expansion_address.po_box}"
          other_address: "${input.company_expansion_address.other_address}"
        }
        current_products: [${input.current_products.map(item => `{
          name: "${item.name}"
          quantity: ${item.quantity}
          local_share_market: ${item.local_share_market}
          export_share_market: ${item.export_share_market}
          unit: "${item.unit}"
        }`)}]
        anticipated_products: [${input.anticipated_products.map(item => `{
          name: "${item.name}"
          quantity: ${item.quantity}
          local_share_market: ${item.local_share_market}
          export_share_market: ${item.export_share_market}
          unit: "${item.unit}"
          percentage_capacity_increased: ${item.percentage_capacity_increased}
          percentage_unit_increased: ${item.percentage_unit_increased}
        }`)}]
        previous_employees: {
          permanent_female_amount: ${input.previous_employees.permanent_female_amount}
          temporary_female_amount: ${input.previous_employees.temporary_female_amount}
          permanent_male_amount: ${input.previous_employees.permanent_male_amount}
          temporary_male_amount: ${input.previous_employees.temporary_male_amount}
        }
        expected_employees: {
          permanent_amount: ${input.expected_employees.permanent_amount}
          temporary_amount: ${input.expected_employees.temporary_amount}
        }
        project_impl_plan: {
          project_devt_feasiblility_study: "${getGQLDate(input.project_impl_plan.project_devt_feasiblility_study)}"
          land_acquisition: "${getGQLDate(input.project_impl_plan.land_acquisition)}"
          building_civil_work: "${getGQLDate(input.project_impl_plan.building_civil_work)}"
          public_utility_acquisition: {
            electricity: "${getGQLDate(input.project_impl_plan.public_utility_acquisition.electricity)}"
            water: "${getGQLDate(input.project_impl_plan.public_utility_acquisition.water)}"
            telecom: "${getGQLDate(input.project_impl_plan.public_utility_acquisition.telecom)}"
            other: "${getGQLDate(input.project_impl_plan.public_utility_acquisition.other)}"
          }
          machinery_procurement_purchase: "${getGQLDate(input.project_impl_plan.machinery_procurement_purchase)}"
          reaching_of_machinery_at_project_site: "${getGQLDate(input.project_impl_plan.reaching_of_machinery_at_project_site)}"
          work_permit_for_technician: "${getGQLDate(input.project_impl_plan.work_permit_for_technician)}"
          machinery_erection_installation: "${getGQLDate(input.project_impl_plan.machinery_erection_installation)}"
          preparation_of_raw_material: "${getGQLDate(input.project_impl_plan.preparation_of_raw_material)}"
          co_missing_machines_and_make_ready_for_operator: "${getGQLDate(input.project_impl_plan.co_missing_machines_and_make_ready_for_operator)}"
        }
        project_utilities: {
          size_of_land_sqm: ${input.project_utilities.size_of_land_sqm}
          electrical_power_kw: ${input.project_utilities.electrical_power_kw}
          water_m3: ${input.project_utilities.water_m3}
          telecom_services_needed: "${input.project_utilities.telecom_services_needed}"
          other_services: "${input.project_utilities.other_services}"
        }
        investment_costs: {
          land: ${input.investment_costs.land}
          building: ${input.investment_costs.building}
          working_capital: ${input.investment_costs.working_capital}
          machinery: ${input.investment_costs.machinery}
          material: ${input.investment_costs.material}
          other_costs: ${input.investment_costs.other_costs}
        }
        expansion_documents: {
          copy_of_business_license: "${input.expansion_documents.copy_of_business_license}"
          financial_statement: "${input.expansion_documents.financial_statement}"
          feasibility_study: "${input.expansion_documents.feasibility_study}"
          list_of_capital_good_and_raw_materials: "${input.expansion_documents.list_of_capital_good_and_raw_materials}"
          land_lice_agreement: "${input.expansion_documents.land_lice_agreement}"
        }
        factors_influencing_plan: "${input.factors_influencing_plan}"
        how_to_avoid_problems: "${input.how_to_avoid_problems}"
        support_needed_from_eic: "${input.support_needed_from_eic}"
        other_documents: "${input.other_documents}"
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
          investor_id
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
          factors_influencing_plan
          how_to_avoid_problems
          support_needed_from_eic
          other_documents
          createdAt
          updatedAt
        }

        ...on SystemError {
          error_code
          error_message
          error_resource
          error_source
        }
        ...on ValidationError {
          errors {
            error_code
            error_message
          }
          error_path
        }
        ...on ValidationErrors {
          validation_errors {
            errors {
              error_code
              error_message
            }
            error_path
          }
        }
      }
    }`
  }
}