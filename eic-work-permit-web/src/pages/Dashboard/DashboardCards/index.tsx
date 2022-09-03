import { Grid, Card, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Selectors as InvestmentPermitSelectors } from "src/store/States/InvestmentPermit";
import { Selectors as InvestmentExpansionPermitSelectors } from "src/store/States/InvestmentPermitExpansion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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
                    {permit_amount}
                  </Typography>
                </Grid>

                <Grid md={4} display={"flex"} justifyContent={"end"}>
                  <MoreTimeIcon sx={{ fontSize: 60, color: "orange" }} />
                </Grid>
              </Grid>

              <Grid md={12}>
                <Typography sx={{ fontSize: 15, color: "#aaa" }}>
                  {new Date().getDate()}/{Number(new Date().getMonth() + 1)}/
                  {new Date().getFullYear()}
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
                    Invested Capital
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
                    ${invested_capital}
                  </Typography>
                </Grid>

                <Grid md={4} display={"flex"} justifyContent={"end"}>
                  <AttachMoneyIcon sx={{ fontSize: 60, color: "orange" }} />
                </Grid>
              </Grid>

              <Grid md={12}>
                <Typography sx={{ fontSize: 15, color: "#aaa" }}>
                  {new Date().getDate()}/{Number(new Date().getMonth() + 1)}/
                  {new Date().getFullYear()}
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
                    Expansion Requests
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
                    {expansion_permit_amount}
                  </Typography>
                </Grid>

                <Grid md={4} display={"flex"} justifyContent={"end"}>
                  <PersonIcon sx={{ fontSize: 60, color: "orange" }} />
                </Grid>
              </Grid>

              <Grid md={12}>
                <Typography sx={{ fontSize: 15, color: "#aaa" }}>
                  {new Date().getDate()}/{Number(new Date().getMonth() + 1)}/
                  {new Date().getFullYear()}
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
