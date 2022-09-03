export const getCorrectDate = (test_date: Date) => {
  if (!test_date) return `2020-01-01`
  return `${new Date(test_date).getFullYear()}-${(new Date(test_date).getMonth() + 1) < 10 ? `0${(new Date(test_date).getMonth() + 1)}` : `${(new Date(test_date).getMonth() + 1)}`}-${new Date(test_date).getDate() < 10? `0${new Date(test_date).getDate()}` : `${new Date(test_date).getDate()}`}`
}

export const getGQLDate = (test_date: Date, addYear: boolean) => {
  let normalData = addYear? `${(new Date(test_date).getFullYear() + 1)}` : `${(new Date(test_date).getFullYear())}`
  normalData = normalData + "-" + ((new Date(test_date).getMonth() + 1) < 10 ? `0${(new Date(test_date).getMonth() + 1)}` : (new Date(test_date).getMonth() + 1)) +
    "-" + (new Date(test_date).getDate() < 10 ? `0${new Date(test_date).getDate()}` : new Date(test_date).getDate())
  return `${normalData}T11:49:19.266Z` as unknown as Date
}