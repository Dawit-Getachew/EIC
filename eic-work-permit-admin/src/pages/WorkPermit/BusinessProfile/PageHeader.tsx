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
          Business Profiles
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent business profiles
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() =>
            navigate(routes.WORK_PERMIT.CREATE_BUSINESS_PROFILE.ROUTE, {
              replace: true,
            })
          }
        >
          Create Business Profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
