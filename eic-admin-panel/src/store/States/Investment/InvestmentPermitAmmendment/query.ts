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
        permit_status
        investment_id
        service_id
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