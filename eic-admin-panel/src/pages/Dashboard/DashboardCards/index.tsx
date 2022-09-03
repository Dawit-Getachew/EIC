import { Grid, Card, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function DashboardCards() {
  return (
    <>
      <Grid
        container
        xs={12}
        direction={"row"}
        display={"flex"}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Grid item md={4}>
          <Card>
            <Grid
              sx={{
                p: 3,
                borderRadius: 1.1,
              }}
            >
              <Grid
                md={12}
                display={"flex"}
                direction={"row"}
                mb={2}
                alignItems={"center"}
              >
                <Grid md={9}>
                  <Typography variant="h4" component="h2">
                    Active Users
                  </Typography>
                </Grid>

                <Grid md={3} display={"flex"} justifyContent={"end"}>
                  <ExpandMoreIcon sx={{ fontSize: 20 }} />
                </Grid>
              </Grid>

              <Grid
                md={12}
                display={"flex"}
                direction={"row"}
                alignItems={"center"}
                mb={0.5}
              >
                <Grid md={8}>
                  <Typography sx={{ fontSize: 30, color: "#555" }}>
                    $500k
                  </Typography>
                </Grid>

                <Grid md={4} display={"flex"} justifyContent={"end"}>
                  <AttachMoneyIcon sx={{ fontSize: 60, color: "orange" }} />
                </Grid>
              </Grid>

              <Grid md={12}>
                <Typography sx={{ fontSize: 15, color: "#aaa" }}>
                  2/5/2021
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card>
            <Grid
              sx={{
                p: 3,
                borderRadius: 1.1,
              }}
            >
              <Grid
                md={12}
                display={"flex"}
                direction={"row"}
                mb={2}
                alignItems={"center"}
              >
                <Grid md={9}>
                  <Typography variant="h4" component="h2">
                    New Investors
                  </Typography>
                </Grid>

                <Grid md={3} display={"flex"} justifyContent={"end"}>
                  <ExpandMoreIcon sx={{ fontSize: 20 }} />
                </Grid>
              </Grid>

              <Grid
                md={12}
                display={"flex"}
                direction={"row"}
                alignItems={"center"}
                mb={0.5}
              >
                <Grid md={8}>
                  <Typography sx={{ fontSize: 30, color: "#555" }}>
                    $500k
                  </Typography>
                </Grid>

                <Grid md={4} display={"flex"} justifyContent={"end"}>
                  <MoreTimeIcon sx={{ fontSize: 60, color: "orange" }} />
                </Grid>
              </Grid>

              <Grid md={12}>
                <Typography sx={{ fontSize: 15, color: "#aaa" }}>
                  2/5/2021
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card>
            <Grid
              sx={{
                p: 3,
                borderRadius: 1.1,
              }}
            >
              <Grid
                md={12}
                display={"flex"}
                direction={"row"}
                mb={2}
                alignItems={"center"}
              >
                <Grid md={9}>
                  <Typography variant="h4" component="h2">
                    Investment Permits
                  </Typography>
                </Grid>

                <Grid md={3} display={"flex"} justifyContent={"end"}>
                  <ExpandMoreIcon sx={{ fontSize: 20 }} />
                </Grid>
              </Grid>

              <Grid
                md={12}
                display={"flex"}
                direction={"row"}
                alignItems={"center"}
                mb={0.5}
              >
                <Grid md={8}>
                  <Typography sx={{ fontSize: 30, color: "#555" }}>
                    $500k
                  </Typography>
                </Grid>

                <Grid md={4} display={"flex"} justifyContent={"end"}>
                  <PersonIcon sx={{ fontSize: 60, color: "orange" }} />
                </Grid>
              </Grid>

              <Grid md={12}>
                <Typography sx={{ fontSize: 15, color: "#aaa" }}>
                  2/5/2021
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardCards;
