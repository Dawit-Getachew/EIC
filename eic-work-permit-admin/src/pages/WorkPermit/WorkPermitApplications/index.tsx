import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import InvestmentPermits from "./WorkPermits";
// import {
//   API,
//   Actions,
//   Selectors,
// } from "src/store/States/Investment/InvestmentPermit";
import {
  API, Actions, Selectors
} from "src/store/States/WorkPermit/WorkPermitApplications/"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Selectors as BufferSelectors } from "src/store/States/Buffer"

function ApplicationsInvestmentPermits() {
  const userObj = useSelector(BufferSelectors.selectUserObject)
  const work_permits = useSelector(Selectors.selectWorkPermits);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userObj) {
      if (userObj._id && userObj.role) {
        API.FetchAdminWorkPermits({
          _id: userObj._id,
          role: userObj.role
        }, (err: any, data: any) => {
          if (err) throw err;
          dispatch(Actions.setWorkPermits(data));
        });
      }
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Work Permit</title>
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
            <InvestmentPermits work_permits={work_permits} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
