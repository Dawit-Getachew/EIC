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
  Button
} from '@mui/material';
import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import { IWorkPermit } from 'src/store/States/WorkPermit/WorkPermitApplications/types'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ViewTwoToneIcon from '@mui/icons-material/RemoveRedEyeSharp';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DoneIcon from '@mui/icons-material/DoneRounded';
import BulkActions from './BulkActions';
import ViewModal from './ViewModal'
import DeleteModal from './DeleteModal'
import { useDispatch, useSelector } from "react-redux"
import { PermitStatus } from 'src/store/States/WorkPermit/WorkPermitApplications/types'
import { Actions as WorkPermitRenewalActions, API as WorkPermitRenewalAPI } from "src/store/States/Investment/RenewWorkPermit"
import { useNavigate } from "react-router"
import routes from 'src/constants/routes'
import { filterRenewalPermits, getActionText, getRenewPermitStatus } from "./filter"
import { Selectors as BufferSelectors, Actions as BufferActions } from "src/store/States/Buffer"
import { getCommonDate } from "src/helpers/getDateTime"
import { DownloadResidenceData } from './DownloadPermitData'

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
  const [selectedInvestmentPermitRenewals, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedInvestmentPermitRenewals.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  console.log("cc", cryptoOrders)

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

  const handleSelectAllInvestmentPermitRenewals = (
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
    if (!selectedInvestmentPermitRenewals.includes(cryptoOrderId)) {
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

  const filteredInvestmentPermitRenewals = applyFilters(cryptoOrders, filters);
  const paginatedInvestmentPermitRenewals = applyPagination(
    filteredInvestmentPermitRenewals,
    page,
    limit
  );
  const selectedSomeInvestmentPermitRenewals =
    selectedInvestmentPermitRenewals.length > 0 &&
    selectedInvestmentPermitRenewals.length < cryptoOrders.length;
  const selectedAllInvestmentPermitRenewals =
    selectedInvestmentPermitRenewals.length === cryptoOrders.length;
  const theme = useTheme();

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedInvestmentPermitRenewal, setSelectedInvestmentPermitRenewal] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user_role = useSelector(BufferSelectors.selectUserRole)

  const updateStatus = (_id: string) => {
    WorkPermitRenewalAPI.UpdateRenewWorkPermit({
      _id, permit_status: getRenewPermitStatus(user_role)
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        dispatch(WorkPermitRenewalActions.UpdateWorkPermitRenewals(data))
      }
    })
  }
  return (
    <Card>
      <ViewModal
        isVisible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        investment_permit={selectedInvestmentPermitRenewal}
      />
      <DeleteModal
        isVisible={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        investment_permit={selectedInvestmentPermitRenewal}
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
          title="Recent Investment Permits Renewals"
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
                  checked={selectedAllInvestmentPermitRenewals}
                  indeterminate={selectedSomeInvestmentPermitRenewals}
                  onChange={handleSelectAllInvestmentPermitRenewals}
                />
              </TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Business Activity</TableCell>
              <TableCell>Capital of Enterprise</TableCell>
              <TableCell>Investment Permit License Number</TableCell>
              <TableCell align="right">Date of Issuance</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">{getActionText(user_role)}</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRenewalPermits(user_role, paginatedInvestmentPermitRenewals).map((item) => {
              const isCryptoOrderSelected = selectedInvestmentPermitRenewals.includes(
                item._id
              );
              const work_permit = item as unknown as IWorkPermit
              return (
                <TableRow
                  hover
                  key={work_permit._id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, work_permit._id)
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
                      {work_permit.company_name}
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
                      {String(work_permit.business_activity).replace("_", " ")}
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
                      {String(work_permit.capital_of_enterprise).replace("_", " ")}
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
                      {String(work_permit.investment_permit_license_number).replace("_", " ")}
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
                      {getCommonDate(work_permit.date_of_issuance)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(work_permit.permit_status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={getActionText(user_role)} arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          updateStatus(work_permit._id)
                        }}
                        disabled={work_permit.permit_status === getRenewPermitStatus(user_role)}
                      >
                        <DoneIcon fontSize="small" />
                        {getActionText(user_role)}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Permit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          dispatch(BufferActions.SetNewPermitBuffer(work_permit))
                          navigate(routes.WORK_PERMIT.VIEW_INVESTMENT_PERMIT.ROUTE + `/${work_permit._id}`, { replace: true })
                        }}
                      >
                        <ViewTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Training Form" arrow>
                      <a target="_blank" href={work_permit.service_fee}>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <ViewTwoToneIcon fontSize="small" />
                        </IconButton>
                      </a>
                    </Tooltip>
                    {work_permit.permit_status === PermitStatus.RENEWED && <DownloadResidenceData data={work_permit} /> }
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
          count={filteredInvestmentPermitRenewals.length}
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
