import React, { useState }  from "react"
import {
  MenuItem, Grid, TextField, Button, Box,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './styles.css'

export default () => {
  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }
  const ModalElement: React.FC<ModalProps> = (props) => {
    const [formData, setFormData] = useState({})

    const handleChange = (event: any) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    }

    return (
      <Modal
        open={props.isVisible}
        onClose={() => props.onSubmit({})}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Investor
          </Typography>
          <Grid
            container
            width="100%"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Name of Investor</FormLabel>
                <TextField className="default-input" variant="outlined" name="name" onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Nationlaity</FormLabel>
                <TextField className="default-input" variant="outlined" select name="nationality" onChange={handleChange}>
                  {countries.map(item => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Country of Incorporation</FormLabel>
                <TextField className="default-input" variant="outlined" select name="country_of_incorporation" onChange={handleChange}>
                  {countries.map(item => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
                <TextField className="default-input" variant="outlined" name="address" onChange={handleChange} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: 40 }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Grid item md={12} xs={12}>
                <Button onClick={() => props.onSubmit(formData)} style={{
                  color: 'white',
                  backgroundColor: '#1e447e',
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                  Add
                </Button>
              </Grid>
            </div>
          </Grid>
        </Box>
      </Modal>
    )
  }

  const business_types = [
    'Private Limited Company',
    'One Person Private Limited Company',
    'Share Company',
    'Public Enterprise',
    'Cooperative Society',
    'Sole Proprietorship',
    'Civil Society Organization',
    'Other Engaging Business'
  ]

  const ownership_types = [
    'Domestic Investor',
    'Joint Investment (Foreign and Local Investment)',
    'Foreign Investor',
    'Branch'
  ]

  const countries = ['Ethiopia', 'Eriteria']
  const [isVisible, setIsVisible] = useState(false)
  const [rows, setRows] = useState([])

  const addItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setRows(rows.concat(data))
    }
    setIsVisible(false)
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div className="form-box">
      <ModalElement isVisible={isVisible} onSubmit={addItem} />
      <div className="form-box-header">
        Basic Information
      </div>
      <div className="form-box-content">
        <>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Name of the Company</FormLabel>
                <TextField className="default-input" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Name of the Company</FormLabel>
                <TextField className="default-input" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Type of Business</FormLabel>
                <TextField className="default-input" variant="outlined" select>
                  {business_types.map(item => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Type of Business</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {ownership_types.map(item => (
                    <FormControlLabel value={item} control={<Radio />} label={item} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={12}>
            <div className="table-title">
              Estimated annual production/service rendering of the project at full capacity
              <Button style={{ backgroundColor: '#E6EDF6' }} onClick={() => setIsVisible(true)}>
                <div className="button-text">+ Add</div>
              </Button>
            </div>
          </Grid>
          <Grid item md={12}>
            <div className="main-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Nationality</TableCell>
                      <TableCell align="right">Country of Incorporation</TableCell>
                      <TableCell align="right">Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{row.nationality}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.nationality}</TableCell>
                        <TableCell align="right">{row.country_of_incorporation}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Full Name of the Manager</FormLabel>
              <TextField className="long-input" variant="outlined" name="manager_full_name" />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}