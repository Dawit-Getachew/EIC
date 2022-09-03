import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "../styles.css";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  getFormError,
  FormActions,
  registerForm,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors, selectServiceID } from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux";
import { API as InvestmentPermitRenewalAPI, Actions as InvestmentPermitRenewalActions } from "src/store/States/InvestmentPermitRenewal"
import { useNavigate } from "react-router"
import PageHeader from "./PageHeader"
import { getCorrectDate } from "src/utils/date"

const ViewRenewalForm: FC<any> = (props) => {
  const inputs = [
    "company_name",
    "investment_activity",
    "problems_encountered",
    "date_of_commencement"
  ];

  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const _dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const project_status_types = [
    'Pre-Implementation',
    'Machinery Procurement',
    'Processing Land Acquisition',
    'Machinery Erecting/Installation',
    'Civil Works Construction',
    'Preparation for production/service',
    'Preparation for Production/Services',
    'Other (specify)'
  ]
  const savedBuffer = useSelector(BufferSelectors.selectRenewPermitBuffer);
  const service_id = useSelector(selectServiceID)
  const handleSubmit = (data: any) => {
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (rows.length > 0) {
      FormActions.UpdateFormInput(
        { name: "shareholders", value: rows },
        dispatch
      );
    }
  }, [rows]);


  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys(inputs, savedBuffer),
          date_of_commencement: getCorrectDate(savedBuffer.date_of_commencement)
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    if (savedBuffer.shareholders) {
      if (savedBuffer.shareholders.length > 0) {
        setRows(savedBuffer.shareholders);
      }
    }
  }, [savedBuffer.shareholders, setRows]);

  return (
    <>
      <PageHeader />
      <div className="form-box">
        <div className="form-box-header">Renewal of Investment Permit</div>
        <div className="form-box-content">
          <Grid container width="100%" spacing={4}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investor / Company Name
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("company_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investment Activity
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("investment_activity", formState, dispatch)}
                  multiline
                  rows={2}
                  maxRows={4}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "5px" }}>
            <Grid item md={12} xs={12}>
              <Typography variant={"h4"} fontWeight="normal">
                Project Status
              </Typography>
              {getFormError(formState, "project_status").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "project_status").helperText}</p>
              ) : <></>}
            </Grid>

            {project_status_types.slice(0, 3).map(item => (
              <Grid item md={4} xs={12}>
                <FormControl className="flex-c">
                  <FormControlLabel
                    control={<Checkbox {...registerForm({
                      name: item, formState, dispatch, isCheckbox: true
                    })} checked={(() => {
                      if (savedBuffer.project_status) {
                        return savedBuffer.project_status.findIndex(status => String(status) === String(item)) >= 0
                      }
                      return false
                    })()} />}
                    label={item}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Grid container width="100%" spacing={4}>
            {project_status_types.slice(3, 6).map(item => (
              <Grid item md={4} xs={12}>
                <FormControl className="flex-c">
                  <FormControlLabel
                    control={<Checkbox {...registerForm({
                      name: item, formState, dispatch, isCheckbox: true
                    })} checked={(() => {
                      if (savedBuffer.project_status) {
                        return savedBuffer.project_status.findIndex(status => String(status) === String(item)) >= 0
                      }
                      return false
                    })()} />}
                    label={item}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Grid container width="100%" spacing={4}>
            {project_status_types.slice(6, 8).map(item => (
              <Grid item md={4} xs={12}>
                <FormControl className="flex-c">
                  <FormControlLabel
                    control={<Checkbox {...registerForm({
                      name: item, formState, dispatch, isCheckbox: true
                    })} checked={(() => {
                      if (savedBuffer.project_status) {
                        return savedBuffer.project_status.findIndex(status => String(status) === String(item)) >= 0
                      }
                      return false
                    })()} />}
                    label={item}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "1px" }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "4px" }}
                >
                  Indicate major problems encountered (if any)
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("problems_encountered", formState, dispatch)}
                  multiline
                  rows={2}
                  maxRows={4}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "1px" }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "4px" }}
                >
                  Expected date of commencement of production/service of project
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  type="date"
                  {...register("date_of_commencement", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ViewRenewalForm
