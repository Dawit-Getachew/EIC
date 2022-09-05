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
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import { IInvestmentActivity } from 'src/models/InvestmentModels/Category/investment_activity'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ViewTwoToneIcon from '@mui/icons-material/RemoveRedEyeSharp';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import ViewModal from './ViewModal'
import DeleteModal from './DeleteModal'
import { useDispatch } from "react-redux"
import { Actions as InvestmentActivityActions } from "src/store/States/Investment/Category/InvestmentActivity/"
import { useNavigate } from "react-router"
import routes from 'src/constants/routes'
import { getActivity } from "src/store/States/Investment/Category/Activity/helper"

interface RecentOrdersTableProps {
  className?: string;
  investment_activities: CryptoOrder[];
  activities: any[]
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
  investment_activities: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return investment_activities.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  investment_activities: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return investment_activities.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ investment_activities, activities }) => {
  const [selectedInvestmentActivities, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedInvestmentActivities.length > 0;
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

  const handleSelectAllInvestmentActivities = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? investment_activities.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedInvestmentActivities.includes(cryptoOrderId)) {
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

  const filteredInvestmentActivities = applyFilters(investment_activities, filters);
  const paginatedInvestmentActivities = applyPagination(
    filteredInvestmentActivities,
    page,
    limit
  );
  const selectedSomeInvestmentActivities =
    selectedInvestmentActivities.length > 0 &&
    selectedInvestmentActivities.length < investment_activities.length;
  const selectedAllInvestmentActivities =
    selectedInvestmentActivities.length === investment_activities.length;
  const theme = useTheme();

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedInvestmentActivity, setSelectedInvestmentActivity] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <Card>
      <ViewModal
        isVisible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        investment_activity={selectedInvestmentActivity}
      />
      <DeleteModal
        isVisible={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        investment_activity={selectedInvestmentActivity}
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
          title="Recent Investment Activities"
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
                  checked={selectedAllInvestmentActivities}
                  indeterminate={selectedSomeInvestmentActivities}
                  onChange={handleSelectAllInvestmentActivities}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInvestmentActivities.map((item) => {
              const isCryptoOrderSelected = selectedInvestmentActivities.includes(
                item._id
              );
              const investment_activity = item as unknown as IInvestmentActivity
              return (
                <TableRow
                  hover
                  key={investment_activity._id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, investment_activity._id)
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
                      {investment_activity.name}
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
                      {getActivity(investment_activity.activity, activities).name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Profile" arrow>
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
                          setSelectedInvestmentActivity(investment_activity)
                          setViewModalOpen(true)
                        }}
                      >
                        <ViewTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Profile" arrow>
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
                          dispatch(InvestmentActivityActions.SelectInvestmentActivity(investment_activity))
                          navigate(routes.WORK_PERMIT.EDIT_INVESTMENT_ACTIVITY.ROUTE, { replace: true })
                        }}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Profile" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedInvestmentActivity(investment_activity)
                          setDeleteModalOpen(true)
                        }}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
          count={filteredInvestmentActivities.length}
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
  investment_activities: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  investment_activities: []
};

export default RecentOrdersTable;
