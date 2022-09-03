import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import InvestmentPermits from "./InvestmentPermits";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/Investment/InvestmentPermitExpansion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsInvestmentPermits() {
  const investment_permits = useSelector(Selectors.selectInvestmentPermitExpansions);
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchInvestmentPermitExpansions({}, (err, data) => {
      if (err) throw err;
      dispatch(Actions.setInvestmentPermitExpansions(data));
    });
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Investment Expansion</title>
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
            <InvestmentPermits investment_permits={investment_permits? investment_permits : []} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
