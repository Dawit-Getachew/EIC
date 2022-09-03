import React, { useState, useEffect } from "react";
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

interface Props {
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectInput: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});

  const requiredInputs = [
    "electric_power",
    "water_in_sqm",
    "agricultural_land_in_sqm",
    "land_service_in_sqm",
    "rental_land_in_sqm",
    "other_utility",
    "own_land_in_sqm",
    "land_industrial_in_sqm",
    "lease_land_in_sqm",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateErrors = () => {
    const keys = Object.keys(formData);
    const values = Object.keys(formData);

    const errors_keys = [];
    const error_values = [];
    requiredInputs.forEach((input) => {
      const foundIndex = keys.findIndex((item) => item === input);
      if (foundIndex < 0) {
        errors_keys.push(input);
        error_values.push(true);
      } else {
        if (String(values[foundIndex]) === "") {
          errors_keys.push(input);
          error_values.push(true);
        }
      }
    });

    const _errorData = {};
    errors_keys.forEach((key, idx) => {
      _errorData[key] = error_values[idx];
    });

    return _errorData;
  };

  const onSubmit = () => {
    const errorInfo = generateErrors();
    setErrorData(errorInfo);
    if (Object.keys(errorInfo).length === 0) {
      props.goNext(formData);
    }
  };

  const getError = (name: string) => {
    const foundIndex = Object.keys(errorData).findIndex((key) => key === name);
    return foundIndex >= 0
      ? {
          value: errorData[name],
          text: errorData[name] ? "This is a required field" : "",
        }
      : { value: false, text: false };
  };

  const getValue = (name: string) => {
    const foundIndex = Object.keys(props.mainData).findIndex(
      (key) => key === name
    );
    return foundIndex >= 0 ? props.mainData[name] : "";
  };

  useEffect(() => {
    setFormData(props.mainData);
  }, [props.mainData, setFormData]);

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
            type="number"
            sx={{ width: 1 }}
            name="electric_power"
            defaultValue={getValue("electric_power")}
            error={getError("electric_power").value}
            helperText={getError("electric_power").text}
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            required
            label="Water (m2)"
            type="number"
            sx={{ width: 1 }}
            name="water_in_sqm"
            defaultValue={getValue("water_in_sqm")}
            error={getError("water_in_sqm").value}
            helperText={getError("water_in_sqm").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Other Utility"
            type="number"
            sx={{ width: 1 }}
            name="other_utility"
            defaultValue={getValue("other_utility")}
            error={getError("other_utility").value}
            helperText={getError("other_utility").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Land Industrial (Sq.m)"
            type="number"
            sx={{ width: 1 }}
            name="land_industrial_in_sqm"
            defaultValue={getValue("land_industrial_in_sqm")}
            error={getError("land_industrial_in_sqm").value}
            helperText={getError("land_industrial_in_sqm").text}
            onChange={handleChange}
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
            type="number"
            sx={{ width: 1 }}
            name="agricultural_land_in_sqm"
            defaultValue={getValue("agricultural_land_in_sqm")}
            error={getError("agricultural_land_in_sqm").value}
            helperText={getError("agricultural_land_in_sqm").text}
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            required
            label="Land Service (Sq.m)"
            type="number"
            sx={{ width: 1 }}
            name="land_service_in_sqm"
            defaultValue={getValue("land_service_in_sqm")}
            error={getError("land_service_in_sqm").value}
            helperText={getError("land_service_in_sqm").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Own Land (Sq.m)"
            type="number"
            sx={{ width: 1 }}
            name="own_land_in_sqm"
            defaultValue={getValue("own_land_in_sqm")}
            error={getError("own_land_in_sqm").value}
            helperText={getError("own_land_in_sqm").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Lease Land (Sq.m)"
            type="number"
            sx={{ width: 1 }}
            name="lease_land_in_sqm"
            defaultValue={getValue("lease_land_in_sqm")}
            error={getError("lease_land_in_sqm").value}
            helperText={getError("lease_land_in_sqm").text}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item md={3}>
          <TextField
            required
            label="Rental Land (Sq.m)"
            type="number"
            sx={{ width: 1 }}
            name="rental_land_in_sqm"
            defaultValue={getValue("rental_land_in_sqm")}
            error={getError("rental_land_in_sqm").value}
            helperText={getError("rental_land_in_sqm").text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={9}>
          <TextField
            required
            label="Remark"
            sx={{ width: 1 }}
            name="remarks"
            defaultValue={getValue("remarks")}
            error={getError("remarks").value}
            helperText={getError("remarks").text}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="secondary"
            type="button"
            onClick={props.goPrev}
          >
            Previous
          </Button>
        </Grid>
        <Grid
          item
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
            type="button"
            onClick={onSubmit}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectInput;
