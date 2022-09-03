import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Container,
  Card,
  CardHeader
} from "@mui/material";
import Typography from "@mui/material/Typography";
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
import { useNavigate } from "react-router"
import { Helmet } from "react-helmet-async";
import PageHeader from "./ViewPageHeader"
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { getCorrectDate } from "src/utils/date"

const RenewalFormView = () => {
  const savedBuffer = useSelector(BufferSelectors.selectRenewPermitBuffer);
  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const handleSubmit = (data: any) => {

  };
  const inputs = [
    "company_name",
    "company_name_amharic",
    "investment_activity",
    "problems_encountered",
    "date_of_commencement"
  ];

  useEffect(() => {
    formSubmit(dispatch);
  }, []);

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

  return (
    <>
      <Helmet>
        <title>View Investment Permit Renewal</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={savedBuffer.company_name} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card sx={{ p: 4 }}>
          <CardHeader
            title="View Investment Permit Renewal"
          />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investor / Company Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  style={{ width: 450 }}
                  {...register("company_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  የኩባንያው ስም
                </FormLabel>
                <TextField
                  variant="outlined"
                  style={{ width: 450 }}
                  {...register("company_name_amharic", formState, dispatch)}
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
                  style={{ width: 450 }}
                  {...register("investment_activity", formState, dispatch)}
                  multiline
                  rows={2}
                  maxRows={4}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
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
                    style={{ width: 450 }}
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
                    style={{ width: 450 }}
                    {...register("date_of_commencement", formState, dispatch)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default RenewalFormView;