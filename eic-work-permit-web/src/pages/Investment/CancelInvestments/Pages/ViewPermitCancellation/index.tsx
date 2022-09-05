/* eslint-disable */
import { useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { getCorrectDate } from "src/utils/date";
import Typography from "@mui/material/Typography";
import "../styles.css";
import CloudIcon from "src/assets/cloud-icon.png";
import RightIcon from "src/assets/user-right.png";
import {
  formInitState,
  formReducer,
  register,
  setFormDefaults,
  getFormError,
  FormActions,
  registerForm,
  getFormData,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import PageHeader from "./PageHeader"
import "./styles.css";

const ViewCancelRequest = (props) => {
  const file_inputs = ["cancellation_document"];
  const optional_inputs = ["problems_encountered", "duty_free_content"];
  const inputs = [
    ...file_inputs,
    "company_name",
    "company_name_amharic",
    "ref_number",
    "has_incentive",
    "updatedAt",
  ];
  const project_status_types = [
    "Pre-Implementation",
    "Machinery Procurement",
    "Processing Land Acquisition",
    "Machinery Erecting/Installation",
    "Civil Works Construction",
    "Preparation for production/service",
    "Preparation for Production/Services",
    "Other (specify)",
  ];
  const [formState, dispatch] = useReducer(formReducer, formInitState);
  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const handleSubmit = async (data: any) => { };

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  const UploadElement: FC<UploadElementProps> = ({ upload_file_name, idx }) => (
    <>
      <Grid item md={12} xs={12}>
        <div className="document-attach-h1">{upload_file_name}</div>
      </Grid>
      <Grid item md={12} xs={12}>
        {getFormError(formState, "cancellation_document").error ? (
          <p style={{ color: "red" }}>
            {getFormError(formState, "cancellation_document").helperText}
          </p>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item md={12} xs={12}>
        <div className="document-attach-box">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="row"
          >
            <Grid item md={4} justifyContent="flex-start">
              <div className="flex-r flex-both-start">
                <img
                  src={
                    getFormData(formState, inputs[idx]) ? RightIcon : CloudIcon
                  }
                  className="cloud-icon"
                  alt=""
                />
                <div className="document-attach-h2">{upload_file_name}</div>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="flex-c flex-both-center">
                <div className="document-attach-text">
                  Select a file or drag and drop here
                </div>
                <div className="document-attach-text2">
                  JPG, PNG or PDF, file size no more than 10MB
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="flex-both-center">
                <a
                  href={
                    getFormData(formState, "cancellation_document")
                      ? String(getFormData(formState, "cancellation_document"))
                      : "#"
                  }
                  style={{ textDecoration: "none" }}
                  download
                  target="_blank"
                >
                  <Button
                    style={{
                      border: "solid #0F91D2 2px",
                      borderRadius: 5,
                      backgroundColor: "#FBFDFE",
                      color: "#0F91D2",
                      fontSize: 10,
                    }}
                  >
                    Download File
                  </Button>
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );

  const savedBuffer = useSelector(
    BufferSelectors.selectCancellationPermitBuffer
  );
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        {
          ...selectRequriedKeys([...inputs, ...optional_inputs], savedBuffer),
          updatedAt: getCorrectDate(savedBuffer.updatedAt),
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  return (
    <>
      <PageHeader />
      <div className="form-box">
        <div className="form-box-header">Cancellation Form</div>
        <div className="form-box-content">
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Name of Investor / Company
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
                  የድርጅቱ ስም
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
                  Investment License No
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("ref_number", formState, dispatch)}
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
                  type="date"
                  {...register("updatedAt", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "5px" }}>
            <Grid item md={12} xs={12}>
              <Typography variant={"h4"} fontWeight="normal">
                Project Status
              </Typography>
            </Grid>

            {project_status_types.slice(0, 3).map((item) => (
              <Grid item md={4} xs={12}>
                <FormControl className="flex-c">
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...registerForm({
                          name: item,
                          formState,
                          dispatch,
                          isCheckbox: true,
                        })}
                        checked={(() => {
                          if (savedBuffer.project_status) {
                            return (
                              savedBuffer.project_status.findIndex(
                                (status) => String(status) === String(item)
                              ) >= 0
                            );
                          }
                          return false;
                        })()}
                      />
                    }
                    label={item}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Grid container width="100%" spacing={4}>
            {project_status_types.slice(3, 6).map((item) => (
              <Grid item md={4} xs={12}>
                <FormControl className="flex-c">
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...registerForm({
                          name: item,
                          formState,
                          dispatch,
                          isCheckbox: true,
                        })}
                        checked={(() => {
                          if (savedBuffer.project_status) {
                            return (
                              savedBuffer.project_status.findIndex(
                                (status) => String(status) === String(item)
                              ) >= 0
                            );
                          }
                          return false;
                        })()}
                      />
                    }
                    label={item}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Grid container width="100%" spacing={4}>
            {project_status_types.slice(6, 8).map((item) => (
              <Grid item md={4} xs={12}>
                <FormControl className="flex-c">
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...registerForm({
                          name: item,
                          formState,
                          dispatch,
                          isCheckbox: true,
                        })}
                        checked={(() => {
                          if (savedBuffer.project_status) {
                            return (
                              savedBuffer.project_status.findIndex(
                                (status) => String(status) === String(item)
                              ) >= 0
                            );
                          }
                          return false;
                        })()}
                      />
                    }
                    label={item}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "5px" }}>
            <Grid item md={12} xs={12}>
              <Typography variant={"h4"} fontWeight="normal">
                Have you got any incentive(s) (duty free, income tax or other
                privilege(s)) in relation to this investment project?
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c">
                {getFormError(formState, "has_incentive").error ? (
                  <p style={{ color: "red" }}>
                    {getFormError(formState, "has_incentive").helperText}
                  </p>
                ) : (
                  <></>
                )}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {["Yes", "No"].map((item) => (
                    <FormControlLabel
                      value={item}
                      control={
                        <Radio
                          {...registerForm({
                            name: "has_incentive",
                            formState,
                            dispatch,
                            exactValue: item,
                          })}
                          checked={(() => {
                            if (item === "Yes") {
                              return savedBuffer.has_incentive;
                            }

                            if (item === "No") {
                              return !savedBuffer.has_incentive;
                            }
                          })()}
                        />
                      }
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "1px" }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "4px" }}
                >
                  If yes, please describe the type(s) of incentive(s) or
                  privilege(s)
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("duty_free_content", formState, dispatch)}
                  multiline
                  rows={2}
                  maxRows={4}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: "5px" }}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: "4px" }}
                >
                  Indicate reason(s) of cancellation and major problem(s)
                  encountered
                </FormLabel>
                <TextField
                  className="default-input"
                  variant="outlined"
                  {...register("problems_encountered", formState, dispatch)}
                  multiline
                  rows={2}
                  maxRows={4}
                />
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              {["Power of Attorney or Investor Visa"].map((item, idx) => (
                <UploadElement upload_file_name={item} idx={idx} key={idx} />
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ViewCancelRequest;
