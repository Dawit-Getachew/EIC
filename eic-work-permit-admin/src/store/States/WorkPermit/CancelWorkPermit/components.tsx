import { FC, useState } from "react"
import { Tooltip, IconButton, useTheme, CircularProgress } from "@mui/material"
import { IRoleAccount, } from "src/common/enums"
import { PermitStatus } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import { API as WorkPermitCancellationAPI, Actions as WorkPermitCancellationActions } from './index'
import { Actions as BufferActions, Selectors as BufferSelectors } from 'src/store/States/Buffer'
import { useDispatch, useSelector } from "react-redux"
import DoneIcon from '@mui/icons-material/DoneRounded';

export const UpdateWorkPermitCancellation: FC<{
  user_role: string;
  work_permit: any;
}> = ({
  user_role, work_permit
}) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const savedBuffer = useSelector(BufferSelectors.selectCancellationPermitBuffer)

    const updateStatus = (_id: string) => {
      setIsLoading(true)
      WorkPermitCancellationAPI.UpdateCancelWorkPermitStatus({
        _id, permit_status: getCancelPermitStatus(user_role)
      }, (err, data) => {
        if (err) throw err
        if (data._id) {
          dispatch(WorkPermitCancellationActions.UpdateCancelWorkPermits(data))
          dispatch(BufferActions.SetCancellationPermitBuffer({
            ...savedBuffer,
            ...data
          }))
        }
        setIsLoading(false)
      })
    }

    return (
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
          disabled={work_permit.permit_status === getCancelPermitStatus(user_role)}
        >
          {isLoading ? <CircularProgress color="success" /> : (
            <>
              <DoneIcon fontSize="small" />
              {getActionText(user_role)}
            </>
          )}
        </IconButton>
      </Tooltip>
    )
  }

export const getActionText = (role: string) => {
  switch (role) {
    case IRoleAccount.INSPECTOR:
      return "Accept Permit"

    case IRoleAccount.CASE_WORKER:
      return "Review Permit"

    case IRoleAccount.TEAM_LEADER:
      return "Verify Permit"

    case IRoleAccount.DIRECTOR:
      return "Approve Permit"

    default:
      return ""
  }
}

export const getCancelPermitStatus = (role: string) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER:
      return PermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return PermitStatus.RENEWED

    default:
      return PermitStatus.VERIFIED
  }
}

export const getPermitStatus = (role: string) => {
  switch (role) {
    case IRoleAccount.CASE_WORKER:
      return PermitStatus.REVIEWED

    case IRoleAccount.TEAM_LEADER:
      return PermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return PermitStatus.APPROVED

    default:
      return PermitStatus.REVIEWED
  }
}

export const filterPermits = (role: string, permits: any[]) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.DRAFTED || item.permit_status === PermitStatus.REVIEWED || item.permit_status === PermitStatus.VERIFIED
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.VERIFIED || item.permit_status === PermitStatus.APPROVED
      ))
    }

    default: {
      return []
    }
  }
}

export const filterCancellationPermits = (role: string, permits: any[]) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.REVIEWED || item.permit_status === PermitStatus.VERIFIED
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.VERIFIED || item.permit_status === PermitStatus.RENEWED
      ))
    }

    default: {
      return []
    }
  }
}