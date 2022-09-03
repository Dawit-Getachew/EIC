import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Grid,
  MenuItem,
  Box,
  Container,
  CircularProgress,
} from "@mui/material/";
import {
  IInvestmentActivityInput,
} from "src/models/InvestmentModels/Category/investment_activity";
import { Selectors as ActivitySelector } from "src/store/States/Investment/Category/Activity"
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { useForm } from "react-hook-form";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { API, Selectors } from "src/store/States/Investment/Category/InvestmentActivity/";
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useDispatch, useSelector } from "react-redux"

const EditInvestmentActivity: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInvestmentActivityInput>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const selectedInvestmentActivity = useSelector(Selectors.selectSelectedInvestmentActivity)
  const activities = useSelector(ActivitySelector.selectActivities)

  const onSubmit = (input: IInvestmentActivityInput) => {
    setIsLoading(true);
    API.EditInvestmentActivity({
      _id: selectedInvestmentActivity._id,
      ...input
    }, (err, data) => {
      if (err) throw err;
      setIsLoading(false);
      if (data._id) {
        dispatch(BufferActions.UpdateCategoryTab("4"))
        navigate(routes.WORK_PERMIT.PROJECT_CATEGORY.ROUTE, { replace: true });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Investment Activity</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card sx={{ p: 4 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  sx={{ mb: 4 }}
                >
                  Investment Activity Information
                </Typography>
                <Grid
                  container
                  spacing={3}
                  display="flex"
                  alignItems="flex-start"
                >
                  <Grid item md={6}>
                    <TextField
                      required
                      label="Investment Activity Name"
                      sx={{ width: 1 }}
                      {...register("name", {
                        required: "This is a required field",
                      })}
                      defaultValue={selectedInvestmentActivity.name}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      required
                      label="Activity"
                      sx={{ width: 1 }}
                      {...register("activity", {
                        required: "This is a required field",
                      })}
                      select
                      defaultValue={selectedInvestmentActivity.activity}
                    >
                      {activities.map(activity => (
                        <MenuItem value={activity._id}>{activity.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{
                    marginTop: 15,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    md={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        "Edit Investment Activity"
                      )}
                    </Button>

                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="secondary"
                      disabled={isLoading}
                      onClick={() => {
                        dispatch(BufferActions.UpdateCategoryTab("4"))
                        navigate(routes.WORK_PERMIT.PROJECT_CATEGORY.ROUTE, { replace: true });
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditInvestmentActivity;
