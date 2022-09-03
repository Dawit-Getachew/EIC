import {
  ethDateTime,
  limits,
  converterDateTime,
  converterString
} from 'ethiopian-calendar-date-converter';
export const getCurrentEthiopianDate = () => {
  const payload = converterDateTime.toEthiopian(new Date())
  return `${payload.date}/${payload.month}/${payload.year}`
}

export const getRenewedEthiopianDate = () => {
  const payload = converterDateTime.toEthiopian(new Date())
  return `${payload.date}/${payload.month}/${Number(payload.year) + 1}`
}