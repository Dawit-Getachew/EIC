/* eslint-disable */
import { useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Container,
  Card,
  CardHeader,
  MenuItem
} from "@mui/material";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
  getFormData
} from "src/common/form";
import {
  Selectors as BufferSelectors,
} from "src/store/States/Buffer";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import PageHeader from "./ViewPageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { IReplaceReasonType } from "src/store/States/WorkPermit/ReplaceWorkPermit/types"
import '../styles.css'
import './styles.css'

const ViewCancelWorkPermit = () => {
  const savedBuffer = useSelector(BufferSelectors.selectCancellationPermitBuffer);
  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const handleSubmit = (data: any) => { };
  const inputs = [
    "company_name",
    "reason_type",
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


  return (
    <>
      <Helmet>
        <title>View Work Permit Cancellation Request</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={savedBuffer.company_name} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card sx={{ p: 4 }}>
          <CardHeader title="View Work Permit Cancellation Request" />
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
                  /
                >
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ViewCancelWorkPermit;