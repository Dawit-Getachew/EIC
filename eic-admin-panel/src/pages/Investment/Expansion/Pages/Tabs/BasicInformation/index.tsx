import React, { useState, useReducer, useEffect, FC } from "react";
import {
  MenuItem,
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../styles.css";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  getFormError,
  FormActions,
  registerForm,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";
import { ModalElement } from "./modals";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const BasicInformation: FC<Props> = (props) => {
  const inputs = [
    "company_name",
    "company_name_amharic",
    "business_region",
    "business_city",
    "business_sub_city",
    "business_zone",
    "business_house_number",
    "business_telephone_direct",
    "business_fax",
    "business_po_box",
    "business_email",
    "expansion_region",
    "expansion_city",
    "expansion_sub_city",
    "expansion_zone",
    "expansion_house_number",
    "expansion_telephone_direct",
    "expansion_fax",
    "expansion_po_box",
    "expansion_email",
  ];
  const [formState, dispatch] = useReducer(formReducer, formInitState);

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

  const handleSubmit = (data: any) => {
    props.nextPage(data);
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const business_types = [
    "Private Limited Company",
    "One Person Private Limited Company",
    "Share Company",
    "Public Enterprise",
    "Cooperative Society",
    "Sole Proprietorship",
    "Civil Society Organization",
    "Other Engaging Business",
  ];

  const ownership_types = [
    "Domestic Investor",
    "Joint Investment (Foreign and Local Investment)",
    "Foreign Investor",
    "Branch",
  ];

  const countries = ["Ethiopia", "Eriteria"];
  const [isVisible, setIsVisible] = useState(false);
  const [rows, setRows] = useState([]);

  const addItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setRows(rows.concat(data));
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (rows.length > 0) {
      FormActions.UpdateFormInput(
        { name: "shareholders", value: rows },
        dispatch
      );
    }
  }, [rows]);

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer);
  console.log("lol", formState);
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys(inputs, savedBuffer),
          ...(() => {
            const address_keys = Object.keys(savedBuffer.company_address);
            const address_values = Object.values(savedBuffer.company_address);
            const address_obj = {};
            address_values.forEach(
              (value, idx) =>
                (address_obj[`business_${address_keys[idx]}`] = value)
            );

            const expansion_keys = Object.keys(
              savedBuffer.company_expansion_address
            );
            const expansion_values = Object.values(
              savedBuffer.company_expansion_address
            );
            const expansion_obj = {};
            expansion_values.forEach(
              (value, idx) =>
                (address_obj[`expansion_${expansion_keys[idx]}`] = value)
            );

            return {
              ...address_obj,
              ...expansion_obj,
            };
          })(),
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    if (savedBuffer.shareholders) {
      if (savedBuffer.shareholders.length > 0) {
        setRows(savedBuffer.shareholders);
      }
    }
  }, [savedBuffer.shareholders, setRows]);

  return (
    <div>
      <ModalElement isVisible={isVisible} onSubmit={addItem} />
      <div className="form-box-content">
        <>
          <Typography variant="h3" fontWeight="bold" color="text.primary">
            PARTICULAS OF THE APPLICANT
          </Typography>

          <Typography
            variant="h4"
            style={{ marginTop: "15px" }}
            fontWeight="bold"
            color="text.primary"
          >
            Name and Address
          </Typography>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Name of Investor Company
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("company_name", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Name of Investor Company (Amharic)
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register(
                    "company_name_amharic",
                    formState,
                    dispatch,
                    true
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Typography
            variant="h4"
            style={{ marginTop: "45px", textDecoration: "underline" }}
            fontWeight="normal"
            color="text.primary"
          >
            Location of the previous project
          </Typography>
          <Grid container width="100%" spacing={4}>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Region
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_region", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  City
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_city", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Zone
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_zone", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Sub City
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_sub_city", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  House Number
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register(
                    "business_house_number",
                    formState,
                    dispatch,
                    true
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Email
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_email", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Telephone
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register(
                    "business_telephone_direct",
                    formState,
                    dispatch,
                    true
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Cellphone
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register(
                    "business_telephone_mobile",
                    formState,
                    dispatch,
                    true
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Fax
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_fax", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  PO Box
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("business_po_box", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Other Address
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register(
                    "business_other_address",
                    formState,
                    dispatch,
                    true
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </>

        <Typography
          variant="h4"
          style={{ marginTop: "45px", textDecoration: "underline" }}
          fontWeight="normal"
          color="text.primary"
        >
          If the expansion location is different from the previous
        </Typography>
        <Grid container width="100%" spacing={4}>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Region
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_region", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                City
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_city", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Zone
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_zone", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={4}>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Sub City
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_sub_city", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                House Number
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register(
                  "expansion_house_number",
                  formState,
                  dispatch,
                  true
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Email
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_email", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={4}>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Telephone
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register(
                  "expansion_telephone_direct",
                  formState,
                  dispatch,
                  true
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Cellphone
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register(
                  "expansion_telephone_mobile",
                  formState,
                  dispatch,
                  true
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Fax
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_fax", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                PO Box
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register("expansion_po_box", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ marginBottom: "10px" }}
              >
                Other Address
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                {...register(
                  "expansion_other_address",
                  formState,
                  dispatch,
                  true
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BasicInformation;
