import React, { useState, useReducer, useEffect, FC } from "react"
import {
  MenuItem, Grid, TextField, Button, Box,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

const ProjectImplementationElement: FC<Props> = (props) => {
  const inputs = [
    "starting_date",
    "ending_date",
    "project_devt_feasibility_study",
    "land_acquisition",
    "building_civil_work",
    "electricity_utility",
    "water_utility",
    "telecom_utility",
    "other_utility",
    "machinery_procurement_purchase",
    "reaching_machinery_at_project_site",
    "work_permit_for_technician",
    "machinery_erection_installation",
    "preparation_of_raw_material",
    "co_missing_machines_make_ready_for_operator",
    "common_cement_product_service",
    "any_other",
  ]
  const [formState, dispatch] = useReducer(formReducer, formInitState)

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

  const handleSubmit = (data: any) => {
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

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(selectRequriedKeys(inputs, savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  useEffect(() => {
    if (savedBuffer.shareholders) {
      if (savedBuffer.shareholders.length > 0) {
        setRows(savedBuffer.shareholders)
      }
    }
  }, [savedBuffer.shareholders, setRows])

  console.log('formState', formState)

  return (
    <div className="form-box">
      <ModalElement isVisible={isVisible} onSubmit={addItem} />
      <div className="form-box-header">
        Project Implememntation
      </div>
      <div className="form-box-content">
        <Grid
          container
          width="100%"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Statring Date</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("starting_date", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Ending Date</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("ending_date", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <div className="impl-h1">
          Detail Activities and implementation time
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
          alignItems="center"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Project Development and feasibility study</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("project_devt_feasibility_study", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Land acquisition</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("land_acquisition", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Building/Civil work</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("building_civil_work", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <div className="impl-h2">
          Public utility acquisition
        </div>
        <Grid
          container
          width="100%"
          spacing={4}
          alignItems="center"
        >
          <Grid item md={3} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Electricity</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("electricity_utility", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Water</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("water_utility", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Telecom</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("telecom_utility", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">If other</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("other_utility", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
          alignItems="center"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Machinery of procurement purchase</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("machinery_procurement_purchase", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Reaching of machinery at project site</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("reaching_machinery_at_project_site", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Work permit for technician</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("work_permit_for_technician", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
          alignItems="center"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Machinery Erection Installation</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("machinery_erection_installation", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Preparation of raw materials</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("preparation_of_raw_material", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Co missing machines and make ready for operator</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("co_missing_machines_make_ready_for_operator", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
          alignItems="center"
        >
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Common cement of product service</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("common_cement_product_service", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Any other</FormLabel>
              <TextField
                
                variant="outlined"
                type="date"
                {...register("any_other", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div >
  )
}

export default ProjectImplementationElement