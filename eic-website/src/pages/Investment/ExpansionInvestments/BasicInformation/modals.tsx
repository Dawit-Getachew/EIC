import { Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button } from "@mui/material"
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, getFormData
} from "src/common/form"

interface ModalProps {
  onSubmit: (data: any) => void;
  isVisible: boolean;
}

const countries = ['Ethiopia', 'Eriteria']

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalElement: React.FC<ModalProps> = (props) => {
  const inputs = [
    "name",
    "nationality",
    "country_of_incorporation",
    "address"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  const handleSubmit = (data: any) => {
    props.onSubmit(data)
  }

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])


  return (
    <Modal
      open={props.isVisible}
      onClose={() => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Investor
        </Typography>
        <Grid
          container
          width="100%"
          spacing={3}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Name of Investor</FormLabel>
              <TextField  variant="outlined" {...register("name", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Nationlaity</FormLabel>
              <TextField  variant="outlined" select {...register("nationality", formState, dispatch)}>
                {countries.map(item => (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Country of Incorporation</FormLabel>
              <TextField  variant="outlined" select {...register("country_of_incorporation", formState, dispatch)}>
                {countries.map(item => (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
              <TextField  variant="outlined" {...register("address", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 40 }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={12} xs={12}>
              <Button onClick={() => formSubmit(dispatch)} style={{
                color: 'white',
                backgroundColor: '#1e447e',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
                Add
              </Button>
            </Grid>
          </div>
        </Grid>
      </Box>
    </Modal>
  )
}