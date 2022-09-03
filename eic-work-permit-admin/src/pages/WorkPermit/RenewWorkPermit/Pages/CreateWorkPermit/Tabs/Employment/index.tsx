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
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material/";
import {
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";

import { ProjectStageTypes } from "src/models/InvestmentModels/work_permit";

const ProjectEmployment: React.FC<any> = () => {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        Project Employment
      </Typography>

      <Grid container spacing={6}>
        <Grid item display="flex" direction="row" spacing={3} md={6}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ pb: 2, mt: 1, borderBottom: 1, borderColor: "#ddd" }}
              >
                Permanent
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={3} columnSpacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Female"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Male"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={3} columnSpacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Foreign Female"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Foreign Male"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    variant="standard"
                    label="Total"
                    sx={{ width: 1 }}
                    // inputProps={{ style: { textAlign: "right" } }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item display="flex" direction="row" spacing={3} md={6}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ pb: 2, mt: 1, borderBottom: 1, borderColor: "#ddd" }}
              >
                Temporary
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={3} columnSpacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Female"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Male"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={3} columnSpacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Foreign Female"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Foreign Male"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    variant="standard"
                    label="Total"
                    sx={{ width: 1 }}
                    // {...register("company_name", { required: "This is a required field" })}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            SAVE
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectEmployment;
