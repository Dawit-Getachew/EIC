import { Container, Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import PageHeader from "./PageHeader"
import AssignWork from "./AssignWork"

const AssignWorkContainer = () => {
  return (
    <>
      <Helmet>
        <title>EIC - Assign Investment Permit</title>
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
            <AssignWork />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default AssignWorkContainer