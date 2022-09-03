import React, { useState, useReducer, useEffect, FC } from "react"
import {
  Grid, TextField, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, TextareaAutosize
} from '@mui/material';
import '../styles.css'
import './investment_styles.css'
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, selectRequriedKeys, registerForm
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const EmployeeInformation: FC<Props> = (props) => {
  const inputs = [
    "permanent_employees",
    "temporary_employees",
    "permanent_male_employees",
    "permanent_female_employees",
    "temporary_male_employees",
    "temporary_female_employees",
    "size_of_land",
    "electricity",
    "water",
    "telecom_services",
    "other_services"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  const handleSubmit = (data: any) => {
    props.nextPage(data)
  }

  useEffect(() => {
    formSubmit(dispatch)
  }, [props.pageClickCount])

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(selectRequriedKeys(inputs, savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  return (
    <>
      <div className="form-box">
        <div className="form-box-header">
          Employee Information
        </div>
        <div className="form-box-content">
          <div className="invest-title">
            Expected Employment Oppurtinities
          </div>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Permanent Employees</FormLabel>
                <TextField  variant="outlined" placeholder="USD" {...register("permanent_employees", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Temporary Employees</FormLabel>
                <TextField  variant="outlined" {...register("temporary_employees", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
          </Grid>
          <div className="invest-title" style={{ marginTop: 25 }}>
            Previously created oppurtinities
          </div>
          <div className="invest-sub-title" style={{ marginTop: 25 }}>
            Permanent
          </div>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Male</FormLabel>
                <TextField  variant="outlined" {...register("permanent_male_employees", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Female</FormLabel>
                <TextField  variant="outlined" {...register("permanent_female_employees", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
          </Grid>
          <div className="invest-sub-title" style={{ marginTop: 25 }}>
            Temporary
          </div>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Male</FormLabel>
                <TextField  variant="outlined" {...register("temporary_male_employees", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Female</FormLabel>
                <TextField  variant="outlined" {...register("temporary_female_employees", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
          </Grid>
          <div className="invest-title" style={{ marginTop: 25 }}>
            Project stite/utility required for expansion
          </div>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Size of land</FormLabel>
                <TextField  variant="outlined" {...register("size_of_land", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Electricity</FormLabel>
                <TextField  variant="outlined" {...register("electricity", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Water</FormLabel>
                <TextField  variant="outlined" {...register("water", formState, dispatch)} type="number" />
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
                <FormLabel id="demo-radio-buttons-group-label">Telecom Services</FormLabel>
                <TextField  variant="outlined" {...register("telecom_services", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Others (if any)</FormLabel>
                <TextField  variant="outlined" {...register("other_services", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default EmployeeInformation
