import { IWorkPermitEdit, IWorkPermitInput } from "src/models/InvestmentModels/work_permit"
import { getGQLDate } from "src/utils/date"

export const FetchWorkPermitsBodyTag = "fetchWorkPermits"
export const FetchWorkPermitsBody = () => ({
  query: `{
    fetchWorkPermits {
      _id
      project
      start_date
      end_date
      previous_permit_number
      project_input {
        electric_power
        water_in_sqm
        agricultural_land_in_sqm
        land_service_in_sqm
        rental_land_in_sqm
        other_utility
        own_land_in_sqm
        land_industrial_in_sqm
        lease_land_in_sqm
        remarks
      }
      raw_materials {
        raw_material_name
        is_local
        remarks
      }
      project_cost {
        building_cost_foreign
        machine_cost_foreign
        initial_working_capital_cost_foreign
        other_capital_cost_foreign
        transport_cost_foreign
        office_equipment_cost_foreign
        total_cost_foreign
        building_cost_birr
        machine_cost_birr
        office_equipment_cost_birr
        transport_cost_birr
        other_capital_cost_birr
        initial_working_capital_cost_birr
        toal_cost_birr
        equity_finance
        loan_finance
        other_source_finance
        other_source_description
        currency_type
        actual_cost_of_foreign
        etb_exchange_rate
        remarks
      }
      permanent_employee_count {
        local_female_amount
        foreign_female_amount
        local_male_amount
        foreign_male_amount
      }
      temporary_employee_count {
        local_female_amount
        foreign_female_amount
        local_male_amount
        foreign_male_amount
      }
      project_shares {
        share_holder_name
        nationality
        quantity
        share_percent
        description
      }
      products
      permit_documents {
        renewed_id_image
        passport_image
      }
      selected_manager
      createdAt
      updatedAt
    }
  }`
})

export const CreateWorkPermitBodyTag = "createWorkPermit"
export const CreateWorkPermitBody = (input: IWorkPermitInput) => ({
  query: `mutation {
    createWorkPermit(input: {
      project: "${input.project}"
      start_date: "${getGQLDate(input.start_date, false)}"
      end_date: "${getGQLDate(input.end_date, true)}"
      previous_permit_number: "${input.previous_permit_number}"
      project_input: {
        electric_power: ${input.project_input.electric_power}
        water_in_sqm: ${input.project_input.water_in_sqm}
        agricultural_land_in_sqm: ${input.project_input.agricultural_land_in_sqm}
        land_service_in_sqm: ${input.project_input.land_service_in_sqm}
        rental_land_in_sqm: ${input.project_input.rental_land_in_sqm}
        other_utility: ${input.project_input.other_utility}
        own_land_in_sqm: ${input.project_input.own_land_in_sqm}
        land_industrial_in_sqm: ${input.project_input.land_industrial_in_sqm}
        lease_land_in_sqm: ${input.project_input.lease_land_in_sqm}
        remarks: "${input.project_input.remarks}"
      }
      raw_materials: [${input.raw_materials.map(item => `{
        raw_material_name: "${item.raw_material_name}"
        is_local: ${item.is_local === "local"}
        remarks: "${item.remarks}"
      }`)}]
      project_cost: {
        building_cost_foreign: ${input.project_cost.building_cost_foreign}
        machine_cost_foreign: ${input.project_cost.machine_cost_foreign}
        initial_working_capital_cost_foreign: ${input.project_cost.initial_working_capital_cost_foreign}
        other_capital_cost_foreign: ${input.project_cost.other_capital_cost_foreign}
        transport_cost_foreign: ${input.project_cost.transport_cost_foreign}
        office_equipment_cost_foreign: ${input.project_cost.office_equipment_cost_foreign}
        total_cost_foreign: ${input.project_cost.total_cost_foreign}
        building_cost_birr: ${input.project_cost.building_cost_birr}
        machine_cost_birr: ${input.project_cost.machine_cost_birr}
        office_equipment_cost_birr: ${input.project_cost.office_equipment_cost_birr}
        transport_cost_birr: ${input.project_cost.transport_cost_birr}
        other_capital_cost_birr: ${input.project_cost.other_capital_cost_birr}
        initial_working_capital_cost_birr: ${input.project_cost.initial_working_capital_cost_birr}
        toal_cost_birr: ${input.project_cost.total_cost_birr}
        equity_finance: ${input.project_cost.equity_finance}
        loan_finance: ${input.project_cost.loan_finance}
        other_source_finance: ${input.project_cost.other_source_finance}
        other_source_description: "${input.project_cost.other_source_description}"
        currency_type: ${input.project_cost.currency_type}
        actual_cost_of_foreign: ${input.project_cost.actual_cost_of_foreign}
        etb_exchange_rate: ${input.project_cost.etb_exchange_rate}
        remarks: "${input.project_cost.remarks}"
      }
      permanent_employee_count: {
        local_female_amount: ${input.permanent_employee_count.local_female_amount}
        foreign_female_amount: ${input.permanent_employee_count.foreign_female_amount}
        local_male_amount: ${input.permanent_employee_count.local_male_amount}
        foreign_male_amount: ${input.permanent_employee_count.foreign_male_amount}
      }
      temporary_employee_count: {
        local_female_amount: ${input.temporary_employee_count.local_female_amount}
        foreign_female_amount: ${input.temporary_employee_count.foreign_female_amount}
        local_male_amount: ${input.temporary_employee_count.local_male_amount}
        foreign_male_amount: ${input.temporary_employee_count.foreign_male_amount}
      }
      project_shares: [${input.project_shares.map(item => `{
        share_holder_name: "${item.share_holder_name}"
        nationality: "${item.nationality}"
        quantity: ${item.quantity}
        share_percent: ${item.share_percent}
        description: "${item.description}"
      }`)}]
      products: [${input.products.map(item => `"${item}"`)}]
      permit_documents: {
        renewed_id_image: "renewed_id_image"
        passport_image: "passport_image"
      }
      selected_manager: "${input.selected_manager}"
    }) {
      ...on IWorkPermitSimple {
        _id
        project
        start_date
        end_date
        previous_permit_number
        project_input {
          electric_power
          water_in_sqm
          agricultural_land_in_sqm
          land_service_in_sqm
          rental_land_in_sqm
          other_utility
          own_land_in_sqm
          land_industrial_in_sqm
          lease_land_in_sqm
          remarks
        }
        raw_materials {
          raw_material_name
          is_local
          remarks
        }
        project_cost {
          building_cost_foreign
          machine_cost_foreign
          initial_working_capital_cost_foreign
          other_capital_cost_foreign
          transport_cost_foreign
          office_equipment_cost_foreign
          total_cost_foreign
          building_cost_birr
          machine_cost_birr
          office_equipment_cost_birr
          transport_cost_birr
          other_capital_cost_birr
          initial_working_capital_cost_birr
          toal_cost_birr
          equity_finance
          loan_finance
          other_source_finance
          other_source_description
          currency_type
          actual_cost_of_foreign
          etb_exchange_rate
          remarks
        }
        permanent_employee_count {
          local_female_amount
          foreign_female_amount
          local_male_amount
          foreign_male_amount
        }
        temporary_employee_count {
          local_female_amount
          foreign_female_amount
          local_male_amount
          foreign_male_amount
        }
        project_shares {
          share_holder_name
          nationality
          quantity
          share_percent
          description
        }
        products
        permit_documents {
          renewed_id_image
          passport_image
        }
        selected_manager
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

export const RenewWorkPermitBodyTag = "updateWorkPermit"
export const RenewWorkPermitBody = (input: { _id: string; end_date: Date }) => ({
  query: `mutation {
    updateWorkPermit(input: {
        _id: "${input._id}"
        end_date: "${input.end_date}"
    }) {
        ...on IWorkPermitSimple {
            _id
            project
            start_date
            end_date
            previous_permit_number
            project_input {
                electric_power
                water_in_sqm
                agricultural_land_in_sqm
                land_service_in_sqm
                rental_land_in_sqm
                other_utility
                own_land_in_sqm
                land_industrial_in_sqm
                lease_land_in_sqm
                remarks
            }
            raw_materials {
                raw_material_name
                is_local
                remarks
            }
            project_cost {
                building_cost_foreign
                machine_cost_foreign
                initial_working_capital_cost_foreign
                other_capital_cost_foreign
                transport_cost_foreign
                office_equipment_cost_foreign
                total_cost_foreign
                building_cost_birr
                machine_cost_birr
                office_equipment_cost_birr
                transport_cost_birr
                other_capital_cost_birr
                initial_working_capital_cost_birr
                toal_cost_birr
                equity_finance
                loan_finance
                other_source_finance
                other_source_description
                currency_type
                actual_cost_of_foreign
                etb_exchange_rate
                remarks
            }
            permanent_employee_count {
                local_female_amount
                foreign_female_amount
                local_male_amount
                foreign_male_amount
            }
            temporary_employee_count {
                local_female_amount
                foreign_female_amount
                local_male_amount
                foreign_male_amount
            }
            project_shares {
                share_holder_name
                nationality
                quantity
                share_percent
                description
            }
            products
            permit_documents {
                renewed_id_image
                passport_image
            }
            selected_manager
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

export const UpdateWorkPermitBodyTag = "updateWorkPermit"
export const UpdateWorkPermitBody = (input: IWorkPermitEdit) => ({
  query: `mutation {
    updateWorkPermit(input: {
        _id: "61fa7beea17f4520edcb6bdc"
        project: "61fa6fc1d8894aaa09e33889"
        start_date: "2022-02-02T11:49:19.266Z"
        end_date: "2022-02-02T11:49:19.266Z"
        previous_permit_number: "previous_permit_numberzzzz"
        project_input: {
            electric_power: 20.4
            water_in_sqm: 20.4
            agricultural_land_in_sqm: 20.4
            land_service_in_sqm: 20.4
            rental_land_in_sqm: 20.4
            other_utility: 20.4
            own_land_in_sqm: 20.4
            land_industrial_in_sqm: 20.4
            lease_land_in_sqm: 20.4
            remarks: "remarks"
        }
        raw_materials: [{
            raw_material_name: "raw_material_name"
            is_local: false
            remarks: "remarks"
        }]
        project_cost: {
            building_cost_foreign: 24.5
            machine_cost_foreign: 24.5
            initial_working_capital_cost_foreign: 24.5
            other_capital_cost_foreign: 24.5
            transport_cost_foreign: 24.5
            office_equipment_cost_foreign: 24.5
            total_cost_foreign: 24.5
            building_cost_birr: 24.5
            machine_cost_birr: 24.5
            office_equipment_cost_birr: 24.5
            transport_cost_birr: 24.5
            other_capital_cost_birr: 24.5
            initial_working_capital_cost_birr: 24.5
            toal_cost_birr: 24.5
            equity_finance: 24.5
            loan_finance: 24.5
            other_source_finance: 24.5
            other_source_description: "other_source_description"
            currency_type: BIRR
            actual_cost_of_foreign: 24.5
            etb_exchange_rate: 24.5
            remarks: "remarks"
        }
        permanent_employee_count: {
            local_female_amount: 28
            foreign_female_amount: 28
            local_male_amount: 28
            foreign_male_amount: 28
        }
        temporary_employee_count: {
            local_female_amount: 28
            foreign_female_amount: 28
            local_male_amount: 28
            foreign_male_amount: 28
        }
        project_shares: [{
            share_holder_name: "share_holder_name"
            nationality: "Ethiopian"
            quantity: 20
            share_percent: 40.2
            description: "description"
        }]
        products: ["61fa6fc1d8894aaa09e3388b", "61fa6fc1d8894aaa09e338b5"]
        permit_documents: {
            renewed_id_image: "renewed_id_image"
            passport_image: "passport_image"
        }
        selected_manager: "61fa6fc1d8894aaa09e33869"
    }) {
        ...on IWorkPermitSimple {
            _id
            project
            start_date
            end_date
            previous_permit_number
            project_input {
                electric_power
                water_in_sqm
                agricultural_land_in_sqm
                land_service_in_sqm
                rental_land_in_sqm
                other_utility
                own_land_in_sqm
                land_industrial_in_sqm
                lease_land_in_sqm
                remarks
            }
            raw_materials {
                raw_material_name
                is_local
                remarks
            }
            project_cost {
                building_cost_foreign
                machine_cost_foreign
                initial_working_capital_cost_foreign
                other_capital_cost_foreign
                transport_cost_foreign
                office_equipment_cost_foreign
                total_cost_foreign
                building_cost_birr
                machine_cost_birr
                office_equipment_cost_birr
                transport_cost_birr
                other_capital_cost_birr
                initial_working_capital_cost_birr
                toal_cost_birr
                equity_finance
                loan_finance
                other_source_finance
                other_source_description
                currency_type
                actual_cost_of_foreign
                etb_exchange_rate
                remarks
            }
            permanent_employee_count {
                local_female_amount
                foreign_female_amount
                local_male_amount
                foreign_male_amount
            }
            temporary_employee_count {
                local_female_amount
                foreign_female_amount
                local_male_amount
                foreign_male_amount
            }
            project_shares {
                share_holder_name
                nationality
                quantity
                share_percent
                description
            }
            products
            permit_documents {
                renewed_id_image
                passport_image
            }
            selected_manager
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

export const RemoveWorkPermitBodyTag = "removeOneWorkPermit"
export const RemoveWorkPermitBody = (_id: string) => ({
  query: `mutation {
    removeOneWorkPermit(_id: "${_id}") {
      _id
      project
      start_date
      end_date
      previous_permit_number
      project_input {
          electric_power
          water_in_sqm
          agricultural_land_in_sqm
          land_service_in_sqm
          rental_land_in_sqm
          other_utility
          own_land_in_sqm
          land_industrial_in_sqm
          lease_land_in_sqm
          remarks
      }
      raw_materials {
          raw_material_name
          is_local
          remarks
      }
      project_cost {
          building_cost_foreign
          machine_cost_foreign
          initial_working_capital_cost_foreign
          other_capital_cost_foreign
          transport_cost_foreign
          office_equipment_cost_foreign
          total_cost_foreign
          building_cost_birr
          machine_cost_birr
          office_equipment_cost_birr
          transport_cost_birr
          other_capital_cost_birr
          initial_working_capital_cost_birr
          toal_cost_birr
          equity_finance
          loan_finance
          other_source_finance
          other_source_description
          currency_type
          actual_cost_of_foreign
          etb_exchange_rate
          remarks
      }
      permanent_employee_count {
          local_female_amount
          foreign_female_amount
          local_male_amount
          foreign_male_amount
      }
      temporary_employee_count {
          local_female_amount
          foreign_female_amount
          local_male_amount
          foreign_male_amount
      }
      project_shares {
          share_holder_name
          nationality
          quantity
          share_percent
          description
      }
      products
      permit_documents {
          renewed_id_image
          passport_image
      }
      selected_manager
      createdAt
      updatedAt
    }
  }`
})