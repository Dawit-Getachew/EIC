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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material/";
import {
  LegalStatusTypes,
  FormOfOwnerShipTypes,
  IBusinessProfileInput,
} from "src/models/InvestmentModels/business_profile";

import { ProjectStageTypes } from "src/models/InvestmentModels/work_permit";

const ProjectManager: React.FC<any> = () => {
  const rows = [{ name: "Hello World" }, { name: "Hello World" }];

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 3, mt: 2 }}
      >
        Project Manager
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Manager</TableCell>

                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((el, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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

export default ProjectManager;
