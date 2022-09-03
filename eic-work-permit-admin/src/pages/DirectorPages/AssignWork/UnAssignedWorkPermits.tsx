import { Tooltip, useTheme, IconButton, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Grid } from "@mui/material"
import { useState, useEffect, FC } from "react"
import { IWorkPermit } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import { SeeWorkPermitPayload } from "src/pages/WorkPermit/WorkPermitApplications/Components"
import { API as AdminAPI } from "src/store/States/Admin"
import { API as WorkPermitAPI } from "src/store/States/WorkPermit/WorkPermitApplications/"
import { AssignWorkPermitToEmployee } from "./modals"
import AssignIcon from '@mui/icons-material/Assignment';

const UnAssignedWorkPermits = () => {
  const [fetchedWorkPermits, setFetchedWorkPermits] = useState<any[]>([])
  const [fetchedAdmins, setFetchedAdmins] = useState<any[]>([])

  useEffect(() => {
    AdminAPI.FetchAdmins((err: any, data: any[]) => {
      if (err) throw err
      if (data) {
        setFetchedAdmins(data)
      }
    })

    WorkPermitAPI.FetchUnAssignedWorkPermits((err: any, data: any[]) => {
      if (err) throw err
      if (data) {
        setFetchedWorkPermits(data)
      }
    })
  }, [])

  const theme = useTheme();
  const [selectedWorkPermit, setSelectedWorkPermit] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const AssignWorkPermitItem: FC<{
    permit: any;
  }> = (props) => {
    return (
      <Tooltip title='Assign Work Permit' arrow>
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
            setSelectedWorkPermit(props.permit)
            setIsModalVisible(true)
          }}
        >
          <AssignIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )
  }

  const assignWorkPermit = (data: any) => {
    if (Object.keys(data).length > 0) {
      setIsLoading(true)
      WorkPermitAPI.AssignEmployeeToWorkPermitBody({
        _id: selectedWorkPermit._id,
        case_worker: data.case_worker,
        director: data.director,
        team_leader: data.team_leader
      }, (err: any, data: any) => {
        if (err) throw err
        setFetchedWorkPermits(workPermits => workPermits.filter(item => item._id !== data._id))
        setIsLoading(false)
      })
    }
    setIsModalVisible(false)
  }

  return (
    <>
      {isModalVisible && (
        <AssignWorkPermitToEmployee
          admins={fetchedAdmins}
          isLoading={isLoading}
          isVisible={isModalVisible}
          onSubmit={assignWorkPermit}
          title={selectedWorkPermit.company_name ? selectedWorkPermit.company_name : ''}
          data={selectedWorkPermit}
        />
      )}
      <Divider sx={{ mt: 1 }} />
      <Grid
        container
        width="100%"
        justifyContent="center"
        sx={{ mt: 1 }}
      >
        <Grid item md={4} xs={12}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
            style={{ display: fetchedWorkPermits.length > 0 ? "none" : "inherit" }}
          >
            No Unassigned Work Permits for Now
          </Typography>
        </Grid>
      </Grid>
      <TableContainer style={{ display: fetchedWorkPermits.length > 0 ? "inherit" : "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Country of Incorporation</TableCell>
              <TableCell>Capital of Enterprise</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right">Assign</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedWorkPermits.map((item) => {
              const workPermit = item as unknown as IWorkPermit
              return (
                <TableRow
                  hover
                  key={workPermit._id}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {workPermit.company_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {workPermit.company_name_amharic}
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
                      {String(workPermit.country_of_incorporation)}
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
                      {String(workPermit.capital_of_enterprise)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {workPermit.permit_status}
                  </TableCell>
                  <TableCell align="right">
                    <SeeWorkPermitPayload investmentPermit={workPermit} />
                  </TableCell>
                  <TableCell align="right">
                    <AssignWorkPermitItem permit={workPermit} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UnAssignedWorkPermits