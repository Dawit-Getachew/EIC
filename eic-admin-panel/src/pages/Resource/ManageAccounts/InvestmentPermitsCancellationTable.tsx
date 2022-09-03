import { FC, ChangeEvent, useState, useEffect } from "react";
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
  Modal,
  Grid,
  FormLabel,
  TextField,
} from "@mui/material";
import Label from "src/components/Label";
import { CryptoOrder, CryptoOrderStatus } from "src/models/crypto_order";
import { IInvestmentPermit } from "src/models/InvestmentModels/investment_permit";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ViewTwoToneIcon from "@mui/icons-material/RemoveRedEyeSharp";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import BulkActions from "./BulkActions";
import ViewModal from "./ViewModal";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  Actions as InvestmentPermitCancellationActions,
  API as InvestmentPermitCancellationAPI,
} from "src/store/States/Investment/InvestmentPermitCancellation";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";
import {
  filterCancelalPermits,
  getActionText,
  getCancelPermitStatus,
} from "./filter";
import {
  Selectors as BufferSelectors,
  Actions as BufferActions,
} from "src/store/States/Buffer";
import {
  FetchAccounts
} from "src/store/States/User/action"
import "./styles.css";
import {
  API as AdminAPI, Actions as AdminActions, Selectors as AdminSelectors
} from "src/store/States/Admin"
import { AddAccountModal, ManageAccountModal, DeleteAccountModal } from "./modals"
import DropWithInput from "src/components/DropWithInput/DropWithInput";

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
  const [selectedInvestmentPermitCancellations, setSelectedCryptoOrders] =
    useState<string[]>([]);
  const selectedBulkActions = selectedInvestmentPermitCancellations.length > 0;
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

  const handleSelectAllInvestmentPermitCancellations = (
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
    if (!selectedInvestmentPermitCancellations.includes(cryptoOrderId)) {
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

  const filteredInvestmentPermitCancellations = applyFilters(
    cryptoOrders,
    filters
  );
  const paginatedInvestmentPermitCancellations = applyPagination(
    filteredInvestmentPermitCancellations,
    page,
    limit
  );
  const selectedSomeInvestmentPermitCancellations =
    selectedInvestmentPermitCancellations.length > 0 &&
    selectedInvestmentPermitCancellations.length < cryptoOrders.length;
  const selectedAllInvestmentPermitCancellations =
    selectedInvestmentPermitCancellations.length === cryptoOrders.length;
  const theme = useTheme();

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [
    selectedInvestmentPermitCancellation,
    setSelectedInvestmentPermitCancellation,
  ] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user_role = useSelector(BufferSelectors.selectUserRole);

  const updateStatus = (_id: string) => {
    InvestmentPermitCancellationAPI.UpdateStatusInvestmentPermitCancellation(
      _id,
      getCancelPermitStatus(user_role),
      (err, data) => {
        if (err) throw err;
        if (data._id) {
          dispatch(
            InvestmentPermitCancellationActions.UpdateInvestmentPermitCancellations(
              data
            )
          );
        }
      }
    );
  };

  const [open, setOpen] = useState(false);
  const [openConfigure, setOpenConfigure] = useState(false);
  const handleModal = (data?: any) => {
    if (data) {
      if (Object.keys(data).length > 0) {
        dispatch(AdminActions.AddAdmins(data))
      }
    }
    setOpen(!open)
  }
  const handleConfigureModal = (data?: any) => {
    if (data) {
      if (Object.keys(data).length > 0) {
        dispatch(AdminActions.UpdateAdmins(data))
      }
    }
    setOpenConfigure(!openConfigure);
  }

  const fetchedAccounts = useSelector(AdminSelectors.selectAdmins)
  useEffect(() => {
    FetchAccounts((err, data) => {
      if (err) throw err
      AdminAPI.FetchAdmins((err: any, data: any) => {
        if (err) throw err
        if (data) {
          dispatch(AdminActions.setAdmins(data))
        }
      })
    })
  }, [])

  const [selectedAccount, setSelectedAccount] = useState<any>({})

  const [deleteModal, setDeleteModal] = useState<boolean>(false)



  return (
    <Card>
      <ViewModal
        isVisible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        investment_permit={selectedInvestmentPermitCancellation}
      />
      {deleteModal && <DeleteAccountModal
        isVisible={deleteModal}
        onClose={() => setDeleteModal(false)}
        account={selectedAccount}
      />}


      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h3" component="h2">
            Add an Account
          </Typography>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={6} xs={12} style={{ flex: 1, marginRight: 8 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  First Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  Last Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phone number
                </FormLabel>
                <DropWithInput
                  dropItems={[
                    { dropItem: "Mobile", dropValue: "Mobile" },
                    { dropItem: "Fixed", dropValue: "Fixed" },
                  ]}
                  gridStyle={{ marginTop: "0px" }}
                  data={null}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 25 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>

                <Select value={10} label="Role">
                  <MenuItem value={10}>Role 1</MenuItem>
                  <MenuItem value={20}>Role 2</MenuItem>
                  <MenuItem value={30}>Role 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Password
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 20 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button className="add-account-btn">Add Account</Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openConfigure}
        onClose={handleConfigureModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"add-account-modal"}>
          <Typography variant="h3" component="h2">
            View / Configure Account
          </Typography>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={6} xs={12} style={{ flex: 1, marginRight: 8 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  First Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">
                  Last Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phone number
                </FormLabel>

                <DropWithInput
                  dropItems={[
                    { dropItem: "Mobile", dropValue: "Mobile" },
                    { dropItem: "Fixed", dropValue: "Fixed" },
                  ]}
                  gridStyle={{ marginTop: "0px" }}
                  data={null}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 25 }}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>

                <Select value={10} label="Role">
                  <MenuItem value={10}>Role 1</MenuItem>
                  <MenuItem value={20}>Role 2</MenuItem>
                  <MenuItem value={30}>Role 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 10 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Password
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  style={{ marginTop: 3 }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" style={{ marginTop: 20 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button className="add-account-btn">Done</Button>
              </FormControl>
            </Grid>
          </Grid>

          <hr className={"hr-line"} />

          <Grid container width="100%" style={{ marginTop: 15 }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ width: "100%" }}>
                <Button className="deactivate-account-btn">
                  Deactivate Account
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {open && <AddAccountModal isVisible={open} handleClose={handleModal} />}
      {openConfigure && <ManageAccountModal data={selectedAccount} isVisible={openConfigure} handleClose={handleConfigureModal} />}

      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <Button
                className="add-account-btn"
                onClick={() => handleModal()}
                variant="contained"
                color="primary"
              >
                Add Account
              </Button>
            </FormControl>
          </Box>
        }
        title="Manage user accounts"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllInvestmentPermitCancellations}
                  indeterminate={selectedSomeInvestmentPermitCancellations}
                  onChange={handleSelectAllInvestmentPermitCancellations}
                />
              </TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedAccounts && fetchedAccounts.map((account) => {
              const isCryptoOrderSelected =
                selectedInvestmentPermitCancellations.includes(account._id);
              return (
                <TableRow
                  hover
                  key={account._id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, account._id)
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
                      {`${account.first_name} ${account.middle_name} ${account.last_name}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {account.email}
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
                      {String(account.role)}
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
                      {`${new Date(String(account.updatedAt)).getDate()}/${new Date(String(account.updatedAt)).getMonth() + 1}/${new Date(String(account.updatedAt)).getFullYear()}`}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Configure Account" arrow>
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
                          setSelectedAccount(account)
                          handleConfigureModal();
                        }}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove Account" arrow>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => {
                          setSelectedAccount(account)
                          setDeleteModal(true);
                        }}
                      >
                        <DeleteTwoToneIcon />
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
          count={filteredInvestmentPermitCancellations.length}
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
