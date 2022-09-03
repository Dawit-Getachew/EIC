import { useState, useEffect, ChangeEventHandler } from "react"
import {
  Button, MenuItem, Grid, CardHeader, FormControl, InputLabel, Select, Card, Divider
} from "@mui/material"
import { IInvestmentPermit, InvestmentPermitStatus } from "src/store/States/Investment/InvestmentPermit/types" 
import { Selectors as InvestmentPermitSelectors, API as InvestmentPermitAPI, Actions as InvestmentPermitActions } from "src/store/States/Investment/InvestmentPermit/"
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

  const investmentPermits = useSelector(InvestmentPermitSelectors.selectInvestmentPermits) as unknown as IInvestmentPermit[]
  const dispatch = useDispatch()
  console.log("uuuuiiiiiiii", investmentPermits)
  useEffect(() => {
    InvestmentPermitAPI.FetchInvestmentPermits({}, (err: any, data: any[]) => {
      console.log("zcdcdcz", data)
      if (err) throw err
      if (data) {
        dispatch(InvestmentPermitActions.setInvestmentPermits(data))
      }
    })
  }, [])

  const [chartProps, setChartProps] = useState<InputChartData>()
  const getStatusCount = (permits: any[]) => {
    let totalCount = {
      DRAFTED: 0,
      REVIEWED: 0,
      VERIFIED: 0,
      APPROVED: 0,
      PAYMENTS: 0,
      FINISHED: 0,
    };

    permits.forEach(permit => {
      switch(permit.permit_status) {
        case InvestmentPermitStatus["ACCEPTED"]: {
          totalCount.DRAFTED++;
          break;
        }
        case InvestmentPermitStatus["REVIEWED"]: {
          totalCount.REVIEWED++;
          break;
        }
        case InvestmentPermitStatus["VERIFIED"]: {
          totalCount.VERIFIED++;
          break;
        }
        case InvestmentPermitStatus["APPROVED"]: {
          totalCount.APPROVED++;
          break;
        }
        case InvestmentPermitStatus["ACCEPTED_SERVICE_FEE"]: {
          totalCount.FINISHED++;
          break;
        }
        default: {
          totalCount.PAYMENTS++;
          break;
        }
      }
    })

  }

  useEffect(() => {
    const thisMonth = new Date().getMonth()
    const thisMonthPermits = investmentPermits.filter(permit => new Date(permit.createdAt).getMonth() === thisMonth)
    const permitCounts: InputChartData = {
      DRAFTED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["ACCEPTED"]).length,
      REVIEWED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["REVIEWED"]).length,
      VERIFIED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["VERIFIED"]).length,
      APPROVED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["APPROVED"]).length,
      PAYMENTS: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["SENT_SERVICE_FEE"]).length,
      FINISHED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["ACCEPTED_SERVICE_FEE"]).length
    }
    setChartProps(permitCounts)
  }, [])

  const generatePermits = () => {
    const givenMonth = monthes.findIndex(month => month === selectedMonth)
    const thisMonthPermits = investmentPermits.filter(permit => new Date(permit.createdAt).getMonth() === givenMonth)
    const permitCounts: InputChartData = {
      DRAFTED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["ACCEPTED"]).length,
      REVIEWED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["REVIEWED"]).length,
      VERIFIED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["VERIFIED"]).length,
      APPROVED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["APPROVED"]).length,
      PAYMENTS: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["SENT_SERVICE_FEE"]).length,
      FINISHED: thisMonthPermits.filter(permit => permit.permit_status === InvestmentPermitStatus["ACCEPTED_SERVICE_FEE"]).length
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