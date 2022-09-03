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
import { Nationalities } from "src/models/InvestmentModels/work_permit";

interface Props {
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectShare: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});

  const requiredInputs = [
    "nationality",
    "quantity",
    "share_percent",
    "description",
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
        Project Share
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField
            required
            select
            label="Nationality"
            name="nationality"
            defaultValue={getValue("nationality")}
            error={getError("nationality").value}
            helperText={getError("nationality").text}
            onChange={handleChange}
            sx={{ width: 1 }}
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
            label="Quantity"
            name="quantity"
            defaultValue={getValue("quantity")}
            error={getError("quantity").value}
            helperText={getError("quantity").text}
            type="number"
            onChange={handleChange}
            sx={{ width: 1 }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Share Percent %"
            name="share_percent"
            defaultValue={getValue("share_percent")}
            error={getError("share_percent").value}
            helperText={getError("share_percent").text}
            type="number"
            onChange={handleChange}
            sx={{ width: 1 }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            required
            label="Description"
            name="description"
            defaultValue={getValue("description")}
            error={getError("description").value}
            helperText={getError("description").text}
            onChange={handleChange}
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

export default ProjectShare;
