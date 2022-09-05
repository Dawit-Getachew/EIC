/* eslint-disable */
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
import { useState, useEffect } from "react";
import EyeIcon from "@mui/icons-material/RemoveRedEyeSharp";
import BusinessIcon from "@mui/icons-material/Business";
import PageHeader from "./PageHeader";
import {
  API as WorkPermitAPI,
  Actions as WorkPermitActions,
  Selectors as WorkPermitSelectors,
} from "src/store/States/WorkPermit";
import { useSelector, useDispatch } from "react-redux";
import { Actions as BufferActions, selectServiceID } from "src/store/States/Buffer";
import { useNavigate } from "react-router";
import routes from "src/routes";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentsIcon from "@mui/icons-material/Payments";
import { ModalElement } from "./modals";
import { TypeOfBusiness } from "src/common/enums";
import { PermitStatus } from "src/store/States/WorkPermit/types"
import { getCommonDate } from "src/store/States/Helpers/date"

const MyWorkPermits = () => {
  const [rows, setRows] = useState([]);
  const service_id = useSelector(selectServiceID);
  const dispatch = useDispatch();
  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err: any, data: any[]) => {
      if (err) throw err;
      if (data) {
        if (data.length > 0) {
          dispatch(WorkPermitActions.setWorkPermits(data.filter(permit => String(permit.service_id) === String(service_id))))
        }
      }
    });
  }, [dispatch]);

  const _work_permits = useSelector(
    WorkPermitSelectors.selectWorkPermits
  ) as any[];
  useEffect(() => {
    if (_work_permits) {
      if (_work_permits.length > 0) {
        setRows(_work_permits);
      }
    }
  }, [setRows, _work_permits]);

  const navigate = useNavigate();

  const viewPermit = (investment: any) => {
    dispatch(BufferActions.SetViewPermitBuffer(investment));
    navigate(routes.WORK_PERMIT.VIEW_NEW_WORK_PERMIT.ROUTE, {
      replace: true,
    });
  };

  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: routes.WORK_PERMIT.MY_WORK_PERMITS.ROUTE,
          title: "My Work Permits",
        },
      ])
    );
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const onSelectBank = (data: any) => {
    setIsModalVisible(false);
  };


  const getAction = (payload: any) => {
    switch (payload.permit_status) {
      case PermitStatus.APPROVED: {
        return (
          <Tooltip title="Upload Bank Slip for Service Fee" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(BufferActions.SetNewPermitBuffer(payload))
                navigate(routes.WORK_PERMIT.SERVICE_FEE_BANK_SLIP.ROUTE, { replace: true })
              }}
            >
              <PaymentsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }

      default: {
        return <></>
      }
    }
  }

  return (
    <>
      {isModalVisible && (
        <ModalElement isVisible={isModalVisible} onSubmit={onSelectBank} />
      )}
      <PageHeader />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Business Activity</TableCell>
              <TableCell>Capital of Enterprise</TableCell>
              <TableCell>Investment Permit License Number</TableCell>
              <TableCell align="right">Date of Issuance</TableCell>
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
                    {String(investmentPermit.business_activity)}
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
                    {String(investmentPermit.capital_of_enterprise)}
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
                    {String(investmentPermit.investment_permit_license_number)}
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
                    {getCommonDate(String(investmentPermit.date_of_issuance))}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {investmentPermit.permit_status}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Permit" arrow>
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => viewPermit(investmentPermit)}
                    >
                      <EyeIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {getAction(investmentPermit)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyWorkPermits;
