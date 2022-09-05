/* eslint-disable */
import {
  Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button,
  RadioGroup, Radio, FormControlLabel
} from "@mui/material"
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, registerForm
} from "src/common/form"
import units from "src/common/units"

interface ModalProps {
  onSubmit: (data: any) => void;
  isVisible: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AddReplacementEmployeeModalElement: React.FC<ModalProps> = (props) => {
  const inputs = [
    "name",
    "age",
    "gender",
    "full_address",
    "description_of_academic_credentials_and_experience",
    "content_of_training_program_designed_to_replace_the_expat",
    "schedule_of_training_program",
    "estimate_of_total_time_required_to_transfer_knowledge_and_skills"
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
          Add Employee
        </Typography>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Name of replacement employee</FormLabel>
              <TextField variant="outlined" {...register("name", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-both-center" style={{ marginTop: 25 }}>
              <div className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Age</FormLabel>
                <TextField variant="outlined" type="number" {...register("age", formState, dispatch)} />
              </div>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              {getFormError(formState, "gender").error ? (
                <p style={{ color: "red" }}>
                  {getFormError(formState, "gender").helperText}
                </p>
              ) : (
                <></>
              )}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {["Female", "Male"].map((item) => (
                  <FormControlLabel
                    value={item}
                    control={
                      <Radio
                        {...registerForm({
                          name: "gender",
                          formState,
                          dispatch,
                          exactValue: item,
                        })}
                      />
                    }
                    label={item}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Full Address, Contact Detail</FormLabel>
              <TextField variant="outlined" {...register("full_address", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Description of academic credentials and experience</FormLabel>
              <TextField variant="outlined" {...register("description_of_academic_credentials_and_experience", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Content of training program designed to replace the expat(use annex):</FormLabel>
              <TextField variant="outlined" {...register("content_of_training_program_designed_to_replace_the_expat", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Schedule of training program</FormLabel>
              <TextField variant="outlined"  {...register("schedule_of_training_program", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item md={8} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Estimate of total time required to transfer knowledge and skills</FormLabel>
              <TextField variant="outlined"  {...register("estimate_of_total_time_required_to_transfer_knowledge_and_skills", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} xs={12} justifyContent="center">
            <div className="flex-both-center">
              <Button onClick={() => formSubmit(dispatch)} style={{
                color: 'white',
                backgroundColor: '#1e447e',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: 25
              }}>
                Add Employee
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}