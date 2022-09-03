import { useState, useEffect } from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Tooltip } from "@mui/material"
import PageHeader from "./PageHeader"
import { API } from "src/store/States/Services"
import EyeIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Actions as BufferActions, selectServiceID } from "src/store/States/Buffer"
import routes from "src/routes"

const CapitalRegistrationTable = () => {
  const [investment_data, setInvestmentData] = useState<any[]>([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const service_id = useSelector(selectServiceID)
  useEffect(() => {
    API.FetchMyInvestmentPermits(service_id, (err, data) => {
      if (err) throw err
      setInvestmentData(data)
    })
  }, [])

  const viewPermit = (investment: any) => {
    dispatch(BufferActions.SetViewPermitBuffer(investment))
    navigate(routes.INVESTMENT.CAPITAL_REGISTRATION_FORM.ROUTE, { replace: true })
  }

  return (
    <>
      <PageHeader />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Type of Business</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investment_data.map((investmentPermit, key) => (
              <TableRow
                hover
                key={key}
              >
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {investmentPermit.company_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {investmentPermit.company_name_amharic}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {String(investmentPermit.type_of_business).replace("_", " ")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Send Company Registration Form" arrow>
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => viewPermit(investmentPermit)}
                      disabled={Boolean(investmentPermit.capital_registration)}
                    >
                      <EyeIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CapitalRegistrationTable