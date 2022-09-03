import React from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Card, Typography, Avatar } from "@mui/material";
import Footer from "src/components/Footer";
import {
  API,
  Actions,
  Selectors,
} from "src/store/States/Investment/BusinessProfile";
import { useDispatch, useSelector } from "react-redux";
import DashboardCards from "./DashboardCards";
import DashboardTable from "./DashboardTable/index";

import NotificationsActive from "@mui/icons-material/NotificationsActive";

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>EIC - Dashboard</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ mb: 7 }}>
        <Grid container xs={12}>
          <Grid
            container
            xs={12}
            display={"flex"}
            direction={"row"}
            mt={0}
            spacing={2}
          >
            <Grid item md={8}>
              <DashboardCards />
              {/* <DashboardTable /> */}
            </Grid>

            <Grid item md={4}>
              <Grid md={12}>
                <Card sx={{ p: 3 }}>
                  <Grid display={"flex"} justifyContent={"center"} m={5}>
                    <NotificationsActive sx={{ fontSize: 150 }} />
                  </Grid>

                  <Typography variant="h3" component="h2">
                    Alerts
                  </Typography>
                  <p>All alerts are displayed here</p>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
