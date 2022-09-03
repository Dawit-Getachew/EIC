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

const ProjectProfile: React.FC<any> = () => {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        New Work Permit
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={4}>
          <TextField
            required
            label="Project Title"
            sx={{ width: 1 }}
            // {...register("company_name", { required: "This is a required field" })}
          />
        </Grid>

        <Grid item md={4}>
          <TextField
            required
            label="Project Stage"
            select
            defaultValue={Object.values(ProjectStageTypes)[0]}
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={4}>
          <TextField
            required
            label="Pervious Permit Number"
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
        <Grid item md={4}>
          <TextField
            required
            type="date"
            label="Start Date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 1 }}
            // {...register("company_name_amharic", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            required
            type="date"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 1 }}
            // {...register("tin_number", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            required
            type="date"
            label="Operation Date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 1 }}
            // {...register("registration_number", { required: "This is a required field" })}
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
        <Grid item md={6}>
          <TextField
            required
            label="Environmental Impact"
            sx={{ width: 1 }}
            // {...register("company_of_incorporation", { required: "This is a required field" })}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            required
            label="Project Profile Summary"
            sx={{ width: 1 }}
            // {...register("company_of_incorporation", { required: "This is a required field" })}
          />
        </Grid>
      </Grid>

      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 5 }}
      >
        Project Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField
            required
            label="Region"
            select
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Zone"
            select
            sx={{ width: 1 }}
            // {...register("legal_status", { required: "This is a required field" })}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Wereda"
            sx={{ width: 1 }}
            // {...register("address.city", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Kebele"
            sx={{ width: 1 }}
            // {...register("address.sub_city", { required: "This is a required field" })}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{ marginTop: 15 }}
        direction="row"
        alignItems="center"
      >
        <Grid item md={3}>
          <TextField
            required
            sx={{ width: 1 }}
            label="Specific Area Name"
            // {...register("address.house_number", { required: "This is a required field" })}
          />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label="Is industrial park?"
            control={<Checkbox />}
          />
        </Grid>
      </Grid>

      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 5 }}
      >
        Category
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            required
            label="Sector"
            sx={{ width: 1 }}
            select
            // {...register("address.fax", { required: "This is a required field" })}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            label="SubSector"
            sx={{ width: 1 }}
            select
            // {...register("address.po_box", { required: "This is a required field" })}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            label="Activity"
            sx={{ width: 1 }}
            select
            // {...register("address.other_address")}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            label="Investment Activity"
            sx={{ width: 1 }}
            select
            // {...register("address.other_address")}
          >
            {Object.values(ProjectStageTypes).map((item) => (
              <MenuItem key={item} value={item}>
                {String(item)}
              </MenuItem>
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

export default ProjectProfile;
