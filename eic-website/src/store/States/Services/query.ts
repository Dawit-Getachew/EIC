export const FetchMyInvestmentPermitsBodyTag = "fetchMyInvestmentPermits"
export const FetchMyInvestmentPermitsBody = (_id: string) => ({
  query: `{
    fetchMyInvestmentPermits(_id: "${_id}") {
      _id
      company_name
      company_name_amharic
      type_of_business
      capital_registration {
        amount_in_birr
        amount_in_dollar
      }
      draft_minutes
    }
  }`
})


export interface CapitalRegistrationUpdateBodyProps {
  _id: string;
  amount_in_birr: number;
  amount_in_dollar: number;
}
export const CapitalRegistrationUpdateBodyTag = "updateInvestmentPermit"
export const CapitalRegistrationUpdateBody = (input: CapitalRegistrationUpdateBodyProps) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${input._id}"
      capital_registration: {
        amount_in_birr: ${input.amount_in_birr}
        amount_in_dollar: ${input.amount_in_dollar}
      }
      draft_minutes: "draft_minutes"
    }) {
      ...on IInvestmentPermitSimple {
        _id
        capital_registration {
          amount_in_birr
          amount_in_dollar
        }
        draft_minutes
      }
    }
  }`
})

export const UpdateNotirizedMinutesBodyTag = "updateInvestmentPermit"
export const UpdateNotirizedMinutesBody = (_id: string, draft_minutes: string) => ({
  query: `mutation {
    updateInvestmentPermit(input: {
      _id: "${_id}"
      draft_minutes: "${draft_minutes}"
    }) {
      ...on IInvestmentPermitSimple {
        _id
        draft_minutes
      }
    }
  }`
})