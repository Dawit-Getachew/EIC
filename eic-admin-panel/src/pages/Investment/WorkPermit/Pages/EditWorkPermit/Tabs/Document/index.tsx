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

const ProjectDocument: React.FC<any> = () => {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 3 }}
      >
        Project Document
      </Typography>

      <Grid sx={{ pl: 3, pr: 3, mt: 6 }}>
        <Grid
          container
          spacing={3}
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "#ddd",
            pb: 3,
            pl: 2,
            pr: 5,
          }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item md={8}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Passport Copy
            </Typography>
          </Grid>

          <Grid
            item
            md={4}
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <input
              id="document_file_passport"
              type="file"
              style={{ display: "none" }}
            />
            <label htmlFor="document_file_passport">
              <Button variant="contained" component="span">
                Attach a File
              </Button>
            </label>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "#ddd",
            pb: 3,
            pl: 2,
            pr: 5,
            mt: 3,
          }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item md={8}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Renewed ID
            </Typography>
          </Grid>

          <Grid
            item
            md={4}
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <input
              id="document_file_id"
              type="file"
              style={{ display: "none" }}
            />
            <label htmlFor="document_file_id">
              <Button variant="contained" component="span">
                Attach a File
              </Button>
            </label>
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
            UPLOAD
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDocument;
