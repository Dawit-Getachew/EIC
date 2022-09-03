export const UpdateStatusInvestmentPermitAmmendmentBodyTag = "updateInvestmentPermitAmmendment"
export const UpdateStatusInvestmentPermitAmmendmentBody = (input: {
  _id: string, permit_status: string
}) => ({
  query: `mutation {
    updateInvestmentPermitAmmendment(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IInvestmentPermitAmmendmentSimple {
        _id
        investment_id
        service_id
        permit_status
        company_name
        company_name_amharic
        trade_name
        trade_name_amharic
        investor_nationality
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
        investment_capital_usd
        investment_capital_birr
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchInvestmentPermitAmmendmentBodyTag = "fetchInvestmentPermitAmmendments"
export const FetchInvestmentPermitAmmendmentBody = () => ({
  query: `{
    fetchInvestmentPermitAmmendments {
      _id
      investment_id
      service_id
      permit_status
      company_name
      company_name_amharic
      trade_name
      trade_name_amharic
      investor_nationality
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
      investment_capital_usd
      investment_capital_birr
      createdAt
      updatedAt
    }
  }`
})

export const CreateInvestmentPermitAmmendmentBodyTag = "createInvestmentPermitAmmendment"
export const CreateInvestmentPermitAmmendmentBody = (input: {
  investment_id: string, service_id: string, company_name: string,
  company_name_amharic: string, trade_name: string, trade_name_amharic: string,
  investor_nationality: string, type_of_business: string, type_of_ownership: string,
  shareholders: [{ name: string, nationality: string, country_of_incorporation: string, address: string }],
  manager_full_name: string, manager_full_name_amharic: string, investment_capital_usd: number, investment_capital_birr: number
}) => ({
  query: `mutation {
    createInvestmentPermitAmmendment(input: {
      service_id: "${input.service_id}"
      investment_id: "${input.investment_id}"
      company_name: "${input.company_name}",
      company_name_amharic: "${input.company_name_amharic}"
      trade_name: "${input.trade_name}",
      trade_name_amharic: "${input.trade_name_amharic}"
      investor_nationality: "${input.investor_nationality}"
      type_of_business: "${input.type_of_business}",
      type_of_ownership: "${input.type_of_ownership}",
      shareholders: [${input.shareholders.map(item => `{
        name: "${item.name}"
        nationality: "${item.nationality}"
        country_of_incorporation: "${item.country_of_incorporation}"
        address: "${item.address}"
      }`)}]
      manager_full_name: "${input.manager_full_name}"
      manager_full_name_amharic: "${input.manager_full_name_amharic}"
      investment_capital_usd: ${input.investment_capital_usd}
      investment_capital_birr: ${input.investment_capital_usd}
    }) {
      ...on IInvestmentPermitAmmendmentSimple {
        _id
        investment_id
        service_id
        permit_status
        company_name
        company_name_amharic
        trade_name
        trade_name_amharic
        investor_nationality
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
        investment_capital_usd
        investment_capital_birr
        createdAt
        updatedAt
      }
    }
  }`
})