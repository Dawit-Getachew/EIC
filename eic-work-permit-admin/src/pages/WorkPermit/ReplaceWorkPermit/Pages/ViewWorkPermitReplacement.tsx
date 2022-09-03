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
  MenuItem
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
  getFormData
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
import { IReplaceReasonType } from "src/store/States/WorkPermit/ReplaceWorkPermit/types"
import '../styles.css'
import './styles.css'
import DownloadElement from "src/components/DownloadElement"

const ViewReplaceWorkPermit = () => {
  const savedBuffer = useSelector(BufferSelectors.selectReplacementPermitBuffer);
  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const handleSubmit = (data: any) => { };
  const inputs = [
    "company_name",
    "reason_type",
    "passport_image",
    "problems_encountered",
    "date_of_commencement",
  ];

  useEffect(() => {
    formSubmit(dispatch);
  }, []);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys(inputs, savedBuffer),
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  console.log("llzz", getFormData(formState, "passport_image"))

  const download_inputs = [
    "passport_image",
    "police_report",
    "damaged_permit"
  ]

  return (
    <>
      <Helmet>
        <title>View Investment Permit Replacement</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={savedBuffer.company_name} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card sx={{ p: 4 }}>
          <CardHeader title="View Work Permit Replacement" />
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
                  Reason for Replacement
                </FormLabel>
                <TextField
                  variant="outlined"
                  style={{ width: 450 }}
                  {...register("reason_type", formState, dispatch)}
                  select
                >
                  {Object.values(IReplaceReasonType).map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="column"
            sx={{ mt: 1 }}
          >
            <DownloadElement
              upload_file_name={"Passport"}
              link={`${getFormData(formState, "passport_image")}`}
            />
            {
              getFormData(formState, "reason_type") === IReplaceReasonType.DAMAGED ? (
                <DownloadElement
                  upload_file_name={"Damaged Work Permit"}
                  link={`${getFormData(formState, "damaged_permit")}`}
                />
              ) : (
                <DownloadElement
                  upload_file_name={"Police Report"}
                  link={`${getFormData(formState, "police_report")}`}
                />
              )
            }
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ViewReplaceWorkPermit;
