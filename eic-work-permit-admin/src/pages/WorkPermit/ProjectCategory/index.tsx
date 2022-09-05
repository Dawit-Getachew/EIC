/* eslint-disable */
import React, { useState, useEffect } from "react";
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
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { selectCategoryTab, Actions as BufferActions } from "src/store/States/Buffer/"
import { useSelector, useDispatch } from "react-redux"

// tab pages
import CategorySector from "./Tabs/Sector";
import CategorySubSector from "./Tabs/SubSector/index";
import CategoryActivity from "./Tabs/Activity";
import CategoryInvestmentActivity from "./Tabs/InvestmentActivity"

const ProjectCategory = () => {
  const dispatch = useDispatch()
  const handleChangeWorkPermitTab = (event: any, newValue: string) => {
    dispatch(BufferActions.UpdateCategoryTab(newValue))
  };

  const categoryTab = useSelector(selectCategoryTab)

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
                <TabContext value={categoryTab}>
                  <Box
                    sx={{ borderBottom: 2, borderColor: "#ddd", p: 3, pb: 4 }}
                  >
                    <TabList onChange={handleChangeWorkPermitTab}>
                      <Tab label="Sector" value="1" />
                      <Tab label="SubSector" value="2" />
                      <Tab label="Activity" value="3" />
                      <Tab label="Investment Activity" value="4" />
                    </TabList>
                  </Box>

                  <TabPanel value="1">
                    <CategorySector />
                  </TabPanel>
                  <TabPanel value="2">
                    <CategorySubSector />
                  </TabPanel>
                  <TabPanel value="3">
                    <CategoryActivity />
                  </TabPanel>
                  <TabPanel value="4">
                    <CategoryInvestmentActivity />
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

export default ProjectCategory;
