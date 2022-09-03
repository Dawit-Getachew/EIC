import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import InvestmentPermits from "./InvestmentPermitCancellations";
import {
  API as InvestmentPermitAPI,
  Actions as InvestmentPermitActions,
  Selectors as InvestmentPermitSelectors,
} from "src/store/States/Investment/InvestmentPermit";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/Investment/InvestmentPermitCancellation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsInvestmentPermits() {
  const investment_permit_cancellations = useSelector(
    Selectors.selectInvestmentPermitCancellations
  );
  const investment_permits = useSelector(
    InvestmentPermitSelectors.selectInvestmentPermits
  );
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchInvestmentPermitCancellations({}, (err, data) => {
      if (err) throw err;
      dispatch(Actions.setInvestmentPermitCancellations(data));
    });
  }, [dispatch]);

  useEffect(() => {
    InvestmentPermitAPI.FetchInvestmentPermits({}, (err, data) => {
      if (err) throw err;
      dispatch(InvestmentPermitActions.setInvestmentPermits(data));
    });
  }, [dispatch]);

  const [to_be_cancelled_permits, setToBeRenewedPermits] = useState([]);

  useEffect(() => {
    const renewals: any[] = [];
    investment_permit_cancellations.forEach((item: any) => {
      const foundIndex = investment_permits.findIndex(
        (prop) => String(prop._id) === String(item.investment_id)
      );
      if (foundIndex >= 0) {
        renewals.push({
          ...investment_permits[foundIndex],
          ...item,
        });
      }
    });
    setToBeRenewedPermits(renewals);
  }, [
    setToBeRenewedPermits,
    investment_permits,
    investment_permit_cancellations,
  ]);

  return (
    <>
      <Helmet>
        <title>Company Name Registration</title>
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
            <InvestmentPermits
              investment_permit_cancellations={to_be_cancelled_permits}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
