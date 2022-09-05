/* eslint-disable */
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Container,
  Card,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import Footer from "src/components/Footer";
import DashboardCards from "./UserDetails";
import UserDetails from "./UserDetails/index";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import Money from "@mui/icons-material/Money";
import Upload from "@mui/icons-material/Upload";
import { useDispatch } from "react-redux";
import { Actions as BufferActions } from "src/store/States/Buffer";
import "./style.css";

function UserProfile() {
  const user = {
    name: "John Doe",
    avatar: "/static/images/avatars/temp-user.jpg",
    jobtitle: "Investor",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: "/user/profile",
          title: "User Profile",
        },
      ])
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>EIC - User Profile</title>
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
            <Grid item xs>
              <UserDetails />
            </Grid>

            <Grid item style={{ width: "300px" }}>
              <Grid md={12}>
                <Card
                  sx={{
                    p: 3,
                    pt: 6,
                    pb: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid
                    style={{ marginBottom: 13 }}
                    className={"img-upload-wrapper"}
                  >
                    <Avatar
                      alt={user.name}
                      src={user.avatar}
                      style={{ width: 130, height: 130 }}
                    />
                    <Button className={"upload-icon-btn"}>
                      <Upload
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        className={"upload-icon"}
                      />
                    </Button>
                  </Grid>

                  <Typography
                    variant="h3"
                    component="h3"
                    style={{ textAlign: "center" }}
                  >
                    {user.name}
                  </Typography>

                  <p style={{ textAlign: "center", margin: 0 }}>
                    {user.jobtitle}
                  </p>

                  <hr
                    style={{ marginTop: 30, marginBottom: 30 }}
                    className={"hr-line"}
                  />

                  <Grid
                    style={{
                      padding: 6,
                      marginBottom: 10,
                    }}
                    className={"sml-box"}
                  >
                    <NotificationsActive style={{ marginRight: 10 }} />
                    <Typography variant="h5">246 Work Permits</Typography>
                  </Grid>

                  <Grid
                    style={{
                      marginBottom: 10,

                      padding: 6,
                    }}
                    className={"sml-box"}
                  >
                    <Money style={{ marginRight: 10 }} />
                    <Typography variant="h5">2,346 Money Invested</Typography>
                  </Grid>

                  <Grid
                    className={"sml-box"}
                    style={{
                      padding: 6,
                    }}
                  >
                    <NotificationsActive style={{ marginRight: 10 }} />
                    <Typography variant="h5">246 Work Permits</Typography>
                  </Grid>

                  <hr
                    style={{ marginTop: 30, marginBottom: 30 }}
                    className={"hr-line"}
                  />

                  <p style={{ margin: 0, textAlign: "center" }}>
                    Member since 2022
                  </p>
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

export default UserProfile;
