/* eslint-disable */
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  MenuItem, Grid, TextField, Button, Box,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import '../styles.css'
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults,
  getFormError, FormActions, registerForm, selectRequriedKeys
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"
import { ModalElement } from "./modals"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const BasicInformation: FC<Props> = (props) => {
  const inputs = [
    "company_name",
    "company_name_amharic",
    "business_region",
    "business_city",
    "business_sub_city",
    "business_zone",
    "business_house_number",
    "business_telephone_direct",
    "business_fax",
    "business_po_box",
    "business_email",
    "expansion_region",
    "expansion_city",
    "expansion_sub_city",
    "expansion_zone",
    "expansion_house_number",
    "expansion_telephone_direct",
    "expansion_fax",
    "expansion_po_box",
    "expansion_email",
  ]
  const [formState, dispatch] = useReducer(formReducer, formInitState)

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

  const handleSubmit = (data: any) => {
    console.log('jeerrrrrrr')
    props.nextPage(data)
  }

  useEffect(() => {
    formSubmit(dispatch)
  }, [props.pageClickCount])

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

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

  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData({
        ...selectRequriedKeys(inputs, savedBuffer),
        ...(() => {
          const company_keys = Object.keys(savedBuffer.company_address)
          const company_values = Object.values(savedBuffer.company_address)
          console.log("lol", company_values)
          let address = {}
          company_values.forEach((value, idx) => {
            address['business_' + company_keys[idx]] = value
          })

          const expansion_keys = Object.keys(savedBuffer.company_expansion_address)
          const expansion_values = Object.values(savedBuffer.company_expansion_address)
          let expansion_address = {}
          expansion_values.forEach((value, idx) => {
            expansion_address['expansion_' + expansion_keys[idx]] = value
          })
          return {
            ...address,
            ...expansion_address
          }
        })()
      }, dispatch)
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
    <div className="form-box">
      <ModalElement isVisible={isVisible} onSubmit={addItem} />
      <div className="form-box-header">
        Basic Information
      </div>
      <div className="form-box-content">
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Name of the Company</FormLabel>
              <TextField
                variant="outlined"
                {...register("company_name", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Name of the Company (Amharic)</FormLabel>
              <TextField
                variant="outlined"
                {...register("company_name_amharic", formState, dispatch)}
              />
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
              <FormLabel id="demo-radio-buttons-group-label">Region</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_region", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">City</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_city", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Sub-City</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_sub_city", formState, dispatch)}
              />
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
              <FormLabel id="demo-radio-buttons-group-label">Zone</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_zone", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">House Number</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_house_number", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_telephone_direct", formState, dispatch)}
              />
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
              <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_fax", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">PO Box</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_po_box", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
              <TextField
                variant="outlined"
                {...register("business_email", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <div className="impl-h1" style={{ marginTop: 45 }}>
          Company Expansion Address
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Region</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_region", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">City</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_city", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Sub-City</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_sub_city", formState, dispatch)}
              />
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
              <FormLabel id="demo-radio-buttons-group-label">Zone</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_zone", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">House Number</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_house_number", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_telephone_direct", formState, dispatch)}
              />
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
              <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_fax", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">PO Box</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_po_box", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
              <TextField
                variant="outlined"
                {...register("expansion_email", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default BasicInformation