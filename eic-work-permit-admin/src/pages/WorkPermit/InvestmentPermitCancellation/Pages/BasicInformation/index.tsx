/* eslint-disable */
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
  Checkbox,
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
import "./styles.css";
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
    "type_of_business",
    "type_of_ownership",
    "shareholders",
    "manager_full_name",
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

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys(inputs, savedBuffer),
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
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Name of Investor
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
                <FormLabel id="demo-radio-buttons-group-label">
                  Project Title
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
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Investment License Number
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("type_of_business", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Issued Date
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("type_of_business", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </>
        <Grid container width="100%" spacing={2}>
          <Grid item md={12}>
            <Typography
              variant="h5"
              style={{ marginTop: 30, fontSize: "16px" }}
            >
              Project Status
            </Typography>
          </Grid>

          <Grid item md={4}>
            <FormControlLabel
              label="Pre-Implementation"
              control={<Checkbox />}
            />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel
              label="Under process of land acquisition"
              control={<Checkbox />}
            />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel
              label="Under civil work construction"
              control={<Checkbox />}
            />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel
              label="Under machinery procurement"
              control={<Checkbox />}
            />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel
              label="Machinery erection & installation"
              control={<Checkbox />}
            />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel
              label="Preparation for production/service"
              control={<Checkbox />}
            />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel label="Operation" control={<Checkbox />} />
          </Grid>

          <Grid item md={4}>
            <FormControlLabel label="Other (specify)" control={<Checkbox />} />
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={2}>
          <Grid item md={12}>
            <Typography
              variant="h5"
              style={{ marginTop: 30, fontSize: "16px" }}
            >
              Have you got any incentive(s) (duty free, income tax or other
              privilege(s)) in relation to this investment project?
            </Typography>
          </Grid>

          <Grid item md={2}>
            <FormControlLabel label="Yes" control={<Checkbox />} />
          </Grid>

          <Grid item md={2}>
            <FormControlLabel label="No" control={<Checkbox />} />
          </Grid>
        </Grid>

        <Grid container width="100%" spacing={4}>
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 30 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                If yes, please describe the type(s) of incentive(s) or
                privilege(s)
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                multiline
                rows={2}
                maxRows={4}
                style={{ marginTop: 5 }}
                {...register("type_of_business", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>

          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 5 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Indicate reason(s) of cancellation and major problems(s)
                encountered
              </FormLabel>
              <TextField
                className="default-input"
                variant="outlined"
                multiline
                rows={2}
                maxRows={4}
                style={{ marginTop: 5 }}
                {...register("type_of_business", formState, dispatch, true)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BasicInformation;
