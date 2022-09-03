import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import EyeIcon from '@mui/icons-material/RemoveRedEyeSharp';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import PageHeader from "./PageHeader"
import {
  API as InvestmentPermitAPI, Actions as InvestmentPermitActions,
  Selectors as InvestmentPermitSelectors
} from 'src/store/States/InvestmentPermit'
import { selectServiceID } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"
import {
  Actions as BufferActions
} from 'src/store/States/Buffer'
import { useNavigate } from "react-router"
import routes from "src/routes"
import { PermitStatus } from "src/common/enums"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import { ModalElement } from "./modals"
import { TypeOfBusiness } from "src/common/enums"

const MyInvestmentPermits = () => {
  const [rows, setRows] = useState([])
  const [investment_permit_expansions, setInvestmentPermit] = useState([])
  const service_id = useSelector(selectServiceID)
  const dispatch = useDispatch()
  useEffect(() => {
    InvestmentPermitAPI.FetchMyInvestmentPermits(service_id, (err, data) => {
      if (err) throw err
      dispatch(InvestmentPermitActions.setInvestmentPermits(data))
    })
  }, [dispatch])

  const _investment_permits = useSelector(InvestmentPermitSelectors.selectInvestmentPermits)
  useEffect(() => {
    if (_investment_permits) {
      if (_investment_permits.length > 0) {
        setInvestmentPermit(_investment_permits)
      }
    }
  }, [setInvestmentPermit, _investment_permits])
  useEffect(() => {
    setRows(investment_permit_expansions)
  }, [investment_permit_expansions, setRows])

  const navigate = useNavigate()
  const expandPermit = (investment: any) => {
    dispatch(BufferActions.SetExpansionPermitBuffer(investment))
    navigate(routes.INVESTMENT.EXPANSION_INVESTMENT_PERMIT_FORM.ROUTE, { replace: true })
  }

  const viewPermit = (investment: any) => {
    dispatch(BufferActions.SetViewPermitBuffer(investment))
    navigate(routes.INVESTMENT.VIEW_NEW_INVESTMENT_PERMIT.ROUTE, { replace: true })
  }

  useEffect(() => {
    dispatch(BufferActions.SetBreadCrumps([
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/invest/my',
        title: 'My Investment Permits'
      }
    ]))
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const onSelectBank = (data: any) => {
    setIsModalVisible(false)
    console.log("lolz", data)
  }

  const getAction = (status: string, payload: any) => {
    if (
      payload.type_of_business === TypeOfBusiness["Sole Proprietorship"] &&
      status === PermitStatus.APPROVED
    ) {
      return (
        <>
          <Tooltip title="Upload Bank Permit for Credit Service" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.CREDIT_ADVICE_BANK_SLIP.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <PaymentsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Get Bank Slip for Credit Service" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(BufferActions.SetViewPermitBuffer(payload))
                setIsModalVisible(true)
              }}
            >
              <ReceiptIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )
    }

    switch (status) {
      case PermitStatus.APPROVED: {
        return (
          <Tooltip title="Register Company Name" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.COMPANY_NAME_REGISTRATION.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <BusinessIcon fontSize="small" /> Register Company
            </IconButton>
          </Tooltip>
        )
      }

      case PermitStatus.APPROVED_COMPANY_NAME: {
        return (
          <Tooltip title="Pay for Company Name Registration" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.COMPANY_REGISTRATION_BANK_SLIP.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <PaymentsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }

      case PermitStatus.REGISTERED_COMPANY_NAME: {
        return (
          <Tooltip title="Send Memorandum of Association and Articles" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.MEMORANDUM_DOCUMENT_PAGE.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <ReceiptIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }

      case PermitStatus.ACCEPTED_MEMORANDUM_OF_ARTICLES: {
        return (
          <Tooltip title="Upload Bank Permit for Memorandum of Association & Articles" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.MEMORANDUM_BANK_SLIP.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <ReceiptIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }

      case PermitStatus.ACCEPTED_MEMORANDUM_BANK_SLIP: {
        return (
          <>
            {String(payload.selected_bank).length > 0 ? (
              <Tooltip title="Upload Bank Permit for Credit Service" arrow>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    navigate(routes.INVESTMENT.CREDIT_ADVICE_BANK_SLIP.ROUTE, { replace: true })
                    dispatch(BufferActions.SetViewPermitBuffer(payload))
                  }}
                >
                  <PaymentsIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Get Bank Slip for Credit Service" arrow>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    dispatch(BufferActions.SetViewPermitBuffer(payload))
                    setIsModalVisible(true)
                  }}
                >
                  <ReceiptIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </>
        )
      }

      case PermitStatus.REGISTERED_TIN_NUMBER: {
        return (
          <Tooltip title="Upload Bank Permit for Service Fee" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.SERVICE_FEE_BANK_SLIP.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <PaymentsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }

      case PermitStatus.ACCEPTED: {
        return (
          <Tooltip title="Edit Investment Permit" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate(routes.INVESTMENT.EDIT_NEW_INVESTMENT_PERMIT.ROUTE, { replace: true })
                dispatch(BufferActions.SetViewPermitBuffer(payload))
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }
      default: {
        return (
          <Tooltip title="View Permit" arrow>
            <IconButton
              color="inherit"
              size="small"
              onClick={() => viewPermit(payload)}
            >
              <EyeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }
    }
  }

  return (
    <>
      {isModalVisible && <ModalElement isVisible={isModalVisible} onSubmit={onSelectBank} />}
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
              <TableCell align="right">View Permit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((investmentPermit, idx) => (
              <TableRow
                hover
                key={investmentPermit._id}
              >
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
                    {String(investmentPermit.type_of_ownership).replace("_", " ")}
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
                  {investmentPermit.permit_status}
                </TableCell>
                <TableCell align="right">
                  {getAction(String(investmentPermit.permit_status), investmentPermit)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default MyInvestmentPermits