import { Tooltip, useTheme, IconButton, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Grid } from "@mui/material"
import { useState, useEffect, FC } from "react"
import { IInvestmentPermit } from "src/store/States/Investment/InvestmentPermit/types"
import { SeeInvestmentPermitPayload } from "./Components"
import { API as AdminAPI } from "src/store/States/Admin"
import { API as InvestmentPermitAPI } from "src/store/States/Investment/InvestmentPermit/"
import { AssignInvestmentPermitToEmployee } from "./modals"
import AssignIcon from '@mui/icons-material/Assignment';

const UnAssignedInvestmentPermits = () => {
  const [fetchedInvestmentPermits, setFetchedInvestmentPermits] = useState<any[]>([])
  const [fetchedAdmins, setFetchedAdmins] = useState<any[]>([])

  useEffect(() => {
    AdminAPI.FetchAdmins((err: any, data: any[]) => {
      if (err) throw err
      if (data) {
        setFetchedAdmins(data)
      }
    })

    InvestmentPermitAPI.FetchUnAssignedInvestmentPermits((err: any, data: any[]) => {
      if (err) throw err
      if (data) {
        setFetchedInvestmentPermits(data)
      }
    })
  }, [])

  const theme = useTheme();
  const [selectedInvestmentPermit, setSelectedInvestmentPermit] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const AssignInvestmentPermitItem: FC<{
    permit: any;
  }> = (props) => {
    return (
      <Tooltip title='Assign Investment Permit' arrow>
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
            setSelectedInvestmentPermit(props.permit)
            setIsModalVisible(true)
          }}
        >
          <AssignIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )
  }

  const assignInvestmentPermit = (data: any) => {
    if (Object.keys(data).length > 0) {
      setIsLoading(true)
      InvestmentPermitAPI.AssignEmployeeToInvestmentPermitBody({
        _id: selectedInvestmentPermit._id,
        case_worker: data.case_worker,
        director: data.director,
        team_leader: data.team_leader
      }, (err: any, data: any) => {
        if (err) throw err
        setFetchedInvestmentPermits(investmentPermits => investmentPermits.filter(item => item._id !== data._id))
        setIsLoading(false)
      })
    }
    setIsModalVisible(false)
  }

  return (
    <>
      {isModalVisible && (
        <AssignInvestmentPermitToEmployee
          admins={fetchedAdmins}
          isLoading={isLoading}
          isVisible={isModalVisible}
          onSubmit={assignInvestmentPermit}
          title={selectedInvestmentPermit.company_name ? selectedInvestmentPermit.company_name : ''}
          data={selectedInvestmentPermit}
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
            style={{ display: fetchedInvestmentPermits.length > 0 ? "none" : "inherit" }}
          >
            No Unassigned Investment Permits for Now
          </Typography>
        </Grid>
      </Grid>
      <TableContainer style={{ display: fetchedInvestmentPermits.length > 0 ? "inherit" : "none" }}>
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
            {fetchedInvestmentPermits.map((item) => {
              const investmentPermit = item as unknown as IInvestmentPermit
              return (
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
                      {String(investmentPermit.type_of_business)}
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
                      {String(investmentPermit.type_of_ownership)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {investmentPermit.permit_status}
                  </TableCell>
                  <TableCell align="right">
                    <SeeInvestmentPermitPayload investmentPermit={investmentPermit} />
                  </TableCell>
                  <TableCell align="right">
                    <AssignInvestmentPermitItem permit={investmentPermit} />
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

export default UnAssignedInvestmentPermits