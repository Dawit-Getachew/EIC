/* eslint-disable*/
import React, { useState, FC, useReducer, useEffect } from "react"
import {
  Grid, TextField, FormControl, FormLabel, MenuItem
} from '@mui/material';
import '../styles.css'
import './address_styles.css'
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults,
  FormActions, selectRequriedKeys
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"
import countries from "src/common/countries"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const AddressElement: FC<Props> = (props) => {
  const inputs = [
    "business_region",
    "business_city",
    "business_sub_city",
    "business_zone",
    "business_wereda",
    "business_house_number",
    "business_telephone",
    "business_fax",
    "business_po_box",
    "business_email",
    "home_telephone",
    "home_po_box",
    "home_country_address",
    "home_email",
    "representative_name",
    "representative_tel_1",
    "representative_tel_2",
    "representative_email"
  ]

  const optional_inputs = [
    "business_region_amharic",
    "business_city_amharic",
    "business_sub_city_amharic",
    "business_zone_amharic",
    "business_wereda_amharic",
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
    <div className="form-box">
      <div className="form-box-header">
        Address
      </div>
      <div className="form-box-content">
        <div className="address-title">
          Address of the Business Organization
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Region</FormLabel>
              <TextField  variant="outlined" {...register("business_region", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
          <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ክልል</FormLabel>
              <TextField  variant="outlined" {...register("business_region_amharic", formState, dispatch)} />
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
              <TextField  variant="outlined" {...register("business_city", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
          <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ከተማ</FormLabel>
              <TextField  variant="outlined" {...register("business_city_amharic", formState, dispatch)} />
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
              <TextField  variant="outlined" {...register("business_sub_city", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
          <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ክፍለ ከተማ</FormLabel>
              <TextField  variant="outlined" {...register("business_sub_city_amharic", formState, dispatch)} />
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
              <TextField  variant="outlined" {...register("business_zone", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
          <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ዞን</FormLabel>
              <TextField  variant="outlined" {...register("business_zone_amharic", formState, dispatch)} />
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
              <TextField  variant="outlined" {...register("business_wereda", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
          <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ወረዳ</FormLabel>
              <TextField  variant="outlined" {...register("business_wereda_amharic", formState, dispatch)} />
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
              <TextField  variant="outlined" {...register("business_telephone", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
              <TextField  variant="outlined" {...register("business_fax", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Business House Number</FormLabel>
              <TextField  variant="outlined" {...register("business_house_number", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">P.O. Box</FormLabel>
              <TextField  variant="outlined" {...register("business_po_box", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email Address</FormLabel>
              <TextField  variant="outlined" type="email" {...register("business_email", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}></Grid>
        </Grid>
        <div className="address-title">
          Home address including Telephone and Email Address
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number</FormLabel>
              <TextField  variant="outlined" {...register("home_telephone", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">P.O Box</FormLabel>
              <TextField  variant="outlined" type="email" {...register("home_po_box", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}></Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Country</FormLabel>
              <TextField select  variant="outlined" {...register("home_country_address", formState, dispatch)}>
                {countries.map(item => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email Address</FormLabel>
              <TextField  variant="outlined" type="email" {...register("home_email", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}></Grid>
        </Grid>
        <div className="address-title">
        Address of Authorized Representative
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Name</FormLabel>
              <TextField className="long-input" variant="outlined" {...register("representative_name", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number #1</FormLabel>
              <TextField  variant="outlined" type="tel" {...register("representative_tel_1", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number #2</FormLabel>
              <TextField  variant="outlined" type="tel" {...register("representative_tel_2", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}></Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
              <TextField className="long-input" variant="outlined" type="email" {...register("representative_email", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AddressElement