import React, { useState, useReducer, useEffect, FC } from "react"
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
import '../styles.css'
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults,
  getFormError, FormActions, registerForm, selectRequriedKeys
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"
import { ModalElement } from "./modals"
import countries from "src/common/countries"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const BasicInformation: FC<Props> = (props) => {
  const inputs = [
    "company_name",
    "company_name_amharic",
    "trade_name",
    "trade_name_amharic",
    "type_of_business",
    "type_of_ownership",
    "shareholders",
    "manager_full_name",
    "investor_nationality",
    "manager_full_name_amharic"
  ]
  const [formState, dispatch] = useReducer(formReducer, formInitState)

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

  const handleSubmit = (data: any) => {
    props.nextPage(data)
  }

  useEffect(() => {
    formSubmit(dispatch)
  }, [props.pageClickCount])

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

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

  const [isVisible, setIsVisible] = useState(false)
  const [rows, setRows] = useState([])

  const addItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setRows(rows.concat(data))
    }
    setIsVisible(false)
  }

  useEffect(() => {
    if (rows.length > 0) {
      FormActions.UpdateFormInput({ name: "shareholders", value: rows }, dispatch)
    }
  }, [rows])

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(selectRequriedKeys(inputs, savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  useEffect(() => {
    if (savedBuffer.shareholders) {
      if (savedBuffer.shareholders.length > 0) {
        setRows(savedBuffer.shareholders)
      }
    }
  }, [savedBuffer.shareholders, setRows])

  return (
    <div>
      <ModalElement isVisible={isVisible} onSubmit={addItem} />
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
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("company_name", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">የድርጅቱ ስም</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("company_name_amharic", formState, dispatch, true)}
                />
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
                <FormLabel id="demo-radio-buttons-group-label">Trade Name of the Company</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("trade_name", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">የንግድ ስም</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("trade_name_amharic", formState, dispatch, true)}
                />
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
                <TextField
                  className="default-input"
                  variant="outlined"
                  select
                  {...register("type_of_business", formState, dispatch, true)}
                >
                  {business_types.map(item => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Nationality</FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  select
                  {...register("investor_nationality", formState, dispatch, true)}
                >
                  {countries.map(item => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Type of Ownership</FormLabel>
                {getFormError(formState, "type_of_ownership").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "type_of_ownership").helperText}</p>
                ) : <></>}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {ownership_types.map(item => (
                    <FormControlLabel value={item} control={<Radio {...registerForm({
                      name: "type_of_ownership",
                      formState,
                      dispatch,
                      exactValue: item,
                      disable: true
                    })} />} label={item} />
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
              Name of Shareholders
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
                    {rows.map((row, idx) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{idx + 1}</TableCell>
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
              <TextField
                className="long-input"
                variant="outlined"
                {...register("manager_full_name", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">የስራ አስኪያጁ ሙሉ ስም</FormLabel>
              <TextField
                className="long-input"
                variant="outlined"
                {...register("manager_full_name_amharic", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default BasicInformation