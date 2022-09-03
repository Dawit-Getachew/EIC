import {
  Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button,
  RadioGroup, Radio, FormControlLabel, Select, CircularProgress
} from "@mui/material"
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, registerForm, selectRequriedKeys
} from "src/common/form"
import { IRoleAccount } from "src/common/interface"

interface ModalProps {
  onSubmit: (data: any) => void;
  isVisible: boolean;
  admins: any[];
  title: string;
  isLoading: boolean;
  data: any;
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

export const AssignInvestmentPermitToEmployee: React.FC<ModalProps> = (props) => {
  const inputs = [
    "case_worker",
    "team_leader",
    "director"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  const handleSubmit = (data: any) => {
    props.onSubmit(data)
  }

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

  useEffect(() => {
    if (props.data) {
      if (Object.keys(props.data).length > 0) {
        if (props.data.assignedTo && props.data.isAssigned) {
          FormActions.UpdateFormData(
            {
              ...selectRequriedKeys([...inputs], {
                ...props.data.assignedTo
              })
            },
            dispatch
          );
        }
      }
    }
  }, [props.data, dispatch]);

  return (
    <Modal
      open={props.isVisible}
      onClose={props.isLoading ? () => null : () => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h3">
          Assign Employees for Work Permit {props.title}
        </Typography>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mt: 1 }}
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Case Worker</FormLabel>
              <Select variant="outlined" {...register("case_worker", formState, dispatch)}>
                {props.admins.filter(item => item.role === IRoleAccount.CASE_WORKER).map(item => (
                  <MenuItem key={item._id} value={item._id}>{`${item.first_name} ${item.last_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Team Leader</FormLabel>
              <Select variant="outlined" {...register("team_leader", formState, dispatch)}>
                {props.admins.filter(item => item.role === IRoleAccount.TEAM_LEADER).map(item => (
                  <MenuItem key={item._id} value={item._id}>{`${item.first_name} ${item.last_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Director</FormLabel>
              <Select variant="outlined" {...register("director", formState, dispatch)}>
                {props.admins.filter(item => item.role === IRoleAccount.DIRECTOR).map(item => (
                  <MenuItem key={item._id} value={item._id}>{`${item.first_name} ${item.last_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid item md={4} xs={12} justifyContent="center">
            <Button onClick={() => formSubmit(dispatch)} fullWidth variant="contained" color="secondary" disabled={props.isLoading}>
              {props.isLoading ? <CircularProgress color="success" /> : "Assign Employees"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}