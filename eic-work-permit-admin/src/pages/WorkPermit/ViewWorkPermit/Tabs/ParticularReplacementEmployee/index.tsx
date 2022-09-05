/* eslint-disable */
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
  IconButton,
  Tooltip
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
import EyeIcon from "@mui/icons-material/RemoveRedEyeSharp";
import "../styles.css";
import "./styles.css";
import closestIndexTo from "date-fns/esm/closestIndexTo/index";
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
import { ViewReplacementEmployeeModalElement } from "./modals"

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const ParticularEthReplacementEmployee: FC<Props> = (props) => {
  const [isViewEmployeeModalVisible, setIsViewEmployeeModalVisible] = useState(false);
  const [employeeRows, setEmployeeRows] = useState([]);

  const addEmployeeItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setEmployeeRows(employeeRows.concat(data));
    }
    setIsViewEmployeeModalVisible(false);
  };

  const inputs = [
    "replacement_employees"
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
        { name: "replacement_employees", value: employeeRows },
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
    console.log('replacement', savedBuffer)
    if (savedBuffer) {
      if (savedBuffer.replacement_employees) {
        if (savedBuffer.replacement_employees.length > 0) {
          setEmployeeRows(savedBuffer.replacement_employees);
        }
      }
    }
  }, [savedBuffer.replacement_employees, setEmployeeRows]);

  const [selectedEmployee, setSelectedEmployee] = useState<any>({})
  return (
    <>
      <div className="form-box">
        {isViewEmployeeModalVisible && (
          <ViewReplacementEmployeeModalElement
            isVisible={isViewEmployeeModalVisible}
            onSubmit={addEmployeeItem}
            data={selectedEmployee}
          />
        )}
        <div className="form-box-content">
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Particulars of Ethiopian Replacement Employee</div>
            </Grid>
          </Grid>
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
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              {getFormError(formState, "replacement_employees").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "replacement_employees").helperText}</p>
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
                        <TableCell align="right">Actions</TableCell>
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
                          <Tooltip title="View Replacement Employee">
                            <IconButton color="secondary" onClick={() => {
                              setIsViewEmployeeModalVisible(true)
                              setSelectedEmployee(row)
                            }}>
                              <EyeIcon />
                            </IconButton>
                          </Tooltip>
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