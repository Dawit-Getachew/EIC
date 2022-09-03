import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Modal } from '@mui/material';
import Footer from 'src/components/Footer';
import InvestmentPermits from './InvestmentPermits';
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { API, Actions, Selectors } from "src/store/States/Investment/InvestmentPermit"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function ApplicationsInvestmentPermits() {
  const investment_permits = useSelector(Selectors.selectInvestmentPermits)
  const dispatch = useDispatch()
  const userObj = useSelector(BufferSelectors.selectUserObject) as any
  useEffect(() => {
    if (userObj) {
      if (Object.keys(userObj).length > 0) {
        API.FetchAdminInvestmentPermitsBody({ _id: `${userObj._id}`, role: `${userObj.role}` }, (err, data) => {
          if (err) throw err
          dispatch(Actions.setInvestmentPermits(data))
        })
      }
    }
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Investment Permit</title>
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
            <InvestmentPermits investment_permits={investment_permits} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
