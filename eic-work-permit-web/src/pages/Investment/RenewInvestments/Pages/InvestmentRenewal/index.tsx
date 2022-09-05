/* eslint-disable */
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
import routes from "src/routes"

const RenewalForm = (props) => {
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
    const project_status = []
    const keys = Object.keys(data)
    const values = Object.values(data)

    keys.forEach((key, idx) => {
      const foundIndex = project_status_types.findIndex(type => String(type) === String(key))
      if (foundIndex >= 0) {
        if (values[idx]) project_status.push(key)
      }
    })

    setIsLoading(true)
    InvestmentPermitRenewalAPI.CreateInvestmentPermitRenewal({
      investment_id: savedBuffer._id, service_id, project_status,
      problems_encountered: data.problems_encountered, date_of_commencement: data.date_of_commencement
    }, (err: any, data: any) => {
      if (err) throw err
      setIsLoading(false)
      _dispatch(InvestmentPermitRenewalActions.AddInvestmentPermitRenewal(data))
      navigate(routes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT.ROUTE, { replace: true })
    })
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
        selectRequriedKeys(inputs, savedBuffer),
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
                  })} />}
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
                  })} />}
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
                  })} />}
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

        <Grid
          container
          width="100%"
          spacing={4}
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? <CircularProgress /> : <Button
            style={{
              color: "white",
              backgroundColor: "#1e447e",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 5,
            }}
            onClick={() => formSubmit(dispatch)}
          >
            Continue
          </Button>}

          <Button
            style={{
              color: "white",
              backgroundColor: "gray",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              marginLeft: 5,
            }}
          >
            Cancel
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default RenewalForm;
