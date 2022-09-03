export const getGQLDate = (dateStr: any) => {
  const dateObj = new Date(dateStr)
  let month = dateObj.getMonth() < 9? `0${dateObj.getMonth() + 1}` : `${dateObj.getMonth() + 1}`
  let _date = dateObj.getDate() < 10? `0${dateObj.getDate()}` : `${dateObj.getDate()}`
  let date = `${dateObj.getFullYear()}-${month}-${_date}`
  if (date[0] === '-') {
    return `${date.slice(1, date.length)}T09:20:52.293Z`
  }
  return `${date}T09:20:52.293Z`
}

export const getCommonDate = (date: any) => `${date}`.slice(0, 10)