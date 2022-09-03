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
import { IManagerInput } from "src/models/InvestmentModels/manager";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { useForm } from "react-hook-form";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { API } from "src/store/States/Investment/Manager/";

const CreateManager: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IManagerInput>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (input: IManagerInput) => {
    setIsLoading(true);
    API.CreateManager(input, (err, data) => {
      if (err) throw err;
      setIsLoading(false);
      if (data._id) {
        navigate(routes.INVESTMENT.MANAGER.ROUTE, { replace: true });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manger</title>
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
                  Business Address
                </Typography>
                <Grid
                  container
                  spacing={3}
                  display="flex"
                  alignItems="flex-start"
                >
                  <Grid item md={4}>
                    <TextField
                      required
                      label="First Name"
                      sx={{ width: 1 }}
                      {...register("first_name", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Middle Name"
                      sx={{ width: 1 }}
                      {...register("middle_name", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Last Name"
                      sx={{ width: 1 }}
                      {...register("last_name", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                </Grid>

                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  sx={{ mb: 4, mt: 5 }}
                >
                  Business Address
                </Typography>

                <Grid container spacing={3}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Region"
                      {...register("address.region", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Zone"
                      {...register("address.zone", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Wereda"
                      {...register("address.city", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Kebele"
                      {...register("address.sub_city", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 0 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="House Number"
                      {...register("address.house_number", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Email"
                      {...register("address.email", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Telephone (Direct)"
                      {...register("address.telephone_direct", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Telephone (Mobile)"
                      {...register("address.telephone_mobile", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 0 }}>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Fax"
                      {...register("address.fax", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="P.O. Box"
                      {...register("address.po_box", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Other Address"
                      {...register("address.other_address")}
                      sx={{ width: 1 }}
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
                      {isLoading ? <CircularProgress /> : "Create Manger"}
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

export default CreateManager;
