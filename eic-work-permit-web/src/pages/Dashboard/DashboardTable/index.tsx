/* eslint-disable */
import React, { useEffect } from "react";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from "@mui/material/";
import { API, Selectors, Actions } from "src/store/States/InvestmentPermit"
import { selectServiceID } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"
const DashboardTable = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    API.FetchInvestmentPermits((err, data) => {
      if (err) throw err
      dispatch(Actions.setInvestmentPermits(data))
    })
  }, [])

  const investment_permits = useSelector(Selectors.selectInvestmentPermits)
  const service_id = useSelector(selectServiceID)

  return (
    <>
      <Grid mr={2}>
        <Card>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>COMPANY NAME</TableCell>
                    <TableCell>TYPE OF BUSINESS</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>INVESTMENT CAPITAL</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {investment_permits.filter(prop => String(prop.investor_id) === String(service_id)).map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.company_name}</TableCell>
                      <TableCell>{item.type_of_business}</TableCell>
                      <TableCell>{item.permit_status}</TableCell>
                      <TableCell>{item.investment_capital_usd}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default DashboardTable;
