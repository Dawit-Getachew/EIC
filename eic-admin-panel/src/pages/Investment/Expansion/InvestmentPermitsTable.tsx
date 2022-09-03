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
  CircularProgress
} from "@mui/material";
import Label from "src/components/Label";
import { CryptoOrder, CryptoOrderStatus } from "src/models/crypto_order";
import { IInvestmentPermit } from "src/models/InvestmentModels/investment_permit";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ViewTwoToneIcon from "@mui/icons-material/RemoveRedEyeSharp";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DoneIcon from "@mui/icons-material/DoneRounded";
import BulkActions from "./BulkActions";
import ViewModal from "./ViewModal";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  Actions as InvestmentPermitExpansionActions,
  API as InvestmentPermitExpansionAPI,
} from "src/store/States/Investment/InvestmentPermitExpansion";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";
import { filterPermits, getActionText, getPermitStatus } from "./filter";
import {
  Selectors as BufferSelectors,
  Actions as BufferActions,
} from "src/store/States/Buffer";

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
  const [selectedInvestmentPermits, setSelectedCryptoOrders] = useState<
    string[]
  >([]);
  const selectedBulkActions = selectedInvestmentPermits.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

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

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvestmentPermit, setSelectedInvestmentPermit] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user_role = useSelector(BufferSelectors.selectUserRole);
  const UpdatePermit: FC<{ investmentPermit: any }> = ({ investmentPermit }) => {
    const [isLoading, setIsLoading] = useState(false)

    const updateStatus = (_id: string) => {
      setIsLoading(true)
      InvestmentPermitExpansionAPI.UpdateStatusInvestmentPermitExpansion(
        _id,
        getPermitStatus(user_role),
        (err, data) => {
          if (err) throw err;
          setIsLoading(false)
          if (data._id) {
            dispatch(InvestmentPermitExpansionActions.UpdateInvestmentPermitExpansions(data));
          }
        }
      );
    };

    return (
      <Tooltip title={getActionText(user_role)} arrow>
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
            updateStatus(investmentPermit._id);
          }}
          disabled={
            investmentPermit.permit_status ===
            getPermitStatus(user_role)
          }
        >
          {isLoading? <CircularProgress /> : <DoneIcon fontSize="small" />}
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
          title="Recent Investment Expansions"
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
              <TableCell>Type of Business</TableCell>
              <TableCell>Type of Ownership</TableCell>
              <TableCell>Manager Full Name</TableCell>
              <TableCell align="right">Investment Capital</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">{getActionText(user_role)}</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterPermits(user_role, paginatedInvestmentPermits).map(
              (item) => {
                const isCryptoOrderSelected =
                  selectedInvestmentPermits.includes(item._id);
                const investmentPermit = item as unknown as IInvestmentPermit;
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
                          handleSelectOneCryptoOrder(
                            event,
                            investmentPermit._id
                          )
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
                      {getStatusLabel(investmentPermit.permit_status)}
                    </TableCell>
                    <TableCell align="right">
                      <UpdatePermit investmentPermit={investmentPermit} />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Expansion Request" arrow>
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
                            dispatch(
                              BufferActions.SetExpansionPermitBuffer(investmentPermit)
                            );
                            navigate(
                              routes.INVESTMENT.VIEW_INVESTMENT_EXPANSION
                                .ROUTE + `/${investmentPermit._id}`,
                              { replace: true }
                            );
                          }}
                        >
                          <ViewTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Permit" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.error.lighter,
                            },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSelectedInvestmentPermit(investmentPermit);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
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
  cryptoOrders: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: [],
};

export default RecentOrdersTable;
