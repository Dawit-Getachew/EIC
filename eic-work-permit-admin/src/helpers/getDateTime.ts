/* eslint-disable */
export default (datetime: string) => `${datetime}:00.575Z`

export const getCalenderDate = (datetime: any) => new Date(datetime).getDate() + "/" + Number(new Date(datetime).getMonth() + 1) + "/" + new Date(datetime).getFullYear()

export const getCommonDate = (datetime: any) => {
  return `${new Date(datetime).getDate() > 10? new Date(datetime).getDate() : `0${new Date(datetime).getDate()}`}/${(new Date(datetime).getMonth() + 1) > 10? new Date(datetime).getMonth() + 1 : `0${new Date(datetime).getMonth() + 1}`}/${new Date(datetime).getFullYear()}`
}

export const getInputDate = (datetime: any) => {
  const dateObj = new Date(datetime)
  let month = dateObj.getMonth() < 9 ? `0${dateObj.getMonth() + 1}` : `${dateObj.getMonth() + 1}`
  let day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`
  return `${dateObj.getFullYear()}-${month}-${day}`
}