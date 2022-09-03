import React, { useState, FC, useReducer, useEffect } from "react"
import {
  Grid, TextField, FormControl, FormLabel, TextareaAutosize
} from '@mui/material';
import '../styles.css'
import './address_styles.css'
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults,
  FormActions, selectRequriedKeys, getFormError
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const ProposedProfile: FC<Props> = (props) => {
  const inputs = [
    "investment_activity",
    "project_description",
    "proposed_investment_capital",
    "loan",
    "equity",
    "other_source",
    "land_cost",
    "building_cost",
    "working_capital_cost",
    "machinery_cost",
    "material_cost",
    "other_costs"
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
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys(inputs, savedBuffer),
          ...(() => {
            const cost_keys = Object.keys(savedBuffer.investment_costs)
            const cost_values = Object.values(savedBuffer.investment_costs)
            const costObj = {
              other_source: 0
            }
            cost_values.forEach((value, idx) => costObj[`${cost_keys[idx]}_cost`] = value)
            return costObj
          })()
        }
        ,dispatch)
    }
  }, [savedBuffer, dispatch])

  console.log('ss', formState)

  return (
    <div className="form-box">
      <div className="form-box-header">
        Proposed profile
      </div>
      <div className="form-box-content">
        <div className="address-title">
          Profile of Proposed Investment for the expansion/upgrading
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
              <FormLabel className="invest-title">Investment Activity</FormLabel>
              {getFormError(formState, "investment_activity").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "investment_activity").helperText}</p>
              ) : <></>}
              <TextareaAutosize className="default-text-area" {...register("investment_activity", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
              <FormLabel className="invest-title">Brief description of the project objectivies and major activities</FormLabel>
              {getFormError(formState, "project_description").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "project_description").helperText}</p>
              ) : <></>}
              <TextareaAutosize className="default-text-area" {...register("project_description", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <div className="address-title" style={{ marginTop: 25 }}>
          Proposed capital and source of capital for the expansion/upgrading
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Proposed Expansion Capital</FormLabel>
              <TextField type="number" variant="outlined" {...register("proposed_investment_capital", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Equity</FormLabel>
              <TextField type="number" variant="outlined" {...register("equity", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Loan</FormLabel>
              <TextField type="number" variant="outlined" {...register("loan", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Other Source of Investment</FormLabel>
              <TextField type="number" variant="outlined" {...register("other_source", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <div className="address-title" style={{ marginTop: 25 }}>
          Proposed capital and source of capital for the expansion/upgrading
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Land</FormLabel>
              <TextField variant="outlined" {...register("land_cost", formState, dispatch)} type="number" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Building</FormLabel>
              <TextField variant="outlined" {...register("building_cost", formState, dispatch)} type="number" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Working Capital</FormLabel>
              <TextField variant="outlined" {...register("working_capital_cost", formState, dispatch)} type="number" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Machinery</FormLabel>
              <TextField variant="outlined" {...register("machinery_cost", formState, dispatch)} type="number" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Material/Equipment</FormLabel>
              <TextField variant="outlined" {...register("material_cost", formState, dispatch)} type="number" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Other Costs</FormLabel>
              <TextField variant="outlined" {...register("other_costs_cost", formState, dispatch)} type="number" />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ProposedProfile