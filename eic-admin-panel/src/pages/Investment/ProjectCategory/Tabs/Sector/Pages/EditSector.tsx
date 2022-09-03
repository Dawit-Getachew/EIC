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
  ISectorInput,
} from "src/models/InvestmentModels/Category/sector";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { useForm } from "react-hook-form";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { API, Selectors } from "src/store/States/Investment/Category/Sector/";
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useDispatch, useSelector } from "react-redux"

const EditSector: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISectorInput>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const selectedSector = useSelector(Selectors.selectSelectedSector)

  const onSubmit = (input: ISectorInput) => {
    setIsLoading(true);
    API.EditSector({
      _id: selectedSector._id,
      ...input
    }, (err, data) => {
      if (err) throw err;
      setIsLoading(false);
      if (data._id) {
        dispatch(BufferActions.UpdateCategoryTab("1"))
        navigate(routes.INVESTMENT.PROJECT_CATEGORY.ROUTE, { replace: true });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Sector</title>
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
                  Sector Information
                </Typography>
                <Grid
                  container
                  spacing={3}
                  display="flex"
                  alignItems="flex-start"
                >
                  <Grid item md={12}>
                    <TextField
                      required
                      label="Sector Name"
                      sx={{ width: 1 }}
                      {...register("name", {
                        required: "This is a required field",
                      })}
                      defaultValue={selectedSector.name}
                    />
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
                        "Edit Sector"
                      )}
                    </Button>

                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="secondary"
                      disabled={isLoading}
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

export default EditSector;
