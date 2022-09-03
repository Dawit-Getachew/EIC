import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import DoneIcon from '@mui/icons-material/DoneRounded';
import EyeIcon from '@mui/icons-material/RemoveRedEyeRounded';
import PageHeader from "./ExpansionPageHeader"
import {
  API as InvestmentPermitExpansionAPI, Actions as InvestmentPermitExpansionActions,
  Selectors as InvestmentPermitSelectors
} from 'src/store/States/InvestmentPermitExpansion/'
import { selectServiceID } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"
import {
  Actions as BufferActions
} from 'src/store/States/Buffer'
import { useNavigate } from "react-router"
import routes from "src/routes"

const ExpansionInvestments = () => {
  const [rows, setRows] = useState([])
  const [investment_permit_expansions, setInvestmentPermitExpansions] = useState([])
  const service_id = useSelector(selectServiceID)
  const dispatch = useDispatch()
  useEffect(() => {
    InvestmentPermitExpansionAPI.FetchInvestmentPermitExpansions((err, data) => {
      if (err) throw err
      dispatch(InvestmentPermitExpansionActions.setInvestmentPermitExpansions(data))
    })
  }, [dispatch])

  const _investment_permit_expansions = useSelector(InvestmentPermitSelectors.selectInvestmentPermitExpansions)
  useEffect(() => {
    if (_investment_permit_expansions) {
      if (_investment_permit_expansions.length > 0) {
        setInvestmentPermitExpansions(_investment_permit_expansions)
      }
    }
  }, [setInvestmentPermitExpansions, _investment_permit_expansions])
  useEffect(() => {
    setRows(
      investment_permit_expansions.filter(item => item.investor_id === service_id)
    )
  }, [investment_permit_expansions, setRows])

  const navigate = useNavigate()
  const expandPermit = (investment: any) => {
    dispatch(BufferActions.SetExpansionPermitBuffer(investment))
    navigate(routes.INVESTMENT.EXPANSION_INVESTMENT_PERMIT_FORM.ROUTE, { replace: true })
  }

  const viewPermit = (investment: any) => {
    dispatch(BufferActions.SetViewPermitBuffer(investment))
    navigate(routes.INVESTMENT.VIEW_EXPANSION_INVESTMENT_PERMIT.ROUTE, { replace: true })
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
                  <Tooltip title="View Expansion Request" arrow>
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => viewPermit(investmentPermit)}
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

export default ExpansionInvestments