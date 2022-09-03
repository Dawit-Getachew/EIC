import { useEffect } from "react";
import Card from "@mui/material/Card";
import {
  Grid, Box, Container, Tab,
} from "@mui/material/";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

// tab pages
import ProjectProfile from "./Tabs/Profile";
import ProjectInput from "./Tabs/Input";
import ProjectRawMaterial from "./Tabs/RawMaterial";
import ProjectCost from "./Tabs/Cost";
import ProjectEmployment from "./Tabs/Employment";
import ProjectShare from "./Tabs/Share";
import ProjectProduct from "./Tabs/Product";
import ProjectDocument from "./Tabs/Document";
import ProjectManager from "./Tabs/Manager";
import ProjectConfirmation from "./Tabs/Confirmation";
import { selectCreateWorkPermitTab } from "src/store/States/Buffer/"
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useDispatch, useSelector } from "react-redux"
import { Selectors as SectorSelectors } from "src/store/States/Investment/Category/Sector"
import { Selectors as SubSectorSelectors } from "src/store/States/Investment/Category/SubSector"
import { Selectors as ActivitySelectors } from "src/store/States/Investment/Category/Activity"
import { Selectors as InvestmentActivitySelectors } from "src/store/States/Investment/Category/InvestmentActivity"

const WorkPermit = () => {
  const handleChangeWorkPermitTab = (event: any, newValue: string) => {
    dispatch(BufferActions.UpdateCreateWorkPermitTab(newValue))
  };

  const createWorkPermitTab = useSelector(selectCreateWorkPermitTab)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(BufferActions.UpdateCreateWorkPermitTab("1"))
  }, [])

  const sectors = useSelector(SectorSelectors.selectSectors)
  const sub_sectors = useSelector(SubSectorSelectors.selectSubSectors)
  const activities = useSelector(ActivitySelectors.selectActivities)
  const investment_activities = useSelector(InvestmentActivitySelectors.selectInvestmentActivities)

  const goNext = () => {
    dispatch(BufferActions.UpdateCreateWorkPermitTab(
      Number(createWorkPermitTab) > 10? String(Number(createWorkPermitTab) + 1) : "10"
    ))
  }

  const goPrev = () => {
    dispatch(BufferActions.UpdateCreateWorkPermitTab(
      Number(createWorkPermitTab) > 1? String(Number(createWorkPermitTab) - 1) : "1"
    ))
  }

  return (
    <>
      <Helmet>
        <title>Work Permit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg" sx={{ mb: 7 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <form>
              <Card style={{ padding: 20 }}>
                <TabContext value={createWorkPermitTab}>
                  <Box
                    sx={{ borderBottom: 2, borderColor: "#ddd", p: 3, pb: 4 }}
                  >
                    <TabList onChange={handleChangeWorkPermitTab}>
                      <Tab label="Profile" value="1" />
                      <Tab label="Input" value="2" />
                      <Tab label="Raw Material" value="3" />
                      <Tab label="Cost" value="4" />
                      <Tab label="Employment" value="5" />
                      <Tab label="Share" value="6" />
                      <Tab label="Product" value="7" />
                      <Tab label="Document" value="8" />
                      <Tab label="Manager" value="9" />
                      <Tab label="Confirmation" value="10" />
                    </TabList>
                  </Box>

                  <TabPanel value="1">
                    <ProjectProfile
                      sectors={sectors}
                      sub_sectors={sub_sectors}
                      activities={activities}
                      investment_activities={investment_activities}
                      goPrev={goPrev}
                      goNext={goNext}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <ProjectInput />
                  </TabPanel>
                  <TabPanel value="3">
                    <ProjectRawMaterial />
                  </TabPanel>
                  <TabPanel value="4">
                    <ProjectCost />
                  </TabPanel>
                  <TabPanel value="5">
                    <ProjectEmployment />
                  </TabPanel>
                  <TabPanel value="6">
                    <ProjectShare />
                  </TabPanel>
                  <TabPanel value="7">
                    <ProjectProduct />
                  </TabPanel>
                  <TabPanel value="8">
                    <ProjectDocument />
                  </TabPanel>
                  <TabPanel value="9">
                    <ProjectManager />
                  </TabPanel>
                  <TabPanel value="10">
                    <ProjectConfirmation />
                  </TabPanel>
                </TabContext>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WorkPermit;
