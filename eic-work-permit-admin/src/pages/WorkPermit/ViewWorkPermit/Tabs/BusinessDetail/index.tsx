/* eslint-disable */
import { FC, useReducer, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
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
import { getCommonDate } from "src/store/Helpers/date"
import CountryInput from "src/components/CountryInput"

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const BusinessDetail: FC<Props> = (props) => {
  const inputs = [
    "country_of_incorporation",
    "business_activity",
    "capital_of_enterprise",
    "investment_permit_license_number",
    "date_of_issuance",
    "expansion_license_number",
    "current_total_number_of_expansion",
    "current_total_number_of_expats",
    "current_number_of_permanent_eth_employees",
    "current_number_of_holding_eth_management_posts",
    "tin_number"
  ];

  const optional_inputs = [
    "business_location",
    "business_license_number",
    "business_license_date_of_issuance",
    "expansion_license_date_of_issuance"
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

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys([...inputs, ...optional_inputs], {
          ...savedBuffer,
          date_of_issuance: getCommonDate(savedBuffer.date_of_issuance),
          business_license_date_of_issuance: getCommonDate(savedBuffer.business_license_date_of_issuance),
          expansion_license_date_of_issuance: getCommonDate(savedBuffer.expansion_license_date_of_issuance),
        }),
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  return (
    <div>
      <div className="form-box-content">
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Business Detail</div>
          </Grid>
        </Grid>
        <>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Nationality / Country of incorporation of enterprise
                </FormLabel>
                <CountryInput
                  registerCountry={() => register("country_of_incorporation", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investment / Business activity
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("business_activity", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Business location of enterprise
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("business_location", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Capital of enterprise
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="number"
                  {...register("capital_of_enterprise", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investment Permit Number
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("investment_permit_license_number", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investment Permit Date of Issue
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("date_of_issuance", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Business License Number
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("business_license_number", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Business License Date of Issue
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("business_license_date_of_issuance", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Expansion License Number
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("expansion_license_number", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Expansion License Date of Issue
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  {...register("expansion_license_date_of_issuance", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Tin Number
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("tin_number", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Total number of employees in enterprise (current)
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="number"
                  {...register("current_total_number_of_expansion", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Total number of expats (current)
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="number"
                  {...register("current_total_number_of_expats", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Total number of Ethiopian employees in permanent positions
                  (current)
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="number"
                  {...register("current_number_of_permanent_eth_employees", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Total number of Ethiopian employees holding management posts
                  (current)
                </FormLabel>
                <TextField
                  variant="outlined"
                  type="number"
                  {...register("current_number_of_holding_eth_management_posts", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </>
      </div>
    </div>
  );
};

export default BusinessDetail;