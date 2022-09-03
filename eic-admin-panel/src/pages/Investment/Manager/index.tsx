import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Modal } from '@mui/material';
import Footer from 'src/components/Footer';
import Managers from './Managers';
import { API, Actions, Selectors } from "src/store/States/Investment/Manager"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function ApplicationsManagers() {
  const business_profiles = useSelector(Selectors.selectManagers)
  const dispatch = useDispatch()
  useEffect(() => {
    API.FetchManagers((err, data) => {
      if (err) throw err
      dispatch(Actions.FetchedManagers(data))
    })
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Business Profile</title>
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
            <Managers business_profiles={business_profiles} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsManagers;
