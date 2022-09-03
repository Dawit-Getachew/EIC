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
import { ProductModalElement, RawMaterialModalElement } from "./modals";
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
import { getCommonDate } from "src/helpers/getDateTime";
import { useSelector } from "react-redux";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const SourceOfFinance: FC<Props> = (props) => {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productRows, setProductRows] = useState([]);

  const addProductItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setProductRows(productRows.concat(data));
    }
    setIsProductModalVisible(false);
  };

  const [isRawMaterialModalVisible, setIsRawMaterialModalVisible] =
    useState(false);
  const [rawMaterialRows, setRawMaterialRows] = useState([]);

  const addRawMaterialItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setRawMaterialRows(rawMaterialRows.concat(data));
    }
    setIsRawMaterialModalVisible(false);
  };

  const inputs = [];

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
    if (productRows.length > 0) {
      FormActions.UpdateFormInput(
        { name: "products", value: productRows },
        dispatch
      );
    }
  }, [productRows, dispatch]);

  useEffect(() => {
    if (rawMaterialRows.length > 0) {
      FormActions.UpdateFormInput(
        { name: "raw_materials", value: rawMaterialRows },
        dispatch
      );
    }
  }, [rawMaterialRows, dispatch]);

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer);
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys(inputs, savedBuffer),
          ...(() => {
            const impl_keys = Object.keys(savedBuffer.project_impl_plan);
            const impl_values = Object.values(savedBuffer.project_impl_plan);
            const impl_obj = {};
            impl_values.forEach((value, idx) => {
              if (impl_keys[idx] === "public_utility_acquisition") {
                const util_keys = Object.keys(
                  savedBuffer.project_impl_plan.public_utility_acquisition
                );
                const util_values = Object.values(
                  savedBuffer.project_impl_plan.public_utility_acquisition
                );
                util_values.forEach(
                  (util_value, _idx) =>
                    (impl_obj[`impl_${util_keys[_idx]}`] =
                      getCommonDate(util_value))
                );
              } else {
                impl_obj[`impl_${impl_keys[idx]}`] = getCommonDate(value);
              }
            })
            return {
              ...impl_obj,
              starting_date: getCommonDate(savedBuffer.starting_date),
              ending_date: getCommonDate(savedBuffer.ending_date),
            }
          })()
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    if (savedBuffer.products) {
      if (savedBuffer.products.length > 0) {
        setProductRows(savedBuffer.products);
      }
    }
  }, [savedBuffer.products, setProductRows]);

  useEffect(() => {
    if (savedBuffer.raw_materials) {
      if (savedBuffer.raw_materials.length > 0) {
        setRawMaterialRows(savedBuffer.raw_materials);
      }
    }
  }, [savedBuffer.raw_materials, setRawMaterialRows]);

  return (
    <>
      <div>
        <div className="form-box-content">
          <Typography variant="h3" fontWeight="bold" color="text.primary">
            PROJECT IMPLEMENTATION PLAN
          </Typography>
          <Typography
            variant="h4"
            style={{ marginTop: "15px" }}
            fontWeight="normal"
            color="text.primary"
          >
            Please provide as reasonable and appropriate schedule
          </Typography>

          <Typography
            variant="h4"
            style={{ marginTop: "40px" }}
            fontWeight="bold"
            color="text.primary"
          >
            Starting and ending date of the project
          </Typography>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Starting Date
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  type="date"
                  {...register("starting_date", formState, dispatch, true)}
                />
              </FormControl>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "10px" }}
                >
                  Ending Date
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  type="date"
                  {...register("ending_date", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Typography
            variant="h4"
            style={{ marginTop: "40px" }}
            fontWeight="bold"
            color="text.primary"
          >
            Detail Activities and implementation time
          </Typography>

          <Grid container md={12} marginTop={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Activities</TableCell>
                    <TableCell align="right">
                      Implementation Date (D/M/Y)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">1</TableCell>
                    <TableCell align="left">
                      Project development and feasibility study
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_project_devt_feasiblility_study"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Land acquisition</TableCell>
                    <TableCell align="left">
                      {getFormData(formState, "impl_land_acquisition")}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="h4"
                        fontWeight="normal"
                        color="text.primary"
                      >
                        Building/Civil Work
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        Including foe construction material Parching order and
                        purchase.
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(formState, "impl_building_civil_work")}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">4</TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="h4"
                        fontWeight="normal"
                        color="text.primary"
                      >
                        Public utility acquisition
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{ marginTop: "15px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        Electricity
                      </Typography>

                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        Water
                      </Typography>

                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        Telecom
                      </Typography>

                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        If other...
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        {getFormData(formState, "impl_electricity")}
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        {getFormData(formState, "impl_water")}
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        {getFormData(formState, "impl_telecom")}
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{ marginTop: "10px" }}
                        fontWeight="normal"
                        color="text.primary"
                      >
                        {getFormData(formState, "impl_other")}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">5</TableCell>
                    <TableCell align="left">
                      Machinery procurement purchase
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_machinery_procurement_purchase"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">6</TableCell>
                    <TableCell align="left">
                      Reaching of machinery at project site
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_reaching_of_machinery_at_project_site"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">7</TableCell>
                    <TableCell align="left">
                      Work permit for technician
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_work_permit_for_technician"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">8</TableCell>
                    <TableCell align="left">
                      Machinery erection installation
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_machinery_erection_installation"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">9</TableCell>
                    <TableCell align="left">
                      Preparation of raw material (order, purchase, import)
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_preparation_of_raw_material"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      Co missing machines and make ready for operator
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_co_missing_machines_and_make_ready_for_operator"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">11</TableCell>
                    <TableCell align="left">Any other</TableCell>
                    <TableCell align="left">
                      {getFormData(formState, "impl_other")}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">12</TableCell>
                    <TableCell align="left">
                      Common cement of product service
                    </TableCell>
                    <TableCell align="left">
                      {getFormData(
                        formState,
                        "impl_common_cement_of_product_service"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Typography
            variant="h4"
            style={{ marginTop: "30px" }}
            fontWeight="normal"
            color="text.primary"
          >
            * Please try to provide accelerate information for further support
            of EIA on the expansion process
          </Typography>
        </div>
      </div>
    </>
  );
};

export default SourceOfFinance;
