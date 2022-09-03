import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
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
} from "@mui/material";

import Label from "src/components/Label";
import { CryptoOrder, CryptoOrderStatus } from "src/models/crypto_order";
import { IWorkPermit } from "src/models/InvestmentModels/work_permit";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ViewTwoToneIcon from "@mui/icons-material/RemoveRedEyeSharp";
import RestorePage from "@mui/icons-material/RestorePage";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import ViewModal from "./ViewModal";
import RenewModal from "./RenewModal";
import { useDispatch } from "react-redux";
import { Actions as WorkPermitActions } from "src/store/States/Investment/WorkPermit/";
import { getManager } from "src/store/States/Investment/Manager/helper";
import { getProject } from "src/store/States/Investment/Project/helper";
import { Selectors as ManagerSelectors } from "src/store/States/Investment/Manager/";
import { Selectors as ProjectSelectors } from "src/store/States/Investment/Project/";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import routes from "src/constants/routes";
import { getCorrectDate } from "src/utils/date";

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
      text: "Failed",
      color: "error",
    },
    completed: {
      text: "Completed",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { color }: any = map["completed"];

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
  const [selectedWorkPermits, setSelectedCryptoOrders] = useState<string[]>([]);
  const selectedBulkActions = selectedWorkPermits.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const managers = useSelector(ManagerSelectors.selectManagers);
  const projects = useSelector(ProjectSelectors.selectProjects);

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "completed",
      name: "Completed",
    },
    {
      id: "pending",
      name: "Pending",
    },
    {
      id: "failed",
      name: "Failed",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllWorkPermits = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  console.log("llz", cryptoOrders)

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedWorkPermits.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
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

  const filteredWorkPermits = applyFilters(cryptoOrders, filters);
  const paginatedWorkPermits = applyPagination(
    filteredWorkPermits,
    page,
    limit
  );
  const selectedSomeWorkPermits =
    selectedWorkPermits.length > 0 &&
    selectedWorkPermits.length < cryptoOrders.length;
  const selectedAllWorkPermits =
    selectedWorkPermits.length === cryptoOrders.length;
  const theme = useTheme();

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [selectedWorkPermit, setSelectedWorkPermit] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card>
      {/* <ViewModal
        isVisible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        business_profile={selectedWorkPermit}
      /> */}
      <RenewModal
        isVisible={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        work_permit={selectedWorkPermit}
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
                  value={filters.status || "all"}
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
          title="All Work Permits"
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
                  checked={selectedAllWorkPermits}
                  indeterminate={selectedSomeWorkPermits}
                  onChange={handleSelectAllWorkPermits}
                />
              </TableCell>
              <TableCell>Project Title</TableCell>
              <TableCell>Project Stage</TableCell>
              <TableCell>Selected Manager</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkPermits.map((item) => {
              const isCryptoOrderSelected = selectedWorkPermits.includes(
                item._id
              );
              const workPermit = item as unknown as IWorkPermit;
              return (
                <TableRow
                  hover
                  key={workPermit._id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, workPermit._id)
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
                      {getProject(workPermit.project, projects).title}
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
                      {getProject(workPermit.project, projects).project_stage}
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
                      {`${
                        getManager(workPermit.selected_manager, managers)
                          .first_name
                      }
                       ${
                         getManager(workPermit.selected_manager, managers)
                           .middle_name
                       }
                       ${
                         getManager(workPermit.selected_manager, managers)
                           .last_name
                       }`}
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
                      {getCorrectDate(workPermit.start_date)}
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
                      {getCorrectDate(workPermit.end_date)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Work Permit" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedWorkPermit(workPermit);
                          setViewModalOpen(true);
                        }}
                      >
                        <ViewTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Renew Work Permit" arrow>
                      <Button
                        variant="contained"
                        startIcon={<RestorePage />}
                        sx={{ ml: 2 }}
                        onClick={() => {
                          setSelectedWorkPermit({
                            ...workPermit,
                            title: getProject(workPermit.project, projects).title
                          })
                          setRenewModalOpen(true)
                        }}
                      >
                        Renew
                      </Button>
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
          count={filteredWorkPermits.length}
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
  cryptoOrders: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: [],
};

export default RecentOrdersTable;
