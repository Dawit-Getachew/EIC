import { useState, useEffect, ChangeEventHandler } from "react"
import {
  TextField, Button, MenuItem, Grid, Box, Typography, CardHeader, FormControl, InputLabel,
  Select, Card, Divider, FormLabel, TableContainer, Checkbox, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material"
import { IInvestmentPermit } from "src/store/States/Investment/InvestmentPermit/types"
import { SeeInvestmentPermitPayload } from "../Components"
import { API as AdminAPI } from "src/store/States/Admin"
import { Selectors as InvestmentPermitSelectors, API as InvestmentAPI } from "src/store/States/Investment/InvestmentPermit/"
import { useSelector } from "react-redux"
import { IRoleAccount } from "src/common/interface"

enum FilterTypes {
  DATE = "Date",
  EMPLOYEE = "Employee"
}

const SpecificReports = () => {
  const [selectedFilterType, setSelectedFilterType] = useState<string>()
  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedFilterType(event.target.value)
  }
  const [startDate, setStartDate] = useState<string>("")
  const handleStartDate: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStartDate(event.target.value)
  }
  const [endDate, setEndDate] = useState<string>("")
  const handleEndDate: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEndDate(event.target.value)
  }

  const workPermits = useSelector(InvestmentPermitSelectors.selectInvestmentPermits) as unknown as IInvestmentPermit[]
  const [selectedInvestmentPermits, setSelectedInvestmentPermits] = useState([])

  const filterByDate = () => {
    if (startDate.length > 0 && endDate.length > 0) {
      const filtered: any = []
      if (workPermits) {
        if (workPermits.length > 0) {
          workPermits.forEach(workPermit => {
            const startTime = new Date(startDate).getTime()
            const endTime = new Date(endDate).getTime()
            const givenTime = new Date(workPermit.createdAt).getTime()
            if (givenTime <= endTime && givenTime >= startTime) {
              filtered.push(workPermit)
            }
          })
        }
      }
      setSelectedInvestmentPermits(filtered)
    }
  }

  const [fetchedAdmins, setFetchedAdmins] = useState<any[]>([])
  const [filteredAdmins, setFilteredAdmins] = useState<any[]>([])
  const [selectedAdminRole, setSelectedAdminRole] = useState<string>()
  const handleSelectRole: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedAdminRole(event.target.value)
  }
  const [selectedAdmin, setSelectedAdmin] = useState<string>()
  const handleSelectAdmin: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedAdmin(event.target.value)
  }

  useEffect(() => {
    AdminAPI.FetchAdmins((err: any, data: any[]) => {
      if (err) throw err
      if (data) {
        setFetchedAdmins(data)
      }
    })
  }, [])

  useEffect(() => {
    if (selectedAdminRole) {
      if (selectedAdminRole.length > 0) {
        setFilteredAdmins(fetchedAdmins.filter(item => item.role === selectedAdminRole))
      }
    }
  }, [selectedAdminRole])

  const filterByEmployee = () => {
    if (selectedAdminRole) {
      if (selectedAdmin) {
        InvestmentAPI.FetchAdminInvestmentPermitsBody({
          _id: selectedAdmin,
          role: selectedAdminRole
        }, (err: any, data: any[]) => {
          if (err) throw err
          if (data) {
            setSelectedInvestmentPermits(data)
          }
        })

        // InvestmentAPI.FetchAdminInvestmentPermitsBody
      }
    }
  }

  const generatePermits = () => {
    switch (selectedFilterType) {
      case FilterTypes.DATE: {
        return filterByDate()
      }
      case FilterTypes.EMPLOYEE: {
        return filterByEmployee()
      }
      default: {
        return null
      }
    }
  }

  return (
    <Card sx={{ pl: 2, pb: 2 }}>
      <CardHeader
        sx={{ pl: 0 }}
        title={selectedFilterType? `Filter Work Permits By ${selectedFilterType}` : "Filter Work Permits"}
      />
      <Divider />
      <Grid container spacing={4} display="flex" alignItems="center" sx={{ pt: 1 }}>
        <Grid item md={3} sx={{ pl: 0 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter By</InputLabel>
            <Select
              onChange={handleFilterChange}
              label="Status"
              autoWidth
            >
              {Object.values(FilterTypes).map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" color="primary" fullWidth onClick={generatePermits}>
            Generate
          </Button>
        </Grid>
      </Grid>
      {selectedFilterType === FilterTypes.DATE && (
        <Grid container md={6} spacing={1} display="flex" alignItems="center" sx={{ pt: 1 }}>
          <Grid item md={6}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Start Date</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                onChange={handleStartDate}
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">End Date</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                onChange={handleEndDate}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
      {selectedFilterType === FilterTypes.EMPLOYEE && (
        <Grid container md={6} spacing={1} display="flex" alignItems="center" sx={{ pt: 1 }}>
          <Grid item md={6}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Type of Role</FormLabel>
              <Select
                type="date"
                variant="outlined"
                onChange={handleSelectRole}
              >
                {Object.values(IRoleAccount).map(item => (
                  <MenuItem key={item} value={item}>{`${item}`.replace('_', ' ')}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Employee</FormLabel>
              <Select
                type="date"
                variant="outlined"
                onChange={handleSelectAdmin}
              >
                {filteredAdmins.map(item => (
                  <MenuItem key={item._id} value={item._id}>{`${item.first_name} ${item.last_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      )}
      <Divider sx={{ mt: 1 }} />
      <TableContainer style={{ display: selectedInvestmentPermits.length > 0 ? "inherit" : "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Type of Business</TableCell>
              <TableCell>Type of Ownership</TableCell>
              <TableCell align="right">Doc No.</TableCell>
              <TableCell align="right">Permit Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedInvestmentPermits.map((item) => {
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
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {investmentPermit.ref_number}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {investmentPermit.permit_status}
                  </TableCell>
                  <TableCell align="right">
                    <SeeInvestmentPermitPayload investmentPermit={investmentPermit} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default SpecificReports