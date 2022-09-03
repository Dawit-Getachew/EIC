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
import { Selectors as BufferSelectors, Actions as BufferActions } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"
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
    "business_telephone_mobile",
    "business_fax",
    "business_po_box",
    "business_email",
    "home_telephone_direct",
    "home_po_box",
    "home_country",
    "home_email",
    "representative_full_name",
    "representative_telephone_mobile",
    "representative_telephone_direct",
    "representative_email"
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
      FormActions.UpdateFormData(selectRequriedKeys([...inputs, "company_address", "representative_address", "home_address"], savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  useEffect(() => {
    if (formState.formData.company_address) {
      const keys = Object.keys(formState.formData.company_address)
      const values = Object.values(formState.formData.company_address)
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput({ name: `business_${key}`, value: values[idx] }, dispatch)
      })
    }
  }, [formState.formData.company_address])

  useEffect(() => {
    if (formState.formData.representative_address) {
      const keys = Object.keys(formState.formData.representative_address)
      const values = Object.values(formState.formData.representative_address)
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput({ name: `representative_${key}`, value: values[idx] }, dispatch)
      })
    }
  }, [formState.formData.representative_address])


  console.log("state", formState)
  useEffect(() => {
    if (formState.formData.home_address) {
      const keys = Object.keys(formState.formData.home_address)
      const values = Object.values(formState.formData.home_address)
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput({ name: `home_${key}`, value: values[idx] }, dispatch)
      })
    }
  }, [formState.formData.home_address])

  const _dispatch = useDispatch()
  useEffect(() => {
    if (savedBuffer) {
      if (Object.keys(formState.formData).length > 0 && savedBuffer._id) {
        _dispatch(BufferActions.SetEditUserObject({
          _id: savedBuffer._id,
          ...formState.formData
        }))
      }
    }
  }, [formState.formData])

  return (
    <div>
      <div>
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
              <TextField className="default-input" variant="outlined" {...register("business_region", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ክልል</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_region_amharic", formState, dispatch)} />
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
              <TextField className="default-input" variant="outlined" {...register("business_city", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ከተማ</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_city_amharic", formState, dispatch)} />
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
              <TextField className="default-input" variant="outlined" {...register("business_sub_city", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ክፍለ ከተማ</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_sub_city_amharic", formState, dispatch)} />
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
              <TextField className="default-input" variant="outlined" {...register("business_zone", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ዞን</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_zone_amharic", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Wereda/Kebele</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_wereda", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">ወረዳ</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_wereda_amharic", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_telephone_mobile", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_fax", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">P.O. Box</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("business_po_box", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email Address</FormLabel>
              <TextField className="default-input" variant="outlined" type="email" {...register("business_email", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <div className="address-title">
          Home address including Telephone and Email Address
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number</FormLabel>
              <TextField className="default-input" variant="outlined" {...register("home_telephone_direct", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">P.O Box</FormLabel>
              <TextField className="default-input" variant="outlined" type="email" {...register("home_po_box", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Country</FormLabel>
              <TextField className="default-input" variant="outlined" select {...register("home_country", formState, dispatch)}>
                {countries.map((item, idx) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email Address</FormLabel>
              <TextField className="default-input" variant="outlined" type="email" {...register("home_email", formState, dispatch)} />
            </FormControl>
          </Grid>
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
              <TextField className="long-input" variant="outlined" {...register("representative_full_name", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number #1</FormLabel>
              <TextField className="default-input" variant="outlined" type="tel" {...register("representative_telephone_mobile", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number #2</FormLabel>
              <TextField className="default-input" variant="outlined" type="tel" {...register("representative_telephone_direct", formState, dispatch)} />
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
              <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
              <TextField className="long-input" variant="outlined" type="email" {...register("representative_email", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AddressElement