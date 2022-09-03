import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import BusinessProfiles from "./BusinessProfiles";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/Investment/BusinessProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsBusinessProfiles() {
  const business_profiles = useSelector(Selectors.selectBusinessProfiles);
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchBusinessProfiles((err, data) => {
      if (err) throw err;
      dispatch(Actions.FetchedBusinessProfiles(data));
    });
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Business Profile</title>
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
            <BusinessProfiles business_profiles={business_profiles} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsBusinessProfiles;
