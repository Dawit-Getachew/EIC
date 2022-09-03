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
  ISubSectorInput,
} from "src/models/InvestmentModels/Category/sub_sector";
import { Selectors as SectorSelector } from "src/store/States/Investment/Category/Sector"
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { useForm } from "react-hook-form";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { API } from "src/store/States/Investment/Category/SubSector/";
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useDispatch, useSelector } from "react-redux"

const CreateSubSector: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISubSectorInput>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const sectors = useSelector(SectorSelector.selectSectors)

  const dispatch = useDispatch()

  const onSubmit = (input: ISubSectorInput) => {
    setIsLoading(true);
    API.CreateSubSector(input, (err, data) => {
      if (err) throw err;
      setIsLoading(false);
      if (data._id) {
        dispatch(BufferActions.UpdateCategoryTab("2"))
        navigate(routes.INVESTMENT.PROJECT_CATEGORY.ROUTE, { replace: true });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>SubSector</title>
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
                  SubSector Information
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
                      label="Sub Sector Name"
                      sx={{ width: 1 }}
                      {...register("name", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      required
                      label="Sector"
                      sx={{ width: 1 }}
                      {...register("sector", {
                        required: "This is a required field",
                      })}
                      select
                    >
                      {sectors.map(sector => (
                        <MenuItem value={sector._id}>{sector.name}</MenuItem>
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
                        "Create Sub Sector"
                      )}
                    </Button>

                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="secondary"
                      disabled={isLoading}
                      onClick={() => {
                        dispatch(BufferActions.UpdateCategoryTab("2"))
                        navigate(routes.INVESTMENT.PROJECT_CATEGORY.ROUTE, { replace: true });
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

export default CreateSubSector;
