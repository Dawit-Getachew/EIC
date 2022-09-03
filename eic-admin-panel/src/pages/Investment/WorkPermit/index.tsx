import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Modal } from '@mui/material';
import Footer from 'src/components/Footer';
import WorkPermits from './WorkPermits';
import { API as WorkPermitAPI, Actions as WorkPermitActions, Selectors } from "src/store/States/Investment/WorkPermit"
import { API as ProjectAPI, Actions as ProjectActions} from "src/store/States/Investment/Project"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

function ApplicationsWorkPermits() {
  const business_profiles = useSelector(Selectors.selectWorkPermits)
  const dispatch = useDispatch()
  useEffect(() => {
    WorkPermitAPI.FetchWorkPermits((err, data) => {
      if (err) throw err
      dispatch(WorkPermitActions.FetchedWorkPermits(data))
    })

    ProjectAPI.FetchProjects((err, data) => {
      if (err) throw err
      dispatch(ProjectActions.FetchedProjects(data))
    })
  }, [dispatch])

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
            <WorkPermits work_permits={business_profiles} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsWorkPermits;
