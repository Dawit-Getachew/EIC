import React, { useState, useReducer, useEffect, FC } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  MenuItem,
  Box,
  TextareaAutosize,
  IconButton
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
import "./styles.css";
import closestIndexTo from "date-fns/esm/closestIndexTo/index";
import { AddReplacementEmployeeModalElement } from "./modals";
import RemoveIcon from "@mui/icons-material/CancelRounded"
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  selectFormErrors,
  getFormError,
  FormActions,
  getFormData,
  selectRequriedKeys,
  registerForm,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const ParticularEthReplacementEmployee: FC<Props> = (props) => {
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);
  const [employeeRows, setEmployeeRows] = useState([]);

  const addEmployeeItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setEmployeeRows(employeeRows.concat(data));
    }
    setIsAddEmployeeModalVisible(false);
  };

  const inputs = [
    "employees"
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

  useEffect(() => {
    if (employeeRows.length > 0) {
      FormActions.UpdateFormInput(
        { name: "employees", value: employeeRows },
        dispatch
      );
    }
  }, [employeeRows, dispatch]);

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
    if (savedBuffer) {
      if (savedBuffer.employees) {
        if (savedBuffer.employees.length > 0) {
          setEmployeeRows(savedBuffer.employees);
        }
      }
    }
  }, [savedBuffer.employees, setEmployeeRows]);

  console.log("state", formState);

  return (
    <>
      <div className="form-box">
        {isAddEmployeeModalVisible && (
          <AddReplacementEmployeeModalElement
            isVisible={isAddEmployeeModalVisible}
            onSubmit={addEmployeeItem}
          />
        )}
        <div className="form-box-header">Particulars of Ethiopian Replacement Employee</div>
        <div className="form-box-content">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              <div className="investment-detail-title">
                ANNEX I: PARTICULARS OF ETHIOPIAN REPLACEMENT EMPLOYEE
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div className="flex-both-center">
                <Button style={{ backgroundColor: '#E6EDF6' }} onClick={() => setIsAddEmployeeModalVisible(true)}>
                  <div className="button-text">+ Add</div>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              {getFormError(formState, "employees").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "employees").helperText}</p>
              ) : <></>}
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            display="flex"
            alignItems={"end"}
          >
            <Grid item md={12}>
              <div className="main-table">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>NO</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Full Address</TableCell>
                        <TableCell align="right">Description of Academic Credtials</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeRows.map((row, idx) => (
                        <TableRow
                          key={idx}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{idx + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.age}</TableCell>
                          <TableCell align="right">{row.gender}</TableCell>
                          <TableCell align="right">{row.full_address}</TableCell>
                          <TableCell align="right">{row.description_of_academic_credentials_and_experience}</TableCell>
                          <TableCell align="right">
                            <IconButton color="error" onClick={() => setEmployeeRows(employeeRows.filter((_, _idx) => idx !== _idx))}>
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ParticularEthReplacementEmployee;
