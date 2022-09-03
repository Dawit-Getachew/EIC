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
import { useSelector } from "react-redux";
import {
  API,
  Selectors as ManagerSelectors,
} from "src/store/States/Investment/Manager/";

const EditManager: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IManagerInput>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const manager = useSelector(ManagerSelectors.selectSelectedManager);

  const onSubmit = (input: IManagerInput) => {
    setIsLoading(true);
    API.EditManager(
      {
        _id: manager._id,
        ...input,
      },
      (err, data) => {
        if (err) throw err;
        setIsLoading(false);
        if (data._id) {
          navigate(routes.WORK_PERMIT.MANAGER.ROUTE, { replace: true });
        }
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Business Profile</title>
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
              <Card style={{ padding: 20 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{ marginBottom: 15, marginTop: 5 }}
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
                      defaultValue={manager.first_name}
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
                      defaultValue={manager.middle_name}
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
                      defaultValue={manager.last_name}
                    />
                  </Grid>
                </Grid>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{ marginBottom: 10, marginTop: 15 }}
                >
                  Business Address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Region"
                      defaultValue={manager.address.region}
                      {...register("address.region", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Zone"
                      defaultValue={manager.address.zone}
                      {...register("address.zone", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Wereda"
                      defaultValue={manager.address.city}
                      {...register("address.city", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Kebele"
                      defaultValue={manager.address.sub_city}
                      {...register("address.sub_city", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="House Number"
                      defaultValue={manager.address.house_number}
                      {...register("address.house_number", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Email"
                      defaultValue={manager.address.email}
                      {...register("address.email", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Telephone (Direct)"
                      defaultValue={manager.address.telephone_direct}
                      {...register("address.telephone_direct", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Telephone (Mobile)"
                      defaultValue={manager.address.telephone_direct}
                      {...register("address.telephone_mobile", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Fax"
                      defaultValue={manager.address.fax}
                      {...register("address.fax", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="P.O. Box"
                      defaultValue={manager.address.po_box}
                      {...register("address.po_box", {
                        required: "This is a required field",
                      })}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Other Address"
                      defaultValue={manager.address.other_address}
                      {...register("address.other_address")}
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
                    md={6}
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
                        "Edit Business Profile"
                      )}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
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

export default EditManager;
