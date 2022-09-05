/* eslint-disable */
import {
  Grid,
  Card,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Selectors as InvestmentPermitSelectors } from "src/store/States/InvestmentPermit";
import { Selectors as InvestmentExpansionPermitSelectors } from "src/store/States/InvestmentPermitExpansion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DropWithInput from "src/components/DropWithInput/DropWithInput";
import "./style.css";

function DashboardCards() {
  const investment_permits = useSelector(
    InvestmentPermitSelectors.selectInvestmentPermits
  );
  const investment_permit_expansions = useSelector(
    InvestmentExpansionPermitSelectors.selectInvestmentPermitExpansions
  );
  const [invested_capital, setInvestmentCapital] = useState(0);
  const [permit_amount, setPermitAmount] = useState(0);
  const [expansion_permit_amount, setExpansionPermitAmount] = useState(0);

  useEffect(() => {
    let capital_amount = 0;
    investment_permits.forEach((permit: any) => {
      capital_amount += permit.investment_capital_usd;
    });
    setPermitAmount(investment_permits.length);
    setInvestmentCapital(capital_amount);
    setExpansionPermitAmount(investment_permit_expansions.length);
  }, [
    investment_permits,
    investment_permit_expansions,
    setInvestmentCapital,
    setPermitAmount,
    setExpansionPermitAmount,
  ]);

  return (
    <>
      <Grid
        container
        xs={12}
        direction={"column"}
        display={"flex"}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Grid item md={12} xs={12} style={{ width: "100%" }}>
          <Card>
            <Grid
              sx={{
                p: 3,
                borderRadius: 1.1,
                background: "#777",
              }}
            >
              <Typography variant={"h4"} style={{ color: "#ffffff" }}>
                Account / User Details
              </Typography>
            </Grid>
          </Card>
        </Grid>

        <Grid item md={12} xs={12} style={{ width: "100%" }}>
          <Card>
            <Grid
              sx={{
                p: 3,
                m: 3,
                borderRadius: 1.1,
              }}
              className="card-grid-wrapper"
            >
              <Grid
                md={6}
                display={"flex"}
                direction={"column"}
                alignItems={"center"}
                mr={3}
              >
                <Typography variant={"h4"} className={"section-header"}>
                  Personal Details
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Username
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Full Name
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Date of Birth
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      City
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Country
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                    >
                      Save Changes
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                md={6}
                display={"flex"}
                direction={"column"}
                alignItems={"center"}
                spacing={3}
              >
                <Typography variant={"h4"} className={"section-header"}>
                  Security / Change Email
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Your Email
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                    >
                      Change Email
                    </Button>
                  </FormControl>
                </Grid>

                <Typography variant={"h4"} className={"section-header"} mt={4}>
                  Security / Change Phone Number
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Your Phone Number
                    </FormLabel>

                    <DropWithInput
                      dropItems={[
                        { dropItem: "Yeabsera", dropValue: 10 },
                        { dropItem: "Kurabachew", dropValue: 20 },
                      ]}
                      gridStyle={{ marginTop: "5px" }}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                    >
                      Change Phone Number
                    </Button>
                  </FormControl>
                </Grid>

                <Typography variant={"h4"} className={"section-header"} mt={4}>
                  Security / Change Password
                </Typography>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Old Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      New Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormControl className="flex-c">
                    <FormLabel id="demo-radio-buttons-group-label">
                      Confirm Password
                    </FormLabel>
                    <TextField
                      style={{ width: "100%", marginTop: "5px" }}
                      className="default-input"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <FormControl className="flex-c">
                    <Button
                      variant="contained"
                      style={{ padding: "12px", background: "#01497c" }}
                    >
                      Change Password
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardCards;
