import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  RadioGroup,
  Radio,
} from "@mui/material";
import { getCorrectDate } from "src/utils/date";
import Typography from "@mui/material/Typography";
import "../styles.css";
import CloudIcon from "src/assets/cloud-icon.png";
import RightIcon from "src/assets/user-right.png";
import { uploadFile } from "src/store/States/InvestmentPermit/actions";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  getFormError,
  FormActions,
  getFormData,
  selectRequriedKeys,
  registerForm,
} from "src/common/form";
import {
  Selectors as BufferSelectors,
  selectServiceID,
} from "src/store/States/Buffer";
import { useSelector, useDispatch } from "react-redux";
import {
  API as InvestmentPermitCancellationAPI,
  Actions as InvestmentPermitCancellationActions,
} from "src/store/States/InvestmentPermitCancellation";
import { useNavigate } from "react-router";
import routes from "src/routes";
import "./styles.css";

const PermitCancelForm = (props) => {
  const file_inputs = ["cancellation_document"];
  const optional_inputs = ["problems_encountered", "incentive_detail"];
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
  const _dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);
  const uploadItems = async (data: any) => {
    const toBeUploaded = Object.values(selectRequriedKeys(file_inputs, data));
    const uploaded = [];
    for (let i = 0; i < toBeUploaded.length; ++i) {
      const result = await uploadFile(toBeUploaded[i]);
      if (result.uri) {
        if (result.uri.length > 0) {
          uploaded.push(result.uri[0]);
        }
      }
      if (result.length > 0) {
        uploaded.push(result);
      }
    }
    return uploaded;
  };

  const service_id = useSelector(selectServiceID);
  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    const files = await uploadItems(data);
    const project_status = [];
    const keys = Object.keys(data);
    const values = Object.values(data);

    keys.forEach((key, idx) => {
      const foundIndex = project_status_types.findIndex(
        (type) => String(type) === String(key)
      );
      if (foundIndex >= 0) {
        if (values[idx]) project_status.push(key);
      }
    });

    InvestmentPermitCancellationAPI.CreateInvestmentPermitCancellation(
      {
        cancellation_document: files[0],
        duty_free_content: data.incentive_detail ? data.incentive_detail : "",
        has_duty_free: data.has_incentive === "Yes",
        investment_id: savedBuffer._id,
        problems_encountered: data.problems_encountered,
        project_status,
        service_id,
      },
      (err, data) => {
        if (err) throw err;
        setIsLoading(true);
        _dispatch(
          InvestmentPermitCancellationActions.AddInvestmentPermitCancellation(
            data
          )
        );
        navigate(routes.INVESTMENT.CANCEL_INVESTMENT_PERMIT.ROUTE, {
          replace: true,
        });
      }
    );
  };

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  let inputRef!: any;
  const uploadClick = (name: string) => {
    setCurrentFileTag(name);
    if (Object.keys(inputRef).length > 0) {
      inputRef.click();
    }
  };
  const [currentFileTag, setCurrentFileTag] = useState("");
  const onChangeFile = (value: any) => {
    if (value) {
      FormActions.UpdateFormInput({ name: currentFileTag, value }, dispatch);
    }
  };

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
                    getFormData(formState, "cancellation_document") ? RightIcon : CloudIcon
                  }
                  className="cloud-icon"
                  alt=""
                />
                <div className="document-attach-h2" style={{ margin: 10 }}>{upload_file_name}</div>
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
                <Button
                  style={{
                    border: "solid #0F91D2 2px",
                    borderRadius: 5,
                    backgroundColor: "#FBFDFE",
                    color: "#0F91D2",
                    fontSize: 10,
                  }}
                  onClick={() => uploadClick(inputs[idx])}
                >
                  Select File
                </Button>
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
          ...selectRequriedKeys(inputs, savedBuffer),
          updatedAt: getCorrectDate(savedBuffer.updatedAt),
        },
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  return (
    <div className="form-box">
      <input
        type="file"
        hidden={true}
        ref={(refInput) => (inputRef = refInput)}
        onChange={(e: any) => {
          onChangeFile(e.target.files[0]);
        }}
      />
      <div className="form-box-header">Cancellation Form</div>
      <div className="form-box-content">
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Name of Investor / Company
              </FormLabel>
              <TextField
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
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
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
                variant="outlined"
                {...register("incentive_detail", formState, dispatch)}
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

        <Grid
          container
          width="100%"
          spacing={4}
          style={{
            marginTop: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              style={{
                color: "white",
                backgroundColor: "#1e447e",
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
                marginRight: 15,
              }}
              onClick={() => formSubmit(dispatch)}
            >
              Cancel Permit
            </Button>
          )}

          <Button
            style={{
              color: "white",
              backgroundColor: "#C4BABA",
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

export default PermitCancelForm;
