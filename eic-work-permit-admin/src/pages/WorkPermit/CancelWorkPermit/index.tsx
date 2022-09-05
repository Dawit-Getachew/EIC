/* eslint-disable */
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import WorkPermitCancellations from "./WorkPermitCancellations";
import {
  API as WorkPermitAPI,
  Actions as WorkPermitActions,
  Selectors as WorkPermitSelectors,
} from "src/store/States/WorkPermit/WorkPermitApplications/";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/WorkPermit/CancelWorkPermit/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsCancelmentWorkPermit() {
  const investment_permit_cancelments = useSelector(
    Selectors.selectCancelWorkPermits
  );
  const investment_permits = useSelector(
    WorkPermitSelectors.selectWorkPermits
  );
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchCancelWorkPermits((err: any, data: any) => {
      if (err) throw err;
      dispatch(Actions.setCancelWorkPermits(data));
    });
  }, [dispatch]);

  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err: any, data: any) => {
      if (err) throw err;
      dispatch(WorkPermitActions.setWorkPermits(data));
    });
  }, [dispatch]);

  const [to_be_canceled_permits, setToBeCanceledPermits] = useState([]);

  console.log("aa", {
    investment_permit_cancelments,
    investment_permits,
  });
  useEffect(() => {
    const cancelments: any[] = [];
    if (investment_permit_cancelments) {
      investment_permit_cancelments.forEach((item: any) => {
        const foundIndex = investment_permits.findIndex(
          (prop) => String(prop._id) === String(item.work_permit_id)
        );
        if (foundIndex >= 0) {
          cancelments.push({
            ...investment_permits[foundIndex],
            ...item,
          });
        }
      });
    }
    setToBeCanceledPermits(cancelments);
  }, [setToBeCanceledPermits, investment_permits, investment_permit_cancelments]);
  return (
    <>
      <Helmet>
        <title>Cancel Work Permit</title>
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
            <WorkPermitCancellations
              work_permit_cancellations={to_be_canceled_permits}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsCancelmentWorkPermit;
