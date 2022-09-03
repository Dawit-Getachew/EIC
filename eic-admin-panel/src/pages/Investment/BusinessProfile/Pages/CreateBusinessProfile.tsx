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
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { useForm } from "react-hook-form";
import routes from "src/constants/routes";
import { useNavigate } from "react-router";
import { API } from "src/store/States/Investment/BusinessProfile/";

const CreateBusinessProfile: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IBusinessProfileInput>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (input: IBusinessProfileInput) => {
    setIsLoading(true);
    API.CreateBusinessProfile(input, (err, data) => {
      if (err) throw err;
      setIsLoading(false);
      if (data._id) {
        navigate(routes.INVESTMENT.BUSINESS_PROFILE.ROUTE, { replace: true });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manager</title>
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
                  Manager Information
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
                      label="Legal Status"
                      sx={{ width: 1 }}
                      select
                      defaultValue={Object.values(LegalStatusTypes)[0]}
                      {...register("legal_status", {
                        required: "This is a required field",
                      })}
                    >
                      {Object.values(LegalStatusTypes).map((item) => (
                        <MenuItem key={item} value={item}>
                          {String(item).replace("_", " ")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Form of Ownership"
                      defaultValue={Object.values(FormOfOwnerShipTypes)[0]}
                      select
                      {...register("form_of_ownership", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    >
                      {Object.values(FormOfOwnerShipTypes).map((item) => (
                        <MenuItem key={item} value={item}>
                          {String(item).replace("_", " ")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Company of Incorporation"
                      select
                      {...register("company_of_incorporation", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    >
                      {["Ethiopia", "Eritria"].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 0 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Company Name"
                      {...register("company_name", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Company Name (Amharic)"
                      {...register("company_name_amharic", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Tin Number"
                      {...register("tin_number", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Registration Number"
                      {...register("registration_number", {
                        required: "This is a required field",
                      })}
                      sx={{ width: 1 }}
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
                      label="Sub City"
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
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        "Create Business Profile"
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

export default CreateBusinessProfile;
