import { FC } from "react"
import countries from "src/common/countries"
import { TextField, MenuItem } from "@mui/material"

const CountryInput: FC<{
  registerCountry?: () => any
}> = ({ registerCountry }) => {
  return (
    <TextField
      {...(() => {
        return registerCountry? registerCountry() : {}
      })()}
      select
    >
      {countries.map(item => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
      </TextField>
  )
}

export default CountryInput