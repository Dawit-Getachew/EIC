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
  RadioGroup,
  Radio,
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

const ProjectEmployment: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});

  const requiredInputs = [
    "permanent_local_female_amount",
    "permanent_local_male_amount",
    "permanent_foreign_female_amount",
    "permanent_foreign_male_amount",
    "permanent_total",
    "temporary_local_female_amount",
    "temporary_local_male_amount",
    "temporary_foreign_female_amount",
    "temporary_foreign_male_amount",
    "temporary_total",
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
                    type="number"
                    sx={{ width: 1 }}
                    name="permanent_local_female_amount"
                    defaultValue={getValue("permanent_local_female_amount")}
                    onChange={handleChange}
                    error={getError("permanent_local_female_amount").value}
                    helperText={getError("permanent_local_female_amount").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Male"
                    type="number"
                    sx={{ width: 1 }}
                    name="permanent_local_male_amount"
                    defaultValue={getValue("permanent_local_male_amount")}
                    onChange={handleChange}
                    error={getError("permanent_local_male_amount").value}
                    helperText={getError("permanent_local_male_amount").text}
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
                    type="number"
                    sx={{ width: 1 }}
                    name="permanent_foreign_female_amount"
                    defaultValue={getValue("permanent_foreign_female_amount")}
                    onChange={handleChange}
                    error={getError("permanent_foreign_female_amount").value}
                    helperText={
                      getError("permanent_foreign_female_amount").text
                    }
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Foreign Male"
                    type="number"
                    sx={{ width: 1 }}
                    name="permanent_foreign_male_amount"
                    defaultValue={getValue("permanent_foreign_male_amount")}
                    onChange={handleChange}
                    error={getError("permanent_foreign_male_amount").value}
                    helperText={getError("permanent_foreign_male_amount").text}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    variant="standard"
                    label="Total"
                    type="number"
                    sx={{ width: 1 }}
                    name="permanent_total"
                    defaultValue={getValue("permanent_total")}
                    onChange={handleChange}
                    error={getError("permanent_total").value}
                    helperText={getError("permanent_total").text}
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
                    type="number"
                    sx={{ width: 1 }}
                    name="temporary_local_female_amount"
                    defaultValue={getValue("temporary_local_female_amount")}
                    onChange={handleChange}
                    error={getError("temporary_local_female_amount").value}
                    helperText={getError("temporary_local_female_amount").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Male"
                    type="number"
                    sx={{ width: 1 }}
                    name="temporary_local_male_amount"
                    defaultValue={getValue("temporary_local_male_amount")}
                    onChange={handleChange}
                    error={getError("temporary_local_male_amount").value}
                    helperText={getError("temporary_local_male_amount").text}
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
                    type="number"
                    sx={{ width: 1 }}
                    name="temporary_foreign_female_amount"
                    defaultValue={getValue("temporary_foreign_female_amount")}
                    onChange={handleChange}
                    error={getError("temporary_foreign_female_amount").value}
                    helperText={
                      getError("temporary_foreign_female_amount").text
                    }
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Foreign Male"
                    type="number"
                    sx={{ width: 1 }}
                    name="temporary_foreign_male_amount"
                    defaultValue={getValue("temporary_foreign_male_amount")}
                    onChange={handleChange}
                    error={getError("temporary_foreign_male_amount").value}
                    helperText={getError("temporary_foreign_male_amount").text}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    variant="standard"
                    label="Total"
                    type="number"
                    sx={{ width: 1 }}
                    name="temporary_total"
                    defaultValue={getValue("temporary_total")}
                    onChange={handleChange}
                    error={getError("temporary_total").value}
                    helperText={getError("temporary_total").text}
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

export default ProjectEmployment;
