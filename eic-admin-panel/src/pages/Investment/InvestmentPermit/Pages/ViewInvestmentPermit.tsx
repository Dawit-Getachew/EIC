import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {
  Grid,
  Container,
  Stepper, Step, StepLabel
} from "@mui/material/";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Actions as BufferActions, Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useDispatch, useSelector } from "react-redux"
import BasicInformation from "./Tabs/BasicInformation"
import Address from "./Tabs/Address"
import InvestmentDetail from "./Tabs/InvestmentDetail"
import SourceOfFinance from "./Tabs/SourceOfFinance"
import DocumentAttach from "./Tabs/DocumentAttach"
import Feedback from "src/components/Feedback/Feedback"

const CreateInvestmentPermit: React.FC<any> = () => {
  const dispatch = useDispatch()
  const selectedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  const steps = [
    'Basic Information',
    'Address',
    'Investment Detail',
    'Investment Detail (Cont.)',
    'Document Attach'
  ];

  const [activeStep, setActiveStep] = useState(0)
  const [pageClickCount, setPageClickCount] = useState(0)

  const nextPage = (data: any) => {
    setActiveStep(Math.min(4, activeStep + 1))
  }

  const prevPage = (data: any) => {
    setActiveStep(Math.max(0, activeStep - 1))
  }

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  return (
    <>
      <Helmet>
        <title>Investment Permit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={selectedBuffer.company_name} data={selectedBuffer} />
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
            <form>
              <Card sx={{ p: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel className="stepper-container" style={{ background: 'white' }}>
                  {steps.map((label, idx) => (
                    <Step key={label} onClick={() => setActiveStep(idx)} style={{ cursor: "pointer" }}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === 0 && <BasicInformation pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 1 && <Address pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 2 && <InvestmentDetail pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 3 && <SourceOfFinance pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 4 && <DocumentAttach pageClickCount={pageClickCount} nextPage={nextPage} />}
                <Grid
                  container
                  spacing={3}
                  style={{
                    marginTop: 15,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    md={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={prevPage}
                    >
                      Previous
                    </Button>
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={nextPage}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </form>
          </Grid>
        </Grid>
        <Feedback subject='About Work Permit Updates' investor_id={`${savedBuffer.investor_id}`} />
      </Container>
    </>
  );
};

export default CreateInvestmentPermit;
