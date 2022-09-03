import { useState, useEffect, ChangeEventHandler } from "react"
import {
  Button, MenuItem, Grid, CardHeader, FormControl, InputLabel, Select, Card, Divider
} from "@mui/material"
import { IWorkPermit, PermitStatus } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import { Selectors as WorkPermitSelectors, API as WorkPermitAPI, Actions as WorkPermitActions } from "src/store/States/WorkPermit/WorkPermitApplications/"
import BarChart, { InputChartData } from './BarChart'
import { useSelector, useDispatch } from "react-redux"

const monthes = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

enum FilterTypes {
  DATE = "Date",
  EMPLOYEE = "Employee"
}

const GeneralReports = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(() => monthes[new Date().getMonth()])
  const handleSelectMonth: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedMonth(event.target.value)
  }

  const workPermits = useSelector(WorkPermitSelectors.selectWorkPermits) as unknown as IWorkPermit[]
  const dispatch = useDispatch()
  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err: any, data: any[]) => {
      if (err) throw err
      if (data) {
        dispatch(WorkPermitActions.setWorkPermits(data))
      }
    })
  }, [])

  const [chartProps, setChartProps] = useState<InputChartData>()
  useEffect(() => {
    const thisMonth = new Date().getMonth()
    const thisMonthPermits = workPermits.filter(permit => new Date(permit.createdAt).getMonth() === thisMonth)
    const permitCounts: InputChartData = {
      DRAFTED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["DRAFTED"]).length,
      REVIEWED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["REVIEWED"]).length,
      VERIFIED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["VERIFIED"]).length,
      APPROVED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["APPROVED"]).length,
      SENT_SERVICE_FEE: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["SENT_SERVICE_FEE"]).length,
      ACCEPTED_SERVICE_FEE: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["ACCEPTED_SERVICE_FEE"]).length
    }
    setChartProps(permitCounts)
  }, [])

  const generatePermits = () => {
    const givenMonth = monthes.findIndex(month => month === selectedMonth)
    const thisMonthPermits = workPermits.filter(permit => new Date(permit.createdAt).getMonth() === givenMonth)
    const permitCounts: InputChartData = {
      DRAFTED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["DRAFTED"]).length,
      REVIEWED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["REVIEWED"]).length,
      VERIFIED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["VERIFIED"]).length,
      APPROVED: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["APPROVED"]).length,
      SENT_SERVICE_FEE: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["SENT_SERVICE_FEE"]).length,
      ACCEPTED_SERVICE_FEE: thisMonthPermits.filter(permit => permit.permit_status === PermitStatus["ACCEPTED_SERVICE_FEE"]).length
    }
    setChartProps(permitCounts)
  }

  return (
    <Card sx={{ pl: 2, pb: 2 }}>
      <CardHeader
        sx={{ pl: 0 }}
        title={'General Information'}
      />
      <Divider />
      <Grid container spacing={4} display="flex" alignItems="center" sx={{ pt: 1 }} justifyContent="center">
        <Grid item md={3} sx={{ pl: 0 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select Month</InputLabel>
            <Select
              onChange={handleSelectMonth}
              autoWidth
              defaultValue={selectedMonth}
              sx={{ mt: 0.5 }}
            >
              {monthes.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" color="primary" fullWidth onClick={generatePermits}>
            Generate
          </Button>
        </Grid>
        <Grid item md={10}>
          <BarChart
            {...chartProps}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default GeneralReports