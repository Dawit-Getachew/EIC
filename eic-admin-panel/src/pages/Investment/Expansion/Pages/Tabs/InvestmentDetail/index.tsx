import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
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
import "./investment_detail_styles.css";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  selectFormErrors,
  getFormError,
  FormActions,
  selectRequriedKeys,
  registerForm,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const InvestmentDetail: FC<Props> = (props) => {
  const sectors = ["Agriculture", "Industry", "Service"];
  const inputs = [
    "current_products",
    "anticipated_products",
    "raw_materials"
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

  const [productRows, setProductRows] = useState([])
  const [rawMaterialRows, setRawMaterialRows] = useState([])
  const [anticipatedProductRows, setAnticipatedProductRows] = useState([])
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys([...inputs, "investment_address"], savedBuffer),
        dispatch
      );
      if (savedBuffer.current_products) {
        if (savedBuffer.current_products.length > 0) {
          setProductRows(savedBuffer.current_products)
        }
      }

      if (savedBuffer.anticipated_products) {
        if (savedBuffer.anticipated_products.length > 0) {
          setAnticipatedProductRows(savedBuffer.anticipated_products)
        }
      }

      if (savedBuffer.raw_materials) {
        if (savedBuffer.raw_materials.length > 0) {
          setRawMaterialRows(savedBuffer.raw_materials)
        }
      }
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    if (formState.formData.investment_address) {
      const keys = Object.keys(formState.formData.investment_address);
      const values = Object.values(formState.formData.investment_address);
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput(
          { name: `investment_${key}`, value: values[idx] },
          dispatch
        );
      });
    }
  }, [formState.formData.investment_address]);

  return (
    <>
      <div>
        <div className="form-box-content">
          <Typography variant="h3" fontWeight="bold" color="text.primary">
            Main Products/Services
          </Typography>
          <Typography
            variant="h5"
            style={{ marginTop: "15px" }}
            fontWeight="normal"
            color="text.primary"
          >
            Show the Average production capacity (in percentage %) of each
            products/services and market destination in the past 2 year and
            anticipated amount with increased percentage in volume and new
            products as a result of expansion
          </Typography>

          <Typography
            variant="h4"
            style={{ marginTop: "25px" }}
            fontWeight="bold"
            color="text.primary"
          >
            The past 2 years production services and sale program (average)
          </Typography>

          <Grid container md={12} marginTop={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Local Share Market Share</TableCell>
                    <TableCell align="right">Export Share Market Share</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productRows.map((item, idx) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={idx}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.unit}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.local_share_market}</TableCell>
                      <TableCell align="right">{item.export_share_market}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Typography
            variant="h4"
            style={{ marginTop: "40px" }}
            fontWeight="bold"
            color="text.primary"
          >
            Anticipates (future) annual prod/service and Percentage increase and
            market share.
          </Typography>

          <Grid container md={12} marginTop={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Local Share Market Share</TableCell>
                    <TableCell align="right">Export Share Market Share</TableCell>
                    <TableCell align="right">Percentage Unit Increased</TableCell>
                    <TableCell align="right">Percentage Capacity Increased</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {anticipatedProductRows.map((item, idx) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={idx}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.unit}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.local_share_market}</TableCell>
                      <TableCell align="right">{item.local_share_market}</TableCell>
                      <TableCell align="right">{item.percentage_unit_increased}</TableCell>
                      <TableCell align="right">{item.percentage_capacity_increased}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Typography
            variant="h4"
            style={{ marginTop: "40px" }}
            fontWeight="bold"
            color="text.primary"
          >
            Raw material requirements (applicable to manufacturing and
            agricultural projects only)
          </Typography>

          <Grid container md={12} marginTop={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Type of Raw Material</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Local Source</TableCell>
                    <TableCell align="right">Imported Source</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rawMaterialRows.map((item, idx) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={idx}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.local_source}</TableCell>
                      <TableCell align="right">{item.import_source}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default InvestmentDetail;
