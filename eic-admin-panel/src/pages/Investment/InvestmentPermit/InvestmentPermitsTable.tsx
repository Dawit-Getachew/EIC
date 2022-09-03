import { FC, ChangeEvent, useState } from 'react';
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
import PrintIcon from "@mui/icons-material/Print";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import { IInvestmentPermit } from 'src/models/InvestmentModels/investment_permit'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ViewTwoToneIcon from '@mui/icons-material/RemoveRedEyeSharp';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DoneIcon from '@mui/icons-material/DoneRounded';
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
import { ModalElement } from "./modals"
import { PermitDocument as PrintBankLetter } from "./Pages/PrintBankLetter"
import { PDFDownloadLink } from '@react-pdf/renderer';

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
  const [isModalVisible, setIsModalVisible] = useState(false)

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
      <Tooltip title="See Company Reg. Bank Slip Form" arrow>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.primary.lighter
            },
            color: theme.palette.primary.main
          }}
        >
          <a href={permit.company_registration_bank_slip_form} style={{ textDecoration: "none" }} download target="_blank">
            <AccountBalanceIcon />
          </a>
        </IconButton>
      </Tooltip>
    )
  }

  const SeeMemorandumOfArticles: FC<{ permit: any }> = ({ permit }) => {
    return (
      <>
        <Tooltip title="See Memorandum of Association & Articles" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
          >
            <a href={permit.memorandum_of_association} style={{ textDecoration: "none" }} download target="_blank">
              <AccountBalanceIcon />
            </a>
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const SeeMemorandumOfArticleBankSlip: FC<{ permit: any }> = ({ permit }) => {
    return (
      <>
        <Tooltip title="Bank Slip for Memorandum of Association & Articles" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
          >
            <a href={permit.memorandum_bank_slip_form} style={{ textDecoration: "none" }} download target="_blank">
              <AccountBalanceIcon />
            </a>
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const SeeCreditServiceBankSlip: FC<{ permit: any }> = ({ permit }) => {
    return (
      <>
        <Tooltip title="See Credit Service Bank Slip" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
          >
            <a href={permit.credit_service_bank_slip_form} style={{ textDecoration: "none" }} download target="_blank">
              <AccountBalanceIcon />
            </a>
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const SeeServiceFeeBankSlip: FC<{ permit: any }> = ({ permit }) => {
    return (
      <>
        <Tooltip title="See Service Fee Bank Slip" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
          >
            <a href={permit.service_fee_bank_slip_form} style={{ textDecoration: "none" }} download target="_blank">
              <AccountBalanceIcon />
            </a>
          </IconButton>
        </Tooltip>
      </>
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
            navigate(routes.INVESTMENT.COMPANY_NAME_EDIT.ROUTE, { replace: true })
          }}
        >
          <EditTwoToneIcon />
        </IconButton>
      </Tooltip>
    )
  }

  const EditTinRegNumber: FC<{ permit: any }> = ({ permit }) => {
    return (
      <Tooltip title="Edit Tin & Regtration Number" arrow>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.primary.lighter
            },
            color: theme.palette.primary.main
          }}
          onClick={() => {
            setSelectedID(permit._id)
            setIsModalVisible(true)
          }}
        >
          <EditTwoToneIcon />
        </IconButton>
      </Tooltip>
    )
  }

  const UpdatePermitComponent: FC<{ investmentPermit: any }> = ({ investmentPermit }) => {
    const [_isLoading, _setIsLoading] = useState(false)

    const updateStatus = (_id: string, permit_status: string) => {
      _setIsLoading(true)
      InvestmentPermitAPI.UpdateStatusInvestmentPermit(_id, getPermitChangeStatus(user_role, permit_status), (err, data) => {
        if (err) throw err
        if (data._id) {
          _setIsLoading(false)
          dispatch(InvestmentPermitActions.UpdateInvestmentPermits(data))
        }
      })
    }

    return (
      <Tooltip title={getActionText(user_role, investmentPermit.permit_status)} arrow>
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
            updateStatus(investmentPermit._id, investmentPermit.permit_status)
          }}
          disabled={_isLoading || investmentPermit.permit_status === getPermitStatus(user_role)}
        >
          {_isLoading ? <CircularProgress /> : <>
            <DoneIcon fontSize="small" />
            {getActionText(user_role, investmentPermit.permit_status)}
          </>}
        </IconButton>
      </Tooltip>
    )
  }

  const GetBankForm: FC<{ permit: any }> = ({
    permit
  }) => {
    return (
      <Tooltip title="Downloading Bank Support Letter" arrow>
        <PDFDownloadLink
          document={<PrintBankLetter data={permit} />}
          fileName="bank_support_letter.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading..."
            ) : (
              <>
                <IconButton color="primary" size="large">
                  <PrintIcon />
                </IconButton>
              </>
            )}
        </PDFDownloadLink>
      </Tooltip>
    )
  }

  const [selectedID, setSelectedID] = useState("")
  return (
    <Card>
      {isModalVisible && <ModalElement _id={selectedID} isVisible={isModalVisible} onSubmit={() => setIsModalVisible(false)} />}
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
              <TableCell>Type of Business</TableCell>
              <TableCell>Manager Full Name</TableCell>
              <TableCell align="right">Investment Capital</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">Issue</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterPermits(user_role, paginatedInvestmentPermits).map((item) => {
              const isCryptoOrderSelected = selectedInvestmentPermits.includes(
                item._id
              );
              const investmentPermit = item as unknown as IInvestmentPermit
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
                      {String(investmentPermit.type_of_business).replace("_", " ")}
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
                      {String(investmentPermit.manager_full_name).replace("_", " ")}
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
                    {(
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.DRAFTED ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.REVIEWED ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.VERIFIED ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.ACCEPTED ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_COMPANY_NAME ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_COMPANY_REGISTRATION_BANK_SLIP ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_MEMORANDUM_OF_ARTICLES ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_MEMORANDUM_BANK_SLIP ||
                      String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_SERVICE_FEE_BANK_SLIP
                    ) && <UpdatePermitComponent investmentPermit={investmentPermit} />}
                    {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_CREDIT_SERVICE_BANK_SLIP) && (
                      <Grid md={5} item>
                        <EditTinRegNumber permit={investmentPermit} />
                      </Grid>
                    )}
                    {(String(investmentPermit.permit_status) === InvestmentPermitStatus.ACCEPTED_MEMORANDUM_BANK_SLIP) && (String(investmentPermit.selected_bank).length > 0) && (
                      <Grid md={5} item justifyContent="center" alignItems="center">
                        <GetBankForm permit={investmentPermit} />
                      </Grid>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP) && (
                        <Grid md={5} item>
                          <EditCompanyName permit={investmentPermit} />
                        </Grid>
                      )}
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_COMPANY_NAME) && (
                        <Grid md={5} item>
                          <CompanyNameRegistration permit={investmentPermit} />
                        </Grid>
                      )}
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_COMPANY_REGISTRATION_BANK_SLIP) && (
                        <Grid md={5} item>
                          <SeeBankForm permit={investmentPermit} />
                        </Grid>
                      )}
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_MEMORANDUM_OF_ARTICLES) && (
                        <Grid md={5} item>
                          <SeeMemorandumOfArticles permit={investmentPermit} />
                        </Grid>
                      )}
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_MEMORANDUM_BANK_SLIP) && (
                        <Grid md={5} item>
                          <SeeMemorandumOfArticleBankSlip permit={investmentPermit} />
                        </Grid>
                      )}
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_CREDIT_SERVICE_BANK_SLIP) && (
                        <Grid md={5} item>
                          <SeeCreditServiceBankSlip permit={investmentPermit} />
                        </Grid>
                      )}
                      {(String(investmentPermit.permit_status) === InvestmentPermitStatus.SENT_SERVICE_FEE_BANK_SLIP) && (
                        <Grid md={5} item>
                          <SeeServiceFeeBankSlip permit={investmentPermit} />
                        </Grid>
                      )}

                      <Grid container spacing={4}>
                        {investmentPermit.permit_status === InvestmentPermitStatus.ACCEPTED && (
                          <Grid md={6} item>
                            <Tooltip title="Edit Permit" arrow>
                              <IconButton
                                color="warning"
                                size="small"
                                onClick={() => {
                                  dispatch(BufferActions.SetNewPermitBuffer(investmentPermit))
                                  navigate(routes.INVESTMENT.EDIT_INVESTMENT_PERMIT.ROUTE, { replace: true })
                                }}
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        )}
                        <Grid md={6} item>
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
                                dispatch(BufferActions.SetNewPermitBuffer(investmentPermit))
                                navigate(routes.INVESTMENT.VIEW_INVESTMENT_PERMIT.ROUTE + `/${investmentPermit._id}`, { replace: true })
                              }}
                            >
                              <ViewTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Tooltip title="Delete Permit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedInvestmentPermit(investmentPermit)
                          setDeleteModalOpen(true)
                        }}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
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
