import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import InvestmentPermits from "./InvestmentPermitRenewals";
import {
  API as WorkPermitAPI,
  Actions as WorkPermitActions,
  Selectors as WorkPermitSelectors,
} from "src/store/States/WorkPermit/WorkPermitApplications/";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/Investment/RenewWorkPermit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsInvestmentPermits() {
  const investment_permit_renewals = useSelector(
    Selectors.selectRenewWorkPermits
  );
  const investment_permits = useSelector(
    WorkPermitSelectors.selectWorkPermits
  );
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchRenewWorkPermits((err, data) => {
      if (err) throw err;
      dispatch(Actions.setRenewWorkPermits(data));
    });
  }, [dispatch]);

  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err, data) => {
      if (err) throw err;
      dispatch(WorkPermitActions.setWorkPermits(data));
    });
  }, [dispatch]);

  const [to_be_renewed_permits, setToBeRenewedPermits] = useState([]);

  console.log("aa", {
    investment_permit_renewals,
    investment_permits,
  });
  useEffect(() => {
    const renewals: any[] = [];
    if (investment_permit_renewals) {
      investment_permit_renewals.forEach((item: any) => {
        const foundIndex = investment_permits.findIndex(
          (prop) => String(prop._id) === String(item.work_permit_id)
        );
        if (foundIndex >= 0) {
          renewals.push({
            ...investment_permits[foundIndex],
            ...item,
          });
        }
      });
    }
    setToBeRenewedPermits(renewals);
  }, [setToBeRenewedPermits, investment_permits, investment_permit_renewals]);
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
            <InvestmentPermits
              investment_permit_renewals={to_be_renewed_permits}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
