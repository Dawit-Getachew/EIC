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
import { ISubSector } from 'src/models/InvestmentModels/Category/sub_sector'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ViewTwoToneIcon from '@mui/icons-material/RemoveRedEyeSharp';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import ViewModal from './ViewModal'
import DeleteModal from './DeleteModal'
import { useDispatch } from "react-redux"
import { Actions as SubSectorActions } from "src/store/States/Investment/Category/SubSector/"
import { useNavigate } from "react-router"
import routes from 'src/constants/routes'
import { getSector } from "src/store/States/Investment/Category/Sector/helper"

interface RecentOrdersTableProps {
  className?: string;
  sub_sectors: CryptoOrder[];
  sectors: any[]
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
  sub_sectors: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return sub_sectors.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  sub_sectors: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return sub_sectors.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ sub_sectors, sectors }) => {
  const [selectedSubSectors, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedSubSectors.length > 0;
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

  const handleSelectAllSubSectors = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? sub_sectors.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedSubSectors.includes(cryptoOrderId)) {
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

  const filteredSubSectors = applyFilters(sub_sectors, filters);
  const paginatedSubSectors = applyPagination(
    filteredSubSectors,
    page,
    limit
  );
  const selectedSomeSubSectors =
    selectedSubSectors.length > 0 &&
    selectedSubSectors.length < sub_sectors.length;
  const selectedAllSubSectors =
    selectedSubSectors.length === sub_sectors.length;
  const theme = useTheme();

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedSubSector, setSelectedSubSector] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <Card>
      <ViewModal
        isVisible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        sub_sector={selectedSubSector}
      />
      <DeleteModal
        isVisible={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        sub_sector={selectedSubSector}
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
          title="Recent SubSectors"
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
                  checked={selectedAllSubSectors}
                  indeterminate={selectedSomeSubSectors}
                  onChange={handleSelectAllSubSectors}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSubSectors.map((item) => {
              const isCryptoOrderSelected = selectedSubSectors.includes(
                item._id
              );
              const sub_sector = item as unknown as ISubSector
              return (
                <TableRow
                  hover
                  key={sub_sector._id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, sub_sector._id)
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
                      {sub_sector.name}
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
                      {getSector(sub_sector.sector, sectors).name}
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
                          setSelectedSubSector(sub_sector)
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
                          dispatch(SubSectorActions.SelectSubSector(sub_sector))
                          navigate(routes.INVESTMENT.EDIT_SUB_SECTOR.ROUTE, { replace: true })
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
                          setSelectedSubSector(sub_sector)
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
          count={filteredSubSectors.length}
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
  sub_sectors: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  sub_sectors: []
};

export default RecentOrdersTable;
