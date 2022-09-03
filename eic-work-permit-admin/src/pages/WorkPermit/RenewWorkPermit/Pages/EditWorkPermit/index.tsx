import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Grid,
  MenuItem,
  Box,
  Container,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material/";
import {
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { useForm } from "react-hook-form";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
// import { API } from "src/store/States/Investment/BusinessProfile/"
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

const WorkPermit = () => {
  const [value, setValue] = useState("1");

  const handleChangeWorkPermitTab = (event: any, newValue: string) => {
    setValue(newValue);
  };

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
                <TabContext value={value}>
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
                    <ProjectProfile />
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
