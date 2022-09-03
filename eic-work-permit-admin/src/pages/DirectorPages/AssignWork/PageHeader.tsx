import { Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router";

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
          Assign Work Permits
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your unassigned work permits
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
