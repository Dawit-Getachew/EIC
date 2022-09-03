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
  CardHeader,
  Avatar,
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
import {
  Selectors as BufferSelectors,
  selectServiceID,
} from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import PageHeader from "./ViewPageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { getCorrectDate } from "src/utils/date";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Feedback from "src/components/Feedback/Feedback";

import tempImg from "src/assets/temp.png";

const RenewalFormView = () => {
  const savedBuffer = useSelector(BufferSelectors.selectRenewPermitBuffer);
  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const handleSubmit = (data: any) => {};
  const inputs = [
    "company_name",
    "company_name_amharic",
    "investment_activity",
    "problems_encountered",
    "date_of_commencement",
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
          date_of_commencement: getCorrectDate(
            savedBuffer.date_of_commencement
          ),
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);
  const project_status_types = [
    "Pre-Implementation",
    "Machinery Procurement",
    "Processing Land Acquisition",
    "Machinery Erecting/Installation",
    "Civil Works Construction",
    "Preparation for production/service",
    "Preparation for Production/Services",
    "Other (specify)",
  ];

  return (
    <>
      <Helmet>
        <title>View Investment Permit Renewal</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={savedBuffer.company_name} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {/* <Feedback /> */}

        <Card sx={{ p: 4 }}>
          <CardHeader title="Full User Information" />
          <Grid
            container
            direction="row"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}
          >
            <Grid md={6} item>
              <Grid item md={12} xs={12}>
                <FormControl className="flex-c" style={{ marginTop: 25 }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Full Name
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    style={{ width: 450 }}
                    {...register("company_name", formState, dispatch)}
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl className="flex-c" style={{ marginTop: 25 }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
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
                    Date of Birth
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
                    City
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
                    Country
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    style={{ width: 450 }}
                    {...register("company_name_amharic", formState, dispatch)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid md={6}>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar src={tempImg} sx={{ width: 200, height: 200 }} />
                <Typography variant="h3" sx={{ mt: 5 }}>
                  test@example.com
                </Typography>
                <Typography variant="h3">+251987836547</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default RenewalFormView;
