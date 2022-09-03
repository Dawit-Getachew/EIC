import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Grid, Container, Stepper, Step, StepLabel } from "@mui/material/";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Actions as BufferActions,
  Selectors as BufferSelectors,
} from "src/store/States/Buffer";
import { useDispatch, useSelector } from "react-redux";
import ViewPermitAmmendment from "./PermitAmendment";

const CreateInvestmentPermit: React.FC<any> = () => {
  const dispatch = useDispatch();
  const selectedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  const steps = [
    "Basic Information",
    "Address",
    "Investment Detail",
    "Investment Detail (Cont.)",
    "Document Attach",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);

  const nextPage = (data: any) => {
    setActiveStep(Math.min(4, activeStep + 1));
  };

  const prevPage = (data: any) => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  return (
    <>
      <Helmet>
        <title>Investment Permit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={selectedBuffer.company_name} data={selectedBuffer} />
      </PageTitleWrapper>
      <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <form>
              <Card sx={{ p: 4 }}>
                <ViewPermitAmmendment
                  pageClickCount={pageClickCount}
                  nextPage={nextPage}
                />
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateInvestmentPermit;
