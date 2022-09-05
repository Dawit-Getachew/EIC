/* eslint-disable */
import { Grid, Tooltip, IconButton, useTheme, CircularProgress } from "@mui/material"
import { FC, useState } from "react"
import { Actions as BufferActions } from "src/store/States/Buffer/"
import { API, Actions } from "src/store/States/WorkPermit/WorkPermitApplications"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ViewTwoToneIcon from '@mui/icons-material/RemoveRedEyeSharp';
import PaymentIcon from '@mui/icons-material/Payment';
import DoneIcon from '@mui/icons-material/DoneRounded';
import routes from "src/constants/routes"
import { IRoleAccount } from "src/common/interface"
import { PermitStatus as IWorkPermitStatus } from "src/store/States/WorkPermit/WorkPermitApplications/types"

export const filterPermitsByRole = (user_role: string, permits: any[]) => {
  return permits.filter(permit => {
    if (user_role === IRoleAccount.CASE_WORKER) {
      switch (permit.permit_status) {
        case IWorkPermitStatus.DRAFTED:
        case IWorkPermitStatus.REVIEWED:
        case IWorkPermitStatus.SENT_SERVICE_FEE:
        case IWorkPermitStatus.ACCEPTED_SERVICE_FEE:
          return true
        default:
          return false
      }
    } else if (user_role === IRoleAccount.TEAM_LEADER) {
      switch (permit.permit_status) {
        case IWorkPermitStatus.REVIEWED:
        case IWorkPermitStatus.VERIFIED:
        case IWorkPermitStatus.ACCEPTED_SERVICE_FEE:
          return true
        default:
          return false
      }
    } else if (user_role === IRoleAccount.DIRECTOR) {
      switch (permit.permit_status) {
        case IWorkPermitStatus.VERIFIED:
        case IWorkPermitStatus.APPROVED:
        case IWorkPermitStatus.ACCEPTED_SERVICE_FEE:
          return true
        default:
          return false
      }
    }
  })
}

export const UpdatePermitComponent: FC<{ investmentPermit: any, user_role: any }> = ({
  investmentPermit, user_role
}) => {
  const [_isLoading, _setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const updateStatus = (_id: string, permit_status: string) => {
    _setIsLoading(true)
    API.UpdateWorkPermitStatus({
      _id,
      permit_status: getPermitChangeStatus(user_role, permit_status)
    }, (err: any, data: any) => {
      if (err) throw err
      if (data._id) {
        _setIsLoading(false)
        dispatch(Actions.UpdateWorkPermits(data))
      }
    })
  }

  const getPermitChangeStatus = (user_role: any, permit_status: any) => {
    if (user_role === IRoleAccount.CASE_WORKER) {
      switch (permit_status) {
        case IWorkPermitStatus.DRAFTED: {
          return IWorkPermitStatus.REVIEWED
        }

        case IWorkPermitStatus.SENT_SERVICE_FEE: {
          return IWorkPermitStatus.ACCEPTED_SERVICE_FEE
        }
      }
    } else if (user_role === IRoleAccount.TEAM_LEADER) {
      switch (permit_status) {
        case IWorkPermitStatus.REVIEWED: {
          return IWorkPermitStatus.VERIFIED
        }
      }
    } else if (user_role === IRoleAccount.DIRECTOR) {
      switch (permit_status) {
        case IWorkPermitStatus.VERIFIED: {
          return IWorkPermitStatus.APPROVED
        }
      }
    }
  }

  const checkDisable = (user_role: any, permit_status: any) => {
    if (user_role === IRoleAccount.CASE_WORKER) {
      return (
        IWorkPermitStatus.REVIEWED === String(permit_status) ||
        IWorkPermitStatus.ACCEPTED_SERVICE_FEE === String(permit_status)
      )
    }

    if (user_role === IRoleAccount.TEAM_LEADER) {
      return IWorkPermitStatus.VERIFIED === String(permit_status)
    }

    if (user_role === IRoleAccount.DIRECTOR) {
      return IWorkPermitStatus.APPROVED === String(permit_status)
    }

    return false
  }

  const getActionText = (user_role: any, permit_status: any) => {
    if (user_role === IRoleAccount.CASE_WORKER) {
      switch (permit_status) {
        case IWorkPermitStatus.REVIEWED:
        case IWorkPermitStatus.DRAFTED: {
          return "Review Permit"
        }

        case IWorkPermitStatus.SENT_SERVICE_FEE:
        case IWorkPermitStatus.ACCEPTED_SERVICE_FEE: {
          return "Approve Service Fee Payment"
        }
      }
    } else if (user_role === IRoleAccount.TEAM_LEADER) {
      switch (permit_status) {
        case IWorkPermitStatus.REVIEWED:
        case IWorkPermitStatus.VERIFIED: {
          return "Verify Permit"
        }
      }
    } else if (user_role === IRoleAccount.DIRECTOR) {
      switch (permit_status) {
        case IWorkPermitStatus.VERIFIED:
        case IWorkPermitStatus.APPROVED: {
          return "Approve Permit"
        }
      }
    }

    return ""
  }

  const theme = useTheme();

  return investmentPermit.permit_status !== IWorkPermitStatus.ACCEPTED_SERVICE_FEE ? (
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
        onClick={() => updateStatus(investmentPermit._id, investmentPermit.permit_status)}
        disabled={_isLoading || checkDisable(user_role, investmentPermit.permit_status)}
      >
        {_isLoading ? <CircularProgress /> : <>
          <DoneIcon fontSize="small" />
          {getActionText(user_role, investmentPermit.permit_status)}
        </>}
      </IconButton>
    </Tooltip>
  ) : <></>
}

export const SeeWorkPermitPayload: FC<{
  investmentPermit: any;
}> = ({
  investmentPermit
}) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid md={5} item>
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
                navigate(routes.WORK_PERMIT.VIEW_INVESTMENT_PERMIT.ROUTE + `/${investmentPermit._id}`, { replace: true })
              }}
            >
              <ViewTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
        {(() => {
          switch (investmentPermit.permit_status) {
            case IWorkPermitStatus.SENT_SERVICE_FEE:
            case IWorkPermitStatus.ACCEPTED_SERVICE_FEE:
              return (
                <Grid md={5} item>
                  <Tooltip title="View Service Fee Bank Slip" arrow>
                    <a href={investmentPermit.service_fee} target="_blank" style={{ textDecoration: "none" }}>
                      <PaymentIcon fontSize="small" />
                    </a>
                  </Tooltip>
                </Grid>
              )
            default:
              return <></>
          }
        })()}
      </Grid>
    )
  }