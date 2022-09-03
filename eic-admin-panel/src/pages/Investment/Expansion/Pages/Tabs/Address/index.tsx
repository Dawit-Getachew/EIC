import React, { useState, FC, useReducer, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import "../styles.css";
import "./address_styles.css";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const AddressElement: FC<Props> = (props) => {
  const inputs = [
    "investment_activity",
    "loan",
    "equity",
    "proposed_investment_capital",
    "project_description",
    "cost_land",
    "cost_building",
    "cost_machinery",
    "cost_material",
    "cost_other_costs",
    "cost_working_capital",
  ];
  const [formState, dispatch] = useReducer(formReducer, formInitState);

  const handleSubmit = (data: any) => {
    props.nextPage(data);
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer);
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys(inputs, savedBuffer),
          ...(() => {
            const cost_keys = Object.keys(savedBuffer.investment_costs);
            const cost_values = Object.values(savedBuffer.investment_costs);
            const cost_obj = {};
            cost_values.forEach(
              (value, idx) => (cost_obj[`cost_${cost_keys[idx]}`] = value)
            );

            const expected_keys = Object.keys(savedBuffer.expected_employees);
            const expected_values = Object.values(
              savedBuffer.expected_employees
            );
            const expected_obj = {};
            expected_values.forEach(
              (value, idx) =>
                (expected_obj[`expected_${expected_keys[idx]}`] = value)
            );

            const previous_keys = Object.keys(savedBuffer.previous_employees);
            const previous_values = Object.values(
              savedBuffer.previous_employees
            );
            const previous_obj = {};
            previous_values.forEach(
              (value, idx) =>
                (previous_obj[`previous_${previous_keys[idx]}`] = value)
            );

            const utility_keys = Object.keys(savedBuffer.project_utilities);
            const utility_values = Object.values(savedBuffer.project_utilities);
            const utility_obj = {};
            utility_values.forEach(
              (value, idx) =>
                (utility_obj[`utility_${utility_keys[idx]}`] = value)
            );
            return {
              ...cost_obj,
              ...expected_obj,
              ...previous_obj,
              ...utility_obj,
            };
          })(),
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    if (formState.formData.company_address) {
      const keys = Object.keys(formState.formData.company_address);
      const values = Object.values(formState.formData.company_address);
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput(
          { name: `business_${key}`, value: values[idx] },
          dispatch
        );
      });
    }
  }, [formState.formData.company_address]);

  useEffect(() => {
    if (formState.formData.representative_address) {
      const keys = Object.keys(formState.formData.representative_address);
      const values = Object.values(formState.formData.representative_address);
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput(
          { name: `representative_${key}`, value: values[idx] },
          dispatch
        );
      });
    }
  }, [formState.formData.representative_address]);

  useEffect(() => {
    if (formState.formData.home_address) {
      const keys = Object.keys(formState.formData.home_address);
      const values = Object.values(formState.formData.home_address);
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput(
          { name: `home_${key}`, value: values[idx] },
          dispatch
        );
      });
    }
  }, [formState.formData.home_address]);
  return (
    <div>
      <div className="form-box-content">
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          PROFILE OF PROPOSED INVESTMENT
        </Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "15px" }}
          fontWeight="bold"
          color="text.primary"
        >
          For the expansion/upgrading
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Project title /Investment activity/
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("investment_activity", formState, dispatch)}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Brief description of the project objective and major activities
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("project_description", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          style={{ marginTop: 35 }}
        >
          PROPOSED CAPITAL AND SOURCE OF CAPITAL
        </Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "15px" }}
          fontWeight="bold"
          color="text.primary"
        >
          For the expansion/upgrading
        </Typography>

        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Proposed Expansion Capital
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register(
                  "proposed_investment_capital",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Equity
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("equity", formState, dispatch)}
              />
            </FormControl>

            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Loan
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("loan", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          style={{ marginTop: 45, textDecoration: "underline" }}
          fontWeight="normal"
          color="text.primary"
        >
          Estimated Investment Cost
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Land
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_land", formState, dispatch)}
              />
            </FormControl>

            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Building
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_building", formState, dispatch)}
              />
            </FormControl>

            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Working Capital
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_working_capital", formState, dispatch)}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Machinery
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_machinery", formState, dispatch)}
              />
            </FormControl>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Material/Equipment
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_material", formState, dispatch)}
              />
            </FormControl>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Other Costs
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_other_costs", formState, dispatch)}
              />
            </FormControl>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Total
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("cost_other_costs", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          style={{ marginTop: 45 }}
        >
          Expected Employment Opportunity
        </Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "15px" }}
          fontWeight="bold"
          color="text.primary"
        >
          Expected
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Permanent
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expected_permanent_amount", formState, dispatch)}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Temporary
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expected_temporary_amount", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          style={{ marginTop: "35px" }}
          fontWeight="bold"
          color="text.primary"
        >
          Previously Created Opportunity
        </Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "35px" }}
          color="text.primary"
        >
          Permanent Employees
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Male
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register(
                  "previous_permanent_male_amount",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Female
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register(
                  "previous_permanent_female_amount",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          style={{ marginTop: "35px" }}
          color="text.primary"
        >
          Temporary Employees
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Male
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register(
                  "previous_temporary_male_amount",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Female
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register(
                  "previous_temporary_female_amount",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          style={{ marginTop: 45 }}
        >
          Project Site/Utility Required for Expansion
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Size of Land Required (Sq.M or Ha)
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register("utility_size_of_land_sqm", formState, dispatch)}
              />
            </FormControl>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Electrical Power (Kw)
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register(
                  "utility_electrical_power_kw",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Water (m3)
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                type="number"
                {...register("utility_water_m3", formState, dispatch)}
              />
            </FormControl>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Telecom Services Needed
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register(
                  "utility_telecom_services_needed",
                  formState,
                  dispatch
                )}
              />
            </FormControl>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Others (if any)
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("utility_other_services", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddressElement;
