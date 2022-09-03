import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import EyeIcon from "@mui/icons-material/RemoveRedEyeSharp";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {
  API as InvestmentPermitRenewalAPI,
  Actions as InvestmentPermitRenewalActions,
  Selectors as InvestmentPermitRenewalSelectors,
} from "src/store/States/InvestmentPermitRenewal/";
import {
  API as InvestmentPermitAPI,
  Actions as InvestmentPermitActions,
  Selectors as InvestmentPermitSelectors,
} from "src/store/States/InvestmentPermit";
import { Actions as BufferActions } from "src/store/States/Buffer";
import { selectServiceID } from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import routes from "src/routes";
import { PermitStatus } from "src/common/enums";

const RenewInvestments = () => {
  const [rows, setRows] = useState([]);
  const service_id = useSelector(selectServiceID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    InvestmentPermitAPI.FetchInvestmentPermits((err, data) => {
      if (err) throw err;
      dispatch(InvestmentPermitActions.setInvestmentPermits(data));
    });

    InvestmentPermitRenewalAPI.FetchInvestmentPermitRenewals((err, data) => {
      if (err) throw err;
      dispatch(
        InvestmentPermitRenewalActions.setInvestmentPermitRenewals(data)
      );
    });
  }, [dispatch]);

  const investment_permits = useSelector(
    InvestmentPermitSelectors.selectInvestmentPermits
  );
  const investment_permit_renewals = useSelector(
    InvestmentPermitRenewalSelectors.selectInvestmentPermitRenewals
  );
  useEffect(() => {
    const renewals = [];
    if (investment_permit_renewals) {
      if (investment_permits) {
        if (investment_permits.length > 0) {
          investment_permits.forEach((permit) => {
            const foundIndex = investment_permit_renewals.findIndex(
              (item) => String(item.investment_id) === String(permit._id)
            );
            if (foundIndex >= 0)
              renewals.push({
                ...permit,
                ...investment_permit_renewals[foundIndex],
              });
            else renewals.push(permit);
          });
        }
      }
    }
    setRows(renewals.filter((item) => item.investor_id === service_id));
  }, [investment_permit_renewals, investment_permits, setRows]);

  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: "/invest/renew",
          title: "Renew Work Permit",
        },
      ])
    );
  }, []);

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
              <TableRow hover key={investmentPermit._id}>
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
                    {String(investmentPermit.type_of_business).replace(
                      "_",
                      " "
                    )}
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
                    {String(investmentPermit.type_of_ownership).replace(
                      "_",
                      " "
                    )}
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
                    {String(investmentPermit.manager_full_name).replace(
                      "_",
                      " "
                    )}
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
                  {!Boolean(
                    investmentPermit.permit_status ===
                      PermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP ||
                      investmentPermit.permit_status === PermitStatus.RENEWED
                  ) ? (
                    <Tooltip title={"View Request"} arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => {
                          dispatch(
                            BufferActions.SetRenewPermitBuffer(investmentPermit)
                          );
                          navigate(
                            routes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT_VIEW
                              .ROUTE,
                            { replace: true }
                          );
                        }}
                      >
                        <EyeIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title={"Renew Permit"} arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => {
                          dispatch(
                            BufferActions.SetRenewPermitBuffer(investmentPermit)
                          );
                          navigate(
                            routes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT_FORM
                              .ROUTE,
                            { replace: true }
                          );
                        }}
                        disabled={
                          !Boolean(
                            investmentPermit.permit_status ===
                              PermitStatus.CANCELLED ||
                              investmentPermit.permit_status ===
                                PermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP ||
                              investmentPermit.permit_status ===
                                PermitStatus.RENEWED
                          )
                        }
                      >
                        <PublishedWithChangesIcon fontSize="small" />
                        {"Renew Permit"}
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RenewInvestments;
