import { API as ProductAPI } from "src/store/States/Investment/Product/"
import { API as ProjectAPI } from "src/store/States/Investment/Project"
import { API as WorkPermitAPI } from "src/store/States/Investment/WorkPermit"

const createPermit = async (mainData: any, callback = (err: any, data: any) => null) => {
  ProductAPI.CreateManyProducts(mainData.addedProducts.map(item => ({
    product_name: item.product_name,
    is_service: item.is_service === "Service",
    quantity: Number(item.quantity),
    unit: item.unit,
    domestic_market_share: Number(item.domestic_market_share),
    export_market_share: Number(item.export_market_share),
  })), (err, products) => {
    if (err) throw err
    if (products.length === mainData.addedProducts.length) {
      ProjectAPI.CreateProject({
        address: {
          email: "",
          fax: "",
          house_number: "",
          sub_city: mainData.kebele,
          po_box: "",
          region: mainData.region,
          telephone_direct: "",
          telephone_mobile: "",
          city: mainData.city,
          zone: mainData.zone,
          other_address: mainData.other_address
        },
        title: mainData.title,
        project_stage: mainData.project_stage,
        environmental_impact: mainData.environmental_impact,
        project_summary: mainData.project_summary,
        category_sector: mainData.sector,
        category_sub_sector: mainData.sub_sector,
        category_activity: mainData.activity,
        category_investment_activity: mainData.investment_activity
      }, (err, data) => {
        if (err) throw err
        if (data._id) {
          WorkPermitAPI.CreateWorkPermit({
            project: data._id,
            start_date: new Date(),
            end_date: new Date(),
            previous_permit_number: mainData.previous_permit_number,
            project_input: {
              electric_power: Number(mainData.electric_power),
              water_in_sqm: Number(mainData.water_in_sqm),
              agricultural_land_in_sqm: Number(mainData.agricultural_land_in_sqm),
              land_service_in_sqm: Number(mainData.land_service_in_sqm),
              rental_land_in_sqm: Number(mainData.rental_land_in_sqm),
              other_utility: Number(mainData.other_utility),
              own_land_in_sqm: Number(mainData.own_land_in_sqm),
              land_industrial_in_sqm: Number(mainData.land_industrial_in_sqm),
              lease_land_in_sqm: Number(mainData.lease_land_in_sqm),
              remarks: String(mainData.remarks),
            },
            raw_materials: mainData.addedRawMaterials,
            project_cost: {
              building_cost_foreign: Number(mainData.building_cost_foreign),
              machine_cost_foreign: Number(mainData.machine_cost_foreign),
              initial_working_capital_cost_foreign: Number(mainData.initial_working_capital_cost_foreign),
              other_capital_cost_foreign: Number(mainData.other_capital_cost_foreign),
              transport_cost_foreign: Number(mainData.transport_cost_foreign),
              office_equipment_cost_foreign: Number(mainData.office_equipment_cost_foreign),
              total_cost_foreign: Number(mainData.total_cost_foreign),
              building_cost_birr: Number(mainData.building_cost_birr),
              machine_cost_birr: Number(mainData.machine_cost_birr),
              office_equipment_cost_birr: Number(mainData.office_equipment_cost_birr),
              transport_cost_birr: Number(mainData.transport_cost_birr),
              other_capital_cost_birr: Number(mainData.other_capital_cost_birr),
              initial_working_capital_cost_birr: Number(mainData.initial_working_capital_cost_birr),
              total_cost_birr: Number(mainData.total_cost_birr),
              equity_finance: Number(mainData.equity_finance),
              loan_finance: Number(mainData.loan_finance),
              other_source_finance: Number(mainData.other_source_finance),
              other_source_description: String(mainData.other_source_description),
              currency_type: mainData.currency_type,
              actual_cost_of_foreign: Number(mainData.actual_cost_of_foreign),
              etb_exchange_rate: Number(mainData.etb_exchange_rate),
              remarks: mainData.remarks
            },
            permanent_employee_count: {
              local_female_amount: Number(mainData.permanent_local_female_amount),
              foreign_female_amount: Number(mainData.permanent_foreign_female_amount),
              local_male_amount: Number(mainData.permanent_local_male_amount),
              foreign_male_amount: Number(mainData.permanent_foreign_male_amount),
            },
            temporary_employee_count: {
              local_female_amount: Number(mainData.temporary_local_female_amount),
              foreign_female_amount: Number(mainData.temporary_foreign_female_amount),
              local_male_amount: Number(mainData.temporary_local_male_amount),
              foreign_male_amount: Number(mainData.temporary_foreign_male_amount),
            },
            project_shares: [{
              share_holder_name: mainData.share_holder_name,
              nationality: mainData.nationality,
              quantity: Number(mainData.quantity),
              share_percent: Number(mainData.share_percent),
              description: mainData.description,
            }],
            products: products.map(item => String(item._id)),
            permit_documents: {
              renewed_id_image: "renewed_id_image",
              passport_image: "passport_image",
            },
            selected_manager: mainData.selected_manager
          }, (err, data) => {
            if (err) throw err
            callback(null, data)
          })
        }
      })
    }
  })
}

/**
 activity: "61fe31da2ca0d7fae9f38b80"

{"query":"mutation {\n    createWorkPermit(input: {\n      project: \"62021bba0d436ebbb7c90bd5\"\n      start_date: \"2022-02-02T11:49:19.266Z\"\n      end_date: \"2022-02-02T11:49:19.266Z\"\n      previous_permit_number: \"403\"\n      project_input: {\n        electric_power: 38\n        water_in_sqm: 29\n        agricultural_land_in_sqm: 78\n        land_service_in_sqm: 58\n        rental_land_in_sqm: 45\n        other_utility: 10\n        own_land_in_sqm: 25\n        land_industrial_in_sqm: 75\n        lease_land_in_sqm: 79\n        remarks: \"Totam est adipisicin\"\n      }\n      raw_materials: [{\n        raw_material_name: \"Brady Grant\"\n        is_local: false\n        remarks: \"Totam est adipisicin\"\n      }]\n      project_cost: {\n        building_cost_foreign: 80\n        machine_cost_foreign: 64\n        initial_working_capital_cost_foreign: 63\n        other_capital_cost_foreign: 56\n        transport_cost_foreign: 89\n        office_equipment_cost_foreign: 71\n        total_cost_foreign: 33\n        building_cost_birr: 44\n        machine_cost_birr: 6\n        office_equipment_cost_birr: 3\n        transport_cost_birr: 97\n        other_capital_cost_birr: 55\n        initial_working_capital_cost_birr: 73\n        toal_cost_birr: 63\n        equity_finance: 20\n        loan_finance: 1\n        other_source_finance: 47\n        other_source_description: \"Qui quaerat aliqua \"\n        currency_type: DOLLAR\n        actual_cost_of_foreign: 16\n        etb_exchange_rate: 81\n        remarks: \"Totam est adipisicin\"\n      }\n      permanent_employee_count: {\n        local_female_amount: 98\n        foreign_female_amount: 78\n        local_male_amount: 36\n        foreign_male_amount: 72\n      }\n      temporary_employee_count: {\n        local_female_amount: 93\n        foreign_female_amount: 63\n        local_male_amount: 42\n        foreign_male_amount: 78\n      }\n      project_shares: [{\n        share_holder_name: \"undefined\"\n        nationality: \"Kenya\"\n        quantity: 988\n        share_percent: 56\n        description: \"Recusandae Cupidita\"\n      }]\n      products: [\"62021bba0d436ebbb7c90bcf\"]\n      permit_documents: {\n        renewed_id_image: \"renewed_id_image\"\n        passport_image: \"passport_image\"\n      }\n      selected_manager: \"undefined\"\n    }) {\n      ...on IWorkPermitSimple {\n        _id\n        project\n        start_date\n        end_date\n        previous_permit_number\n        project_input {\n          electric_power\n          water_in_sqm\n          agricultural_land_in_sqm\n          land_service_in_sqm\n          rental_land_in_sqm\n          other_utility\n          own_land_in_sqm\n          land_industrial_in_sqm\n          lease_land_in_sqm\n          remarks\n        }\n        raw_materials {\n          raw_material_name\n          is_local\n          remarks\n        }\n        project_cost {\n          building_cost_foreign\n          machine_cost_foreign\n          initial_working_capital_cost_foreign\n          other_capital_cost_foreign\n          transport_cost_foreign\n          office_equipment_cost_foreign\n          total_cost_foreign\n          building_cost_birr\n          machine_cost_birr\n          office_equipment_cost_birr\n          transport_cost_birr\n          other_capital_cost_birr\n          initial_working_capital_cost_birr\n          toal_cost_birr\n          equity_finance\n          loan_finance\n          other_source_finance\n          other_source_description\n          currency_type\n          actual_cost_of_foreign\n          etb_exchange_rate\n          remarks\n        }\n        permanent_employee_count {\n          local_female_amount\n          foreign_female_amount\n          local_male_amount\n          foreign_male_amount\n        }\n        temporary_employee_count {\n          local_female_amount\n          foreign_female_amount\n          local_male_amount\n          foreign_male_amount\n        }\n        project_shares {\n          share_holder_name\n          nationality\n          quantity\n          share_percent\n          description\n        }\n        products\n        permit_documents {\n          renewed_id_image\n          passport_image\n        }\n        selected_manager\n        createdAt\n        updatedAt\n      }\n\n      ...on ValidationError {\n          errors {\n              error_code\n              error_message\n          }\n          error_path\n      }\n\n      ...on SystemError {\n          error_code\n          error_message\n      }\n\n      ...on ValidationErrors {\n          validation_errors {\n              error_path\n              errors {\n                  error_code\n                  error_message\n              }\n          }\n      }\n    }\n  }"}addedProducts: Array [ {…} ]
​
agricultural_land_in_sqm: "44"
​
description: "Qui aliquam vel exer"
​
electric_power: "93"
​
end_date: "2005-11-08"
​
environmental_impact: "Ea maiores atque qui"
​
investment_activity: "61fe31e52ca0d7fae9f38b85"
​
sub_city: "Est sed fugit omnis"
​
land_industrial_in_sqm: "52"
​
land_service_in_sqm: "41"
​
lease_land_in_sqm: "74"
​
local: "local"
​
nationality: "Ethiopia"
​
operation_date: "2015-09-23"
​
other_utility: "14"
​
own_land_in_sqm: "72"
​
previous_permit_number: "56"
​
project_stage: "INITIAL"
​
project_summary: "Animi nemo voluptat"
​
quantity: "462"
​
raw_material_name: "Constance Elliott"
​
region: "Pre Implementation"
​
remarks: "Adipisicing autem es"
​
rental_land_in_sqm: "56"
​
sector: "61fe31ba2ca0d7fae9f38b6f"
​
share_percent: "80"
​
specific_area_name: "Anastasia Stafford"
​
start_date: "2008-12-21"
​
sub_sector: "61fe31cb2ca0d7fae9f38b76"
​
title: "Corrupti nulla ea r"
​
water_in_sqm: "46"
​
city: "Sit et porro aute si"
​
zone: "Pre Implementation"
 */


export default createPermit