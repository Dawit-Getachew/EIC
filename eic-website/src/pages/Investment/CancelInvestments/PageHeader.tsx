import React from "react";
import { Typography, Grid } from "@mui/material";

const PageHeader = () => {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ marginBottom: 40 }}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Investment Permit
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent investment permits
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
