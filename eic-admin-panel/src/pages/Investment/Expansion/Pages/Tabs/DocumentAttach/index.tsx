import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
} from "@mui/material";
import "../styles.css";
import "./styles.css";
import CloudIcon from "src/assets/cloud-icon.png";
import RightIcon from "src/assets/user-right.png";
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

const DocumentAttach: FC<Props> = (props) => {
  const upload_types = [
    "Copy of Business License",
    "Summary of Financial Statement of the Recent Two Years",
    "Feasibility Study of the Project",
    "List of Capital Goods and Basic Raw Materials (Machinery, Workshop Tools and Laboratory Equipment, Construction Materials (if imported), Raw Materials and Inputs (if imported)",
    "Land Lice Agreement (if the expansion or upgrading is planned too be held on existing site)",
  ];

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  const inputs = [
    "copy_of_business_license",
    "financial_statement",
    "feasibility_study",
    "list_of_capital_good_and_raw_materials",
    "land_lice_agreement",
  ];

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
        {getFormError(formState, inputs[idx]).error ? (
          <p style={{ color: "red" }}>
            {getFormError(formState, inputs[idx]).helperText}
          </p>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item md={6} xs={12}>
        <div className="document-attach-box">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="row"
          >
            <Grid item md={4}>
              <div className="flex-r flex-justify-start">
                <img
                  src={
                    getFormData(formState, inputs[idx]) ? RightIcon : CloudIcon
                  }
                  alt=""
                  className="cloud-icon"
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
                    getFormData(formState, inputs[idx])
                      ? String(getFormData(formState, inputs[idx]))
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

  const [formState, dispatch] = useReducer(formReducer, formInitState);

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer);
  const handleSubmit = (data: any) => {
    props.nextPage({
      ...savedBuffer,
      ...data,
    });
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

  const submitFunction = () => {
    formSubmit(dispatch);
  };

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys(
          [
            ...inputs, "expansion_documents", "factors_influencing_plan",
            "how_to_avoid_problems", "support_needed_from_eic", "other_documents"
        ], savedBuffer),
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    if (formState.formData.expansion_documents) {
      const keys = Object.keys(formState.formData.expansion_documents);
      const values = Object.values(formState.formData.expansion_documents);
      keys.forEach((key, idx) => {
        FormActions.UpdateFormInput(
          { name: key, value: values[idx] },
          dispatch
        );
      });
    }
  }, [formState.formData.expansion_documents]);

  return (
    <>
      <div className="form-box-content">
        <input
          type="file"
          hidden={true}
          ref={(refInput) => (inputRef = refInput)}
          onChange={(e: any) => {
            onChangeFile(e.target.files[0]);
          }}
        />
        <div>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="column"
          >
            {upload_types.map((item, idx) => (
              <UploadElement upload_file_name={item} key={idx} idx={idx} />
            ))}
          </Grid>
          <Grid container width="100%" spacing={4} justifyContent="flex-start">
            <Grid item md={12} xs={12}>
              {getFormError(formState, "heard_from").error ? (
                <p style={{ color: "red" }}>
                  {getFormError(formState, "heard_from").helperText}
                </p>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </div>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          style={{ marginTop: "45px" }}
        >
          Please provide as information on the following
        </Typography>

        <Grid container width="100%" spacing={4}>
          <Grid item md={12} xs={12}>
            <Typography
              variant="h4"
              style={{ marginTop: "15px" }}
              fontWeight="normal"
              color="text.primary"
            >
              1. Main factors influencing project implementation plan and
              product marketing of the existing project (facility land, sales
              performance, variation in gross margin, over heads, finance cost,
              raw material cost variation, tax system....)
            </Typography>

            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <TextField
                  className="default-input"
                  variant="outlined"
                  multiline
                  rows={5}
                  {...register("factors_influencing_plan", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item md={12} xs={12}>
            <Grid item md={12} xs={12}>
              <Typography
                variant="h4"
                style={{ marginTop: "15px" }}
                fontWeight="normal"
                color="text.primary"
              >
                2. What do you intended to do in order to avoid previous
                problems for the fast and accurate implementation of the
                expansion project
              </Typography>

              <FormControl className="flex-c" style={{ marginTop: 10 }}>
                <TextField
                  className="default-input"
                  variant="outlined"
                  multiline
                  rows={5}
                  {...register("how_to_avoid_problems", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography
                variant="h4"
                style={{ marginTop: "25px" }}
                fontWeight="normal"
                color="text.primary"
              >
                3. What are the basic support that has to be provided by EIC
              </Typography>

              <FormControl className="flex-c" style={{ marginTop: 10 }}>
                <TextField
                  className="default-input"
                  variant="outlined"
                  multiline
                  rows={5}
                  {...register("support_needed_from_eic", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography
                variant="h4"
                style={{ marginTop: "25px" }}
                fontWeight="normal"
                color="text.primary"
              >
                4. Please specify if you have other comments
              </Typography>

              <FormControl className="flex-c" style={{ marginTop: 10 }}>
                <TextField
                  className="default-input"
                  variant="outlined"
                  multiline
                  rows={5}
                  {...register("other_documents", formState, dispatch, true)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DocumentAttach;
