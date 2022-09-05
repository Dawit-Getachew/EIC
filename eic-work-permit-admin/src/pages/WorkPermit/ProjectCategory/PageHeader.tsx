/* eslint-disable */
import { FC } from "react";
import { Typography, Button, Grid } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";

const PageHeader = () => {
  const navigate = useNavigate();
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Project Categories
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, edit project categories
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
