import React, { useState } from "react"
import {
  Grid, TextField, FormControl, FormLabel
} from '@mui/material';
import '../styles.css'
import './address_styles.css'

export default () => {
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
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Region</FormLabel>
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">City</FormLabel>
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Sub-City</FormLabel>
              <TextField className="default-input" variant="outlined" />
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
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Wereda/Kebele</FormLabel>
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">House Number</FormLabel>
              <TextField className="default-input" variant="outlined" />
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
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
              <TextField className="default-input" variant="outlined" />
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
              <FormLabel id="demo-radio-buttons-group-label">P.O. Box</FormLabel>
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email Address</FormLabel>
              <TextField className="default-input" variant="outlined" type="email" />
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
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">P.O Box</FormLabel>
              <TextField className="default-input" variant="outlined" type="email" />
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
              <TextField className="default-input" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Email Address</FormLabel>
              <TextField className="default-input" variant="outlined" type="email" />
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
              <TextField className="long-input" variant="outlined" />
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
              <TextField className="default-input" variant="outlined" type="tel" />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telephone Number #2</FormLabel>
              <TextField className="default-input" variant="outlined" type="tel" />
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
              <TextField className="long-input" variant="outlined" type="email" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
        </Grid>
      </div>
    </div>
  )
}