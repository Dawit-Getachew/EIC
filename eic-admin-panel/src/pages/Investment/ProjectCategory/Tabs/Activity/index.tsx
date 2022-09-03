import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import {
  Selectors,
  API,
  Actions,
} from "src/store/States/Investment/Category/Activity";
import { Selectors as SubSectorSelector } from "src/store/States/Investment/Category/SubSector";
import { useSelector, useDispatch } from "react-redux";
import ActivitiesTable from "./ActivitiesTable";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";

const Activity: React.FC<any> = () => {
  const rows = [
    { name: "Pre Implementation" },
    { name: "Implementation" },
    { name: "Operation" },
  ];

  const dispatch = useDispatch();
  const activities = useSelector(Selectors.selectActivities);
  const sub_sectors = useSelector(SubSectorSelector.selectSubSectors)

  const navigate = useNavigate()
  useEffect(() => {
    API.FetchActivities((err, data) => {
      if (err) throw err;
      dispatch(Actions.FetchedActivities(data));
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 3, mt: 2 }}
          >
            Project Activity
          </Typography>
        </Grid>

        <Grid item md={6} style={{ textAlign: "right" }}>
          <Button
            sx={{ margin: 1, pb: 1.1, pt: 1.1, pl: 3, pr: 3 }}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<AddIcon />}
            onClick={() => navigate(routes.INVESTMENT.CREATE_ACTIVITY.ROUTE, { replace: true })}
          >
            New Activity
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <ActivitiesTable activities={activities as any[]} sub_sectors={sub_sectors} />
        </Grid>
      </Grid>
    </>
  );
};

export default Activity;
