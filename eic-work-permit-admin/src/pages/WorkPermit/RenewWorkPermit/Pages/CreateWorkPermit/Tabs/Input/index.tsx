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

import { ProjectStageTypes } from "src/models/InvestmentModels/work_permit";

const ProjectInput: React.FC<any> = () => {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        Project Input
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField
            required
            label="Electric Power (kwh)"
            sx={{ width: 1 }}
            // {...register("company_name", { required: "This is a required field" })}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            required
            label="Water (m2)"
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Other Utility"
            sx={{ width: 1 }}
            // {...register("form_of_ownership", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Land Industrial (Sq.m)"
            sx={{ width: 1 }}
            // {...register("form_of_ownership", { required: "This is a required field" })}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        display="flex"
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Grid item md={3}>
          <TextField
            required
            label="Land Agricultural (Sq.m)"
            sx={{ width: 1 }}
            // {...register("company_of_incorporation", { required: "This is a required field" })}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            required
            label="Land Service (Sq.m)"
            sx={{ width: 1 }}
            // {...register("company_of_incorporation", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Own Land (Sq.m)"
            sx={{ width: 1 }}
            // {...register("company_of_incorporation", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Lease Land (Sq.m)"
            sx={{ width: 1 }}
            // {...register("company_of_incorporation", { required: "This is a required field" })}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item md={3}>
          <TextField
            required
            label="Rental Land (Sq.m)"
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={9}>
          <TextField
            required
            label="Remark"
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
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

export default ProjectInput;
