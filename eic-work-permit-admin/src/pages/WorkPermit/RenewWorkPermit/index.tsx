import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import RenewWorkPermits from "./RenewWorkPermits";
import {
  API as WorkPermitAPI,
  Actions as WorkPermitActions,
  Selectors as WorkPermitSelectors,
} from "src/store/States/WorkPermit/WorkPermitApplications/";
import {
  API as RenewWorkPermitAPI,
  Actions as RenewWorkPermitActions,
  Selectors as RenewWorkPermitSelectors,
} from "src/store/States/Investment/RenewWorkPermit"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsRenewWorkPermits() {
  const work_permits = useSelector(WorkPermitSelectors.selectWorkPermits);
  const dispatch = useDispatch();
  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err, data) => {
      if (err) throw err;
      dispatch(WorkPermitActions.setWorkPermits(data));
    });
    RenewWorkPermitAPI.FetchRenewWorkPermits((err, data) => {
      if (err) throw err
      dispatch(RenewWorkPermitActions.setRenewWorkPermits(data))
    })

  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Renew Work Permit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RenewWorkPermits work_permits={work_permits} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsRenewWorkPermits;
