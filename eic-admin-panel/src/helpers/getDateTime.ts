export default (datetime: string) => `${datetime}:00.575Z`

export const getCalenderDate = (datetime: any) => new Date(datetime).getDate() + "/" + Number(new Date(datetime).getMonth() + 1) + "/" + new Date(datetime).getFullYear()

export const getCommonDate = (datetime: any) => `${new Date(datetime).getDate() > 9? new Date(datetime).getDate() + 1 : `0${new Date(datetime).getDate() + 1}`}-${(new Date(datetime).getMonth() + 1) > 10? new Date(datetime).getMonth() + 1 : `0${new Date(datetime).getMonth() + 1}`}-${new Date(datetime).getFullYear()}`