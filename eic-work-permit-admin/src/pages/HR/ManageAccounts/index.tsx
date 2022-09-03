import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Modal } from '@mui/material';
import Footer from 'src/components/Footer';
import InvestmentPermits from './InvestmentPermitCancellations';
import { API as InvestmentPermitAPI, Actions as InvestmentPermitActions, Selectors as InvestmentPermitSelectors } from "src/store/States/Investment/InvestmentPermit"
import { API, Actions, Selectors } from "src/store/States/Investment/InvestmentPermitCancellation"
import { API as AdminAPI, Actions as AdminActions, Selectors as AdminSelectors } from "src/store/States/Admin/"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function ApplicationsInvestmentPermits() {
  const investment_permit_cancellations = useSelector(Selectors.selectInvestmentPermitCancellations)
  const investment_permits = useSelector(InvestmentPermitSelectors.selectInvestmentPermits)
  const admins = useSelector(AdminSelectors.selectAdmins)
  const dispatch = useDispatch()
  useEffect(() => {
    AdminAPI.FetchAdmins((err: any, data: any) => {
      if (err) throw err
      dispatch(AdminActions.setAdmins(data))
    })

    API.FetchInvestmentPermitCancellations({}, (err, data) => {
      if (err) throw err
      dispatch(Actions.setInvestmentPermitCancellations(data))
    })
  }, [dispatch])

  useEffect(() => {
    InvestmentPermitAPI.FetchInvestmentPermits({}, (err, data) => {
      if (err) throw err
      dispatch(InvestmentPermitActions.setInvestmentPermits(data))
    })
  }, [dispatch])

  const [to_be_cancelled_permits, setToBeRenewedPermits] = useState([])

  useEffect(() => {
    const renewals: any[] = []
    investment_permit_cancellations.forEach((item: any) => {
      const foundIndex = investment_permits.findIndex(prop => String(prop._id) === String(item.investment_id))
      if (foundIndex >= 0) {
        renewals.push({
          ...investment_permits[foundIndex],
          ...item
        })
      }
    })
    setToBeRenewedPermits(renewals)
  }, [setToBeRenewedPermits, investment_permits, investment_permit_cancellations])

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
            <InvestmentPermits admins={admins} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsInvestmentPermits;
