import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import RenewWorkPermits from "./RenewWorkPermits";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/Investment/WorkPermit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsRenewWorkPermits() {
  const business_profiles = useSelector(Selectors.selectWorkPermits);
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchWorkPermits((err, data) => {
      if (err) throw err;
      dispatch(Actions.FetchedWorkPermits(data));
    });
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
            <RenewWorkPermits work_permits={business_profiles} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsRenewWorkPermits;
