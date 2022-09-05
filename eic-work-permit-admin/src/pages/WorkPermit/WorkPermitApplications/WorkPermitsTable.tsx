/* eslint-disable */
import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import Label from 'src/components/Label';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import { IInvestmentPermit } from 'src/models/InvestmentModels/investment_permit'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import ViewModal from './ViewModal'
import DeleteModal from './DeleteModal'
import { useDispatch, useSelector } from "react-redux"
import { Actions as InvestmentPermitActions, API as InvestmentPermitAPI } from "src/store/States/Investment/InvestmentPermit/"
import { useNavigate } from "react-router"
import routes from 'src/constants/routes'
import { filterPermits, getActionText, getPermitStatus, getPermitChangeStatus } from "./filter"
import { Selectors as BufferSelectors, Actions as BufferActions } from "src/store/States/Buffer"
import { InvestmentPermitStatus } from "src/common/enums"
import { SeeWorkPermitPayload, UpdatePermitComponent, filterPermitsByRole } from "./Components"
import { IWorkPermit } from 'src/store/States/WorkPermit/WorkPermitApplications/types';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (text: any): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { color }: any = map['completed'];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedInvestmentPermits, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedInvestmentPermits.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllInvestmentPermits = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedInvestmentPermits.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredInvestmentPermits = applyFilters(cryptoOrders, filters);
  const paginatedInvestmentPermits = applyPagination(
    filteredInvestmentPermits,
    page,
    limit
  );
  const selectedSomeInvestmentPermits =
    selectedInvestmentPermits.length > 0 &&
    selectedInvestmentPermits.length < cryptoOrders.length;
  const selectedAllInvestmentPermits =
    selectedInvestmentPermits.length === cryptoOrders.length;
  const theme = useTheme();

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedInvestmentPermit, setSelectedInvestmentPermit] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user_role = useSelector(BufferSelectors.selectUserRole)

  const CompanyNameRegistration: FC<{ permit: any }> = ({ permit }) => {
    return (
      <Tooltip title="See Company Registration Form" arrow>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.primary.lighter
            },
            color: theme.palette.primary.main
          }}
        >
          <a href={permit.company_registration_form} style={{ textDecoration: "none" }} download target="_blank">
            <BusinessIcon />
          </a>
        </IconButton>
      </Tooltip>
    )
  }

  const SeeBankForm: FC<{ permit: any }> = ({ permit }) => {
    return (
      <Tooltip title="Bank Slip Form" arrow>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.primary.lighter
            },
            color: theme.palette.primary.main
          }}
        >
          <a href={permit.bank_slip_form} style={{ textDecoration: "none" }} download target="_blank">
            <AccountBalanceIcon />
          </a>
        </IconButton>
      </Tooltip>
    )
  }

  const EditCompanyName: FC<{ permit: any }> = ({ permit }) => {
    return (
      <Tooltip title="Edit Company Name" arrow>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.primary.lighter
            },
            color: theme.palette.primary.main
          }}
          onClick={() => {
            dispatch(BufferActions.SetNewPermitBuffer(permit))
            navigate(routes.WORK_PERMIT.COMPANY_NAME_EDIT.ROUTE, { replace: true })
          }}
        >
          <EditTwoToneIcon />
        </IconButton>
      </Tooltip>
    )
  }


  return (
    <Card>
      <ViewModal
        isVisible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        investment_permit={selectedInvestmentPermit}
      />
      <DeleteModal
        isVisible={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        investment_permit={selectedInvestmentPermit}
      />
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Investment Permits"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllInvestmentPermits}
                  indeterminate={selectedSomeInvestmentPermits}
                  onChange={handleSelectAllInvestmentPermits}
                />
              </TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Country of Incorporation</TableCell>
              <TableCell>Capital of Enterprise</TableCell>
              <TableCell align="right">Investment Permit License No.</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">Issue</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterPermitsByRole(user_role, paginatedInvestmentPermits).map((item) => {
              const isCryptoOrderSelected = selectedInvestmentPermits.includes(
                item._id
              );
              const investmentPermit = item as unknown as IWorkPermit
              return (
                <TableRow
                  hover
                  key={investmentPermit._id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, investmentPermit._id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
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
                      {String(investmentPermit.country_of_incorporation)}
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
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {investmentPermit.investment_permit_license_number}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(investmentPermit.permit_status)}
                  </TableCell>
                  <TableCell align="right">
                    <UpdatePermitComponent investmentPermit={investmentPermit} user_role={user_role} />
                  </TableCell>
                  <TableCell align="right">
                    <SeeWorkPermitPayload investmentPermit={investmentPermit} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredInvestmentPermits.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
