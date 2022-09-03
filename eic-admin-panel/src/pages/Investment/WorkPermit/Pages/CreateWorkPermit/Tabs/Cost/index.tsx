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
import { CurrencyTypes } from "src/common/enums";

interface Props {
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectCost: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});

  const requiredInputs = [
    "land_cost_foreign",
    "building_cost_foreign",
    "machine_cost_foreign",
    "initial_working_capital_cost_foreign",
    "other_capital_cost_foreign",
    "transport_cost_foreign",
    "office_equipment_cost_foreign",
    "total_cost_foreign",
    "land_cost_birr",
    "building_cost_birr",
    "machine_cost_birr",
    "office_equipment_cost_birr",
    "transport_cost_birr",
    "other_capital_cost_birr",
    "initial_working_capital_cost_birr",
    "total_cost_birr",
    "equity_finance",
    "loan_finance",
    "other_source_finance",
    "other_source_description",
    "currency_type",
    "actual_cost_of_foreign",
    "etb_exchange_rate",
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
        Project Cost
      </Typography>

      <Grid container spacing={6}>
        <Grid item display="flex" direction="row" md={6}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ pb: 2, mt: 1, borderBottom: 1, borderColor: "#ddd" }}
              >
                Cost Breakdown
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={3} columnSpacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Land Cost (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="land_cost_foreign"
                    defaultValue={getValue("land_cost_foreign")}
                    onChange={handleChange}
                    error={getError("land_cost_foreign").value}
                    helperText={getError("land_cost_foreign").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Building Cost (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="building_cost_foreign"
                    defaultValue={getValue("building_cost_foreign")}
                    onChange={handleChange}
                    error={getError("building_cost_foreign").value}
                    helperText={getError("building_cost_foreign").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Machinery Cost (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="machine_cost_foreign"
                    defaultValue={getValue("machine_cost_foreign")}
                    onChange={handleChange}
                    error={getError("machine_cost_foreign").value}
                    helperText={getError("machine_cost_foreign").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Transport Cost (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="transport_cost_foreign"
                    defaultValue={getValue("transport_cost_foreign")}
                    onChange={handleChange}
                    error={getError("transport_cost_foreign").value}
                    helperText={getError("transport_cost_foreign").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Office Equipment Cost (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="office_equipment_cost_foreign"
                    defaultValue={getValue("office_equipment_cost_foreign")}
                    onChange={handleChange}
                    error={getError("office_equipment_cost_foreign").value}
                    helperText={getError("office_equipment_cost_foreign").text}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    label="Other Capital Cost (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="other_capital_cost_foreign"
                    defaultValue={getValue("other_capital_cost_foreign")}
                    onChange={handleChange}
                    error={getError("other_capital_cost_foreign").value}
                    helperText={getError("other_capital_cost_foreign").text}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    label="Initial Working Capital (US Dollar)"
                    type="number"
                    sx={{ width: 1 }}
                    name="initial_working_capital_cost_foreign"
                    defaultValue={getValue(
                      "initial_working_capital_cost_foreign"
                    )}
                    onChange={handleChange}
                    error={
                      getError("initial_working_capital_cost_foreign").value
                    }
                    helperText={
                      getError("initial_working_capital_cost_foreign").text
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    label="Total"
                    type="number"
                    variant="standard"
                    sx={{ width: 1 }}
                    name="total_cost_foreign"
                    defaultValue={getValue("total_cost_foreign")}
                    onChange={handleChange}
                    error={getError("total_cost_foreign").value}
                    helperText={getError("total_cost_foreign").text}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={3} columnSpacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Land Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="land_cost_birr"
                    defaultValue={getValue("land_cost_birr")}
                    onChange={handleChange}
                    error={getError("land_cost_birr").value}
                    helperText={getError("land_cost_birr").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Building Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="building_cost_birr"
                    defaultValue={getValue("building_cost_birr")}
                    onChange={handleChange}
                    error={getError("building_cost_birr").value}
                    helperText={getError("building_cost_birr").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Machinery Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="machine_cost_birr"
                    defaultValue={getValue("machine_cost_birr")}
                    onChange={handleChange}
                    error={getError("machine_cost_birr").value}
                    helperText={getError("machine_cost_birr").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Transport Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="office_equipment_cost_birr"
                    defaultValue={getValue("office_equipment_cost_birr")}
                    onChange={handleChange}
                    error={getError("office_equipment_cost_birr").value}
                    helperText={getError("office_equipment_cost_birr").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Office Equipment Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="transport_cost_birr"
                    defaultValue={getValue("transport_cost_birr")}
                    onChange={handleChange}
                    error={getError("transport_cost_birr").value}
                    helperText={getError("transport_cost_birr").text}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    label="Other Capital Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="other_capital_cost_birr"
                    defaultValue={getValue("other_capital_cost_birr")}
                    onChange={handleChange}
                    error={getError("other_capital_cost_birr").value}
                    helperText={getError("other_capital_cost_birr").text}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    label="Initial Working Capital Cost (Birr)"
                    type="number"
                    sx={{ width: 1 }}
                    name="initial_working_capital_cost_birr"
                    defaultValue={getValue("initial_working_capital_cost_birr")}
                    onChange={handleChange}
                    error={getError("initial_working_capital_cost_birr").value}
                    helperText={
                      getError("initial_working_capital_cost_birr").text
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    label="Total"
                    type="number"
                    variant="standard"
                    sx={{ width: 1 }}
                    name="total_cost_birr"
                    defaultValue={getValue("total_cost_birr")}
                    onChange={handleChange}
                    error={getError("total_cost_birr").value}
                    helperText={getError("total_cost_birr").text}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item spacing={3} md={6}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ pb: 2, mt: 1, borderBottom: 1, borderColor: "#ddd" }}
              >
                Project Cost
              </Typography>
            </Grid>
            <Grid item md={6} sx={{ maxHeight: "min-content" }}>
              <Grid container spacing={3} direction="column">
                <Grid item md={6}>
                  <TextField
                    required
                    label="Equity Finance"
                    type="number"
                    sx={{ width: 1 }}
                    name="equity_finance"
                    defaultValue={getValue("equity_finance")}
                    onChange={handleChange}
                    error={getError("equity_finance").value}
                    helperText={getError("equity_finance").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Other Source Finance"
                    type="number"
                    sx={{ width: 1 }}
                    name="other_source_finance"
                    defaultValue={getValue("other_source_finance")}
                    onChange={handleChange}
                    error={getError("other_source_finance").value}
                    helperText={getError("other_source_finance").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Currency"
                    sx={{ width: 1 }}
                    name="currency_type"
                    defaultValue={getValue("currency_type")}
                    onChange={handleChange}
                    error={getError("currency_type").value}
                    helperText={getError("currency_type").text}
                    select
                  >
                    {Object.values(CurrencyTypes).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="ETB Exchange Rate"
                    type="number"
                    sx={{ width: 1 }}
                    name="etb_exchange_rate"
                    defaultValue={getValue("etb_exchange_rate")}
                    onChange={handleChange}
                    error={getError("etb_exchange_rate").value}
                    helperText={getError("etb_exchange_rate").text}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={3} direction="column">
                <Grid item md={6} sx={{ maxHeight: "min-content" }}>
                  <TextField
                    required
                    label="Loan Finance"
                    type="number"
                    sx={{ width: 1 }}
                    name="loan_finance"
                    defaultValue={getValue("loan_finance")}
                    onChange={handleChange}
                    error={getError("loan_finance").value}
                    helperText={getError("loan_finance").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Other Source Description"
                    sx={{ width: 1 }}
                    name="other_source_description"
                    defaultValue={getValue("other_source_description")}
                    onChange={handleChange}
                    error={getError("other_source_description").value}
                    helperText={getError("other_source_description").text}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    label="Actual Cost In Foreign"
                    type="number"
                    sx={{ width: 1 }}
                    name="actual_cost_of_foreign"
                    defaultValue={getValue("actual_cost_of_foreign")}
                    onChange={handleChange}
                    error={getError("actual_cost_of_foreign").value}
                    helperText={getError("actual_cost_of_foreign").text}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <TextField
                required
                label="Actual Cost In Foreign"
                type="number"
                sx={{ width: 1 }}
                name="actual_cost_of_foreign"
                defaultValue={getValue("actual_cost_of_foreign")}
                onChange={handleChange}
                error={getError("actual_cost_of_foreign").value}
                helperText={getError("actual_cost_of_foreign").text}
              />
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

export default ProjectCost;
