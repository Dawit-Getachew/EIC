/* eslint-disable */
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
    "permanent_amount",
    "temporary_amount",
    "permanent_male_amount",
    "permanent_female_amount",
    "temporary_male_amount",
    "temporary_female_amount",
    "size_of_land_sqm",
    "electrical_power_kw",
    "water_m3",
    "telecom_services_needed",
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

  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData({
        ...selectRequriedKeys(inputs, savedBuffer),
        ...(() => {
          const previous_keys = Object.keys(savedBuffer.previous_employees)
          const previous_values = Object.values(savedBuffer.previous_employees)
          let previous_obj = {}
          previous_values.forEach((value, idx) => previous_obj[previous_keys[idx]] = value)

          const expected_keys = Object.keys(savedBuffer.expected_employees)
          const expected_values = Object.values(savedBuffer.expected_employees)
          const expected_obj = {}
          expected_values.forEach((value, idx) => expected_obj[expected_keys[idx]] = value)

          const utility_keys = Object.keys(savedBuffer.project_utilities)
          const utility_values = Object.values(savedBuffer.project_utilities)
          const utility_obj = {}
          utility_values.forEach((value, idx) => utility_obj[utility_keys[idx]] = value)

          return {
            ...expected_obj,
            ...previous_obj,
            ...utility_obj
          }
        })()
      }, dispatch)
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
                <TextField  variant="outlined" placeholder="USD" {...register("permanent_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Temporary Employees</FormLabel>
                <TextField  variant="outlined" {...register("temporary_amount", formState, dispatch)} type="number" />
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
                <TextField  variant="outlined" {...register("permanent_male_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Female</FormLabel>
                <TextField  variant="outlined" {...register("permanent_female_amount", formState, dispatch)} type="number" />
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
                <TextField  variant="outlined" {...register("temporary_male_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Female</FormLabel>
                <TextField  variant="outlined" {...register("temporary_female_amount", formState, dispatch)} type="number" />
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
                <TextField  variant="outlined" {...register("size_of_land_sqm", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Electricity</FormLabel>
                <TextField  variant="outlined" {...register("electrical_power_kw", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Water</FormLabel>
                <TextField  variant="outlined" {...register("water_m3", formState, dispatch)} type="number" />
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
                <TextField  variant="outlined" {...register("telecom_services_needed", formState, dispatch)} type="number" />
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
