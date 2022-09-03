import React, { useState } from "react"
import {
  Grid, TextField, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, TextareaAutosize
} from '@mui/material';
import '../styles.css'
import './investment_styles.css'

export default () => {
  const sectors = ['Agriculture', 'Industry', 'Service']
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
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Sector</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {sectors.map(item => (
                    <FormControlLabel value={item} control={<Radio />} label={item} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">Investment Activity</FormLabel>
                <TextareaAutosize className="default-text-area" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">Brief description of the project objectivies and major activities</FormLabel>
                <TextareaAutosize className="default-text-area" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <div className="invest-title">
            Investment Location
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
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">P.O. Box</FormLabel>
                <TextField className="default-input" variant="outlined" />
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
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Land Size (in square meter)</FormLabel>
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
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Amount of investment capital (in United States Dollar and Ethiopian Birr)</FormLabel>
                <TextField className="long-input" variant="outlined" placeholder="USD" style={{ marginBottom: 15 }} />
                <TextField className="long-input" variant="outlined" placeholder="ETB" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}