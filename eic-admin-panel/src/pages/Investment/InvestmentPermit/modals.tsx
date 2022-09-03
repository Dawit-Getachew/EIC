import {
  Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button,
  IconButton, useTheme, CircularProgress
} from "@mui/material"
import PrintIcon from "@mui/icons-material/Print";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, getFormData
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useDispatch } from "react-redux"
import { Actions as InvestmentPermitActions, API as InvestmentPermitAPI } from "src/store/States/Investment/InvestmentPermit/"
interface ModalProps {
  _id: string;
  onSubmit: (data: any) => void;
  isVisible: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalElement: React.FC<ModalProps> = (props) => {
  const theme = useTheme();
  const _dispatch = useDispatch()
  const inputs = [
    "tin_number",
    "registration_number"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)
  const [isLoading, setIsLoading] = useState(false)
  const onEditTinRegNumber = (data: any) => {
    setIsLoading(true)
    InvestmentPermitAPI.UpdateTinRegNumber({
      _id: props._id,
      tin_number: String(data.tin_number),
      registration_number: String(data.registration_number),
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        setIsLoading(false)
        _dispatch(InvestmentPermitActions.UpdateInvestmentPermits(data))
        props.onSubmit({})
      }
    })
  }

  useEffect(() => {
    setFormDefaults(inputs, onEditTinRegNumber, dispatch)
  }, [dispatch])

  return (
    <Modal
      open={props.isVisible}
      onClose={() => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
        >
          <Grid item md={12}>
            <Typography variant="h2">
              Edit Tin & Registration Number
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Registration Number</FormLabel>
              <TextField variant="outlined" {...register("registration_number", formState, dispatch)} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Tin Number</FormLabel>
              <TextField variant="outlined" {...register("tin_number", formState, dispatch)} />
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
          <Grid item md={5} xs={12} display="flex" justifyContent="center">
            {isLoading ? <CircularProgress /> : <IconButton
              sx={{
                '&:hover': {
                  background: theme.colors.primary.lighter
                },
                color: theme.palette.primary.main
              }}
              onClick={() => formSubmit(dispatch)}
            >
              <EditTwoToneIcon />
            </IconButton>}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}