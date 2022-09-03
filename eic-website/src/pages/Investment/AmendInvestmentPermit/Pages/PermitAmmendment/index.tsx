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
  CircularProgress
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import { Selectors as BufferSelectors, selectServiceID, Actions as BufferActions } from "src/store/States/Buffer";
import { API as InvestmentPermitAmmendmentAPI } from "src/store/States/InvestmentPermitAmmendment/"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { ModalElement } from "./modals";
import countries from "src/common/countries";
import routes from "src/routes"

const AmendPermitForm = (props) => {
  const inputs = [
    "company_name",
    "trade_name",
    "type_of_business",
    "type_of_ownership",
    "shareholders",
    "manager_full_name",
    "investor_nationality",
    "investment_capital_birr",
    "investment_capital_usd"
  ];

  const optional_inputs = [
    "company_name_amharic",
    "trade_name_amharic",
    "manager_full_name_amharic",
  ];

  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const [isLoading, setIsLoading] = useState(false)
  const savedBuffer = useSelector(BufferSelectors.selectAmmendmentPermitBuffer);
  const service_id = useSelector(selectServiceID)
  const navigate = useNavigate()
  const handleSubmit = (data: any) => {
    setIsLoading(true)
    InvestmentPermitAmmendmentAPI.CreateInvestmentPermitAmmendment({
      company_name: data.company_name,
      company_name_amharic: data.company_name_amharic,
      investment_capital_birr: Number(data.investment_capital_birr),
      investment_capital_usd: Number(data.investment_capital_usd),
      investment_id: savedBuffer._id,
      investor_nationality: data.investor_nationality,
      manager_full_name: data.manager_full_name,
      manager_full_name_amharic: data.manager_full_name_amharic,
      service_id,
      shareholders: data.shareholders.map(item => ({
        address: item.address,
        country_of_incorporation: item.country_of_incorporation,
        name: item.name,
        nationality: item.nationality
      })),
      trade_name: data.trade_name,
      trade_name_amharic: data.trade_name_amharic,
      type_of_business: data.type_of_business,
      type_of_ownership: data.type_of_ownership
    }, (err, data) => {
      if (err) throw err
      setIsLoading(false)
      dispatch(BufferActions.ClearAmmendmentPermitBuffer())
      navigate(routes.INVESTMENT.AMEND_INVESTMENT_PERMIT.ROUTE, { replace: true })
    })
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

  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys([...inputs, ...optional_inputs], savedBuffer),
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
    <div className="form-box">
      {isVisible && <ModalElement isVisible={isVisible} onSubmit={addItem} />}
      <div className="form-box-header">Amend Investment Permit</div>
      <div className="form-box-content">
        <>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Name of the Company
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("company_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  የኩባንያው ስም
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("company_name_amharic", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Trade Name of the Company
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("trade_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  የንግድ ስም
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("trade_name_amharic", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Type of Business
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  select
                  {...register("type_of_business", formState, dispatch)}
                >
                  {business_types.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Nationality
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  select
                  {...register("investor_nationality", formState, dispatch)}
                >
                  {countries.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Type of Ownership
                </FormLabel>
                {getFormError(formState, "type_of_ownership").error ? (
                  <p style={{ color: "red" }}>
                    {getFormError(formState, "type_of_ownership").helperText}
                  </p>
                ) : (
                  <></>
                )}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {ownership_types.map((item) => (
                    <FormControlLabel
                      value={item}
                      control={
                        <Radio
                          {...registerForm({
                            name: "type_of_ownership",
                            formState,
                            dispatch,
                            exactValue: item,
                          })}
                        />
                      }
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </>
        <Grid container width="100%" spacing={4}>
          <Grid item md={12}>
            <div className="table-title">
              Name of Shareholders
              <Button
                style={{ backgroundColor: "#E6EDF6" }}
                onClick={() => setIsVisible(true)}
              >
                <div className="button-text">+ Add</div>
              </Button>
            </div>
          </Grid>
          <Grid item md={12}>
            {getFormError(formState, "shareholders").error ? (
              <p style={{ color: "red" }}>
                {getFormError(formState, "shareholders").helperText}
              </p>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item md={12}>
            <div className="main-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Nationality</TableCell>
                      <TableCell align="right">
                        Country of Incorporation
                      </TableCell>
                      <TableCell align="right">Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, idx) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{idx + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.nationality}</TableCell>
                        <TableCell align="right">
                          {row.country_of_incorporation}
                        </TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={4}>
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Full Name of the Manager
              </FormLabel>
              <TextField
                className="long-input"
                variant="outlined"
                {...register("manager_full_name", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                የአስተዳዳሪው ሙሉ ስም
              </FormLabel>
              <TextField
                className="long-input"
                variant="outlined"
                {...register("manager_full_name_amharic", formState, dispatch)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Amount of investment capital (in United States Dollar and
                Ethiopian Birr)
              </FormLabel>
              <TextField
                className="long-input"
                variant="outlined"
                placeholder="USD"
                style={{ marginBottom: 15 }}
                {...register("investment_capital_usd", formState, dispatch)}
                type="number"
              />
              <TextField
                className="long-input"
                variant="outlined"
                placeholder="ETB"
                {...register("investment_capital_birr", formState, dispatch)}
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={4}
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? <CircularProgress /> : <Button
            style={{
              color: "white",
              backgroundColor: "#1e447e",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 5,
            }}
            onClick={() => formSubmit(dispatch)}
          >
            Continue
          </Button>}

          <Button
            style={{
              color: "white",
              backgroundColor: "gray",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              marginLeft: 5,
            }}
          >
            Cancel
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default AmendPermitForm;
