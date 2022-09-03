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
} from "@mui/material/";
import {
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";

import { Nationalities } from "src/models/InvestmentModels/work_permit";

const ProjectShare: React.FC<any> = () => {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        Project Share
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField
            required
            select
            label="Nationality"
            sx={{ width: 1 }}
            defaultValue={Object.values(Nationalities)[0]}
            // {...register("company_name", { required: "This is a required field" })}
          >
            {Object.values(Nationalities).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item md={3}>
          <TextField
            required
            label="Quality"
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Share Percent %"
            sx={{ width: 1 }}
            // {...register("form_of_ownership", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Description"
            sx={{ width: 1 }}
            // {...register("form_of_ownership", { required: "This is a required field" })}
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

export default ProjectShare;
