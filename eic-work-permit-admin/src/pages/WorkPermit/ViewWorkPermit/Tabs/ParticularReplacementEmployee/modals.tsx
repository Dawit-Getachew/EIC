/* eslint-disable */
import {
  Modal, Box, Grid, FormControl, FormLabel, TextField,
  RadioGroup, Radio, FormControlLabel
} from "@mui/material"
import React, { useReducer, useEffect } from "react"
import {
  formInitState, formReducer, register, setFormDefaults,
  getFormError, FormActions, registerForm, selectRequriedKeys
} from "src/common/form"
import { getCommonDate } from "src/store/Helpers/date"
import "../styles.css"
import "./styles.css"

interface ModalProps {
  onSubmit: (data: any) => void;
  isVisible: boolean;
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

export const ViewReplacementEmployeeModalElement: React.FC<ModalProps> = (props) => {
  const inputs = [
    "name",
    "age",
    "gender",
    "full_address",
    "description_of_academic_credentials_and_experience",
    "content_of_training_program_designed_to_replace_the_expat",
    "type_of_training",
    "start_training_at",
    "end_training_at",
    "handover_time",
    "estimate_of_total_time_required_to_transfer_knowledge_and_skills"
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
        FormActions.UpdateFormData(
          {
            ...selectRequriedKeys([...inputs], {
              ...props.data
            }),
            start_training_at: getCommonDate(props.data.start_training_at),
            end_training_at: getCommonDate(props.data.end_training_at),
            handover_time: getCommonDate(props.data.handover_time),
          },
          dispatch
        );
      }
    }
  }, [props.data, dispatch]);

  return (
    <Modal
      open={props.isVisible}
      onClose={() => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="form-box-header">Add Employee</div>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          
        </Typography> */}
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
              <FormLabel id="demo-radio-buttons-group-label">Estimate of total time required to transfer knowledge and skills</FormLabel>
              <TextField variant="outlined"  {...register("estimate_of_total_time_required_to_transfer_knowledge_and_skills", formState, dispatch)} />
            </FormControl>
          </Grid>
        </Grid>
        <div className="form-box">
          <div className="form-box-header">Training Schedule</div>
          <div className="form-box-content">
            <Grid
              container
              width="100%"
              spacing={3}
              justifyContent="space-between"
            >
              <Grid item md={6} xs={12}>
                <FormControl className="flex-c" style={{ marginTop: 25 }}>
                  <FormLabel id="demo-radio-buttons-group-label">Type of Training</FormLabel>
                  <TextField variant="outlined"  {...register("type_of_training", formState, dispatch)} />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl className="flex-c" style={{ marginTop: 25 }}>
                  <FormLabel id="demo-radio-buttons-group-label">Hand Over Time</FormLabel>
                  <TextField variant="outlined" type="date" {...register("handover_time", formState, dispatch)} />
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
                  <FormLabel id="demo-radio-buttons-group-label">Training Starts At</FormLabel>
                  <TextField variant="outlined" type="date" {...register("start_training_at", formState, dispatch)} />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl className="flex-c" style={{ marginTop: 25 }}>
                  <FormLabel id="demo-radio-buttons-group-label">Training Ends At</FormLabel>
                  <TextField variant="outlined" type="date" {...register("end_training_at", formState, dispatch)} />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  )
}