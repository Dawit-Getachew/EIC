import React, { useState, useReducer, useEffect, FC } from "react"
import {
  Grid, TextField, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, TextareaAutosize, MenuItem
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

const InvestmentDetail: FC<Props> = (props) => {
  const sectors = ['Agriculture', 'Industry', 'Service']
  const inputs = [
    "sector",
    "investment_activity",
    "project_description",
    "investment_region",
    "investment_sub_city",
    "investment_wereda",
    "investment_zone",
    "investment_city",
    "investment_telephone",
    "investment_fax",
    "investment_po_box",
    "investment_email",
    "land_size_sqm",
    "land_acquisition_type",
    "investment_capital_usd",
    "investment_capital_birr",
    "permanent_female_amount",
    "temporary_female_amount",
    "permanent_male_amount",
    "temporary_male_amount"
  ]

  const optional_inputs = [
    "investment_activity_amharic",
    "investment_region_amharic",
    "investment_sub_city_amharic",
    "investment_wereda_amharic",
    "investment_zone_amharic",
    "investment_city_amharic",
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

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(selectRequriedKeys([...inputs, ...optional_inputs], savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  return (
    <>
      <div className="form-box">
        <div className="form-box-header">
          Investment Detail
        </div>
        <div className="form-box-content">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Sector</FormLabel>
                {getFormError(formState, "sector").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "sector").helperText}</p>
                ) : <></>}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {sectors.map(item => (
                    <FormControlLabel value={item} control={<Radio {...registerForm({
                      name: "sector", formState, dispatch, exactValue: item
                    })} />} label={item} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="column"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">Investment Activity</FormLabel>
                {getFormError(formState, "investment_activity").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "investment_activity").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("investment_activity", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">??????????????????????????? ?????? ?????????</FormLabel>
                {getFormError(formState, "investment_activity_amharic").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "investment_activity_amharic").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("investment_activity_amharic", formState, dispatch)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">Brief description of the project objectivies and major activities</FormLabel>
                {getFormError(formState, "project_description").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "project_description").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("project_description", formState, dispatch)} />
              </FormControl>
            </Grid>
          </Grid>
          <div className="invest-title">
            Investment Location
          </div>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Region</FormLabel>
                <TextField  variant="outlined" {...register("investment_region", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">?????????</FormLabel>
                <TextField  variant="outlined" {...register("investment_region_amharic", formState, dispatch)} />
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
                <FormLabel id="demo-radio-buttons-group-label">City</FormLabel>
                <TextField  variant="outlined" {...register("investment_city", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">?????????</FormLabel>
                <TextField  variant="outlined" {...register("investment_city_amharic", formState, dispatch)} />
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
                <FormLabel id="demo-radio-buttons-group-label">Sub-City</FormLabel>
                <TextField  variant="outlined" {...register("investment_sub_city", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">????????? ?????????</FormLabel>
                <TextField  variant="outlined" {...register("investment_sub_city_amharic", formState, dispatch)} />
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
                <FormLabel id="demo-radio-buttons-group-label">Zone</FormLabel>
                <TextField  variant="outlined" {...register("investment_zone", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">??????</FormLabel>
                <TextField  variant="outlined" {...register("investment_zone_amharic", formState, dispatch)} />
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
                <FormLabel id="demo-radio-buttons-group-label">Wereda</FormLabel>
                <TextField  variant="outlined" {...register("investment_wereda", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">?????????</FormLabel>
                <TextField  variant="outlined" {...register("investment_wereda_amharic", formState, dispatch)} />
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
                <FormLabel id="demo-radio-buttons-group-label">Telephone Number</FormLabel>
                <TextField  variant="outlined" {...register("investment_telephone", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
                <TextField  variant="outlined" {...register("investment_fax", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">P.O. Box</FormLabel>
                <TextField  variant="outlined" {...register("investment_po_box", formState, dispatch)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField  variant="outlined" {...register("investment_email", formState, dispatch)} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <hr style={{ width: '99.7%' }} />
        <div className="form-box-content">
          <div className="invest-title">
            Land requirement (in square meter) by type of project
          </div>
          <Grid
            container
            width="100%"
            spacing={4}
            direction="column"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Land Size (in square meter)</FormLabel>
                <TextField className="long-input" variant="outlined" {...register("land_size_sqm", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Land Acquisition Type</FormLabel>
                <TextField className="long-input" variant="outlined" {...register("land_acquisition_type", formState, dispatch)} select>
                  {["By Lease", "By Rent"].map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" sx={{ mt: 5 }}>
                <FormLabel id="demo-radio-buttons-group-label">Planned Amount of investment capital (in Ethiopian Birr and United States Dollar)</FormLabel>
                <TextField className="long-input" variant="outlined" placeholder="ETB" {...register("investment_capital_birr", formState, dispatch)} type="number" />
                <TextField className="long-input" variant="outlined" placeholder="USD" {...register("investment_capital_usd", formState, dispatch)} type="number" sx={{ mt: 1, mb: 5 }} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={12}>
              <div className="invest-sub-title">
                Permanent Employees
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Male</FormLabel>
                <TextField  variant="outlined" {...register("permanent_male_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Female</FormLabel>
                <TextField  variant="outlined" {...register("permanent_female_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={12}>
              <div className="invest-sub-title">
                Temporary Employees
              </div>
            </Grid>
            <Grid item md={6} xs={12} sx={{ pt: 0 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Male</FormLabel>
                <TextField  variant="outlined" {...register("temporary_male_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12} sx={{ pt: 0 }}>
              <FormControl className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Female</FormLabel>
                <TextField  variant="outlined" {...register("temporary_female_amount", formState, dispatch)} type="number" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default InvestmentDetail
