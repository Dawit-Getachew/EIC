/* eslint-disable*/
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import DoneIcon from '@mui/icons-material/DoneRounded';
import PageHeader from "./PageHeader"
import {
  API as InvestmentPermitAPI, Actions as InvestmentPermitActions,
  Selectors as InvestmentPermitSelectors
} from 'src/store/States/InvestmentPermit/'
import { selectServiceID } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"
import {
  Actions as BufferActions
} from 'src/store/States/Buffer'
import { useNavigate } from "react-router"
import routes from "src/routes"
import { PermitStatus } from "src/common/enums"

const ExpansionInvestments = () => {
  const [rows, setRows] = useState([])
  const service_id = useSelector(selectServiceID)
  const dispatch = useDispatch()
  useEffect(() => {
    InvestmentPermitAPI.FetchInvestmentPermits((err, data) => {
      if (err) throw err
      dispatch(InvestmentPermitActions.setInvestmentPermits(data))
    })
  }, [dispatch])

  const investment_permit = useSelector(InvestmentPermitSelectors.selectInvestmentPermits)
  useEffect(() => {
    setRows(
      investment_permit.filter(item => (String(item.investor_id) === String(service_id)))
    )
  }, [investment_permit, setRows])

  const navigate = useNavigate()
  const expandPermit = (investment: any) => {
    dispatch(BufferActions.SetExpansionPermitBuffer(investment))
    navigate(routes.WORK_PERMIT.EXPANSION_INVESTMENT_PERMIT_FORM.ROUTE, { replace: true })
  }

  useEffect(() => {
    dispatch(BufferActions.SetBreadCrumps([
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/invest/cancel',
        title: 'Expand Investment Permit'
      }
    ]))
  }, [])

  return (
    <>
      <PageHeader />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Type of Business</TableCell>
              <TableCell>Type of Ownership</TableCell>
              <TableCell>Manager Full Name</TableCell>
              <TableCell align="right">Investment Capital</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((investmentPermit, idx) => (
              <TableRow
                hover
                key={investmentPermit._id}
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
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {String(investmentPermit.type_of_ownership).replace("_", " ")}
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
                    {String(investmentPermit.manager_full_name).replace("_", " ")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {investmentPermit.investment_capital_usd} USD
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {investmentPermit.investment_capital_birr} Birr
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {investmentPermit.permit_status}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={"Expand Permit"} arrow>
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => expandPermit(investmentPermit)}
                      disabled={
                        !Boolean(investmentPermit.permit_status === PermitStatus.CANCELLED ||
                          investmentPermit.permit_status === PermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP ||
                          investmentPermit.permit_status === PermitStatus.RENEWED)
                      }
                    >
                      <DoneIcon fontSize="small" />
                      Expand Permit
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

export default ExpansionInvestments