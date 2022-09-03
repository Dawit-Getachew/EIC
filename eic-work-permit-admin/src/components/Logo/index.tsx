import { Box, Hidden, Tooltip, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./logo.css";

import logo from "src/assets/images/eic-logo.png";

function Logo() {
  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      justifyContent="center"
      className="logo-wrapper"
    >
      <Grid item>
        <img src={logo} alt="" className="logo-img" />
      </Grid>

      <Grid item>
        <Typography
          variant="h4"
          className="logo-txt"
          style={{ fontSize: "1.4em", marginTop: "15px" }}
        >
          Ethiopian Investment Commission
        </Typography>
        <Typography variant="h4" className="logo-txt logo-txt-btm">
          Work Permit
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Logo;
