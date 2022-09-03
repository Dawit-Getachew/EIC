import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Modal } from "@mui/material";
import Footer from "src/components/Footer";
import WorkPermitReplacements from "./WorkPermitReplacements";
import {
  API as WorkPermitAPI,
  Actions as WorkPermitActions,
  Selectors as WorkPermitSelectors,
} from "src/store/States/WorkPermit/WorkPermitApplications/";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/WorkPermit/ReplaceWorkPermit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ApplicationsReplacementWorkPermit() {
  const investment_permit_replacements = useSelector(
    Selectors.selectReplaceWorkPermits
  );
  const investment_permits = useSelector(
    WorkPermitSelectors.selectWorkPermits
  );
  const dispatch = useDispatch();
  useEffect(() => {
    API.FetchReplaceWorkPermits((err, data) => {
      if (err) throw err;
      dispatch(Actions.setReplaceWorkPermits(data));
    });
  }, [dispatch]);

  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err, data) => {
      if (err) throw err;
      dispatch(WorkPermitActions.setWorkPermits(data));
    });
  }, [dispatch]);

  const [to_be_replaced_permits, setToBeReplaceedPermits] = useState([]);

  console.log("aa", {
    investment_permit_replacements,
    investment_permits,
  });
  useEffect(() => {
    const replacements: any[] = [];
    if (investment_permit_replacements) {
      investment_permit_replacements.forEach((item: any) => {
        const foundIndex = investment_permits.findIndex(
          (prop) => String(prop._id) === String(item.work_permit_id)
        );
        if (foundIndex >= 0) {
          replacements.push({
            ...investment_permits[foundIndex],
            ...item,
          });
        }
      });
    }
    setToBeReplaceedPermits(replacements);
  }, [setToBeReplaceedPermits, investment_permits, investment_permit_replacements]);
  return (
    <>
      <Helmet>
        <title>Replace Work Permit</title>
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
            <WorkPermitReplacements
              work_permit_replacements={to_be_replaced_permits}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsReplacementWorkPermit;
