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

const ProjectConfirmation: React.FC<any> = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h1"
            component="h1"
            sx={{ mb: 3, mt: 2 }}
          >
            THANK YOU
          </Typography>
        </Grid>

        <Grid
          item
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h3">
            To finish your permit application please click finish.
          </Typography>
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
          spacing={2}
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
            FINISH
          </Button>

          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="error"
            type="submit"
          >
            CANCEL
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectConfirmation;
