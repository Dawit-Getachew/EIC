import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
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
import { uploadFile } from "src/store/States/InvestmentPermit/actions"
import { API as InvestmentPermitAPI } from "src/store/States/InvestmentPermit/"
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router"
import routes from "src/routes"
import PageHeader from "./PageHeader"

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const DocumentAttach: FC<Props> = (props) => {
  const upload_types = [
    "Your Company Registration Form",
  ];

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
    isDownload?: boolean
  }

  const inputs = [
    "your_company_registration_form",
  ];

  let inputRef!: any;
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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

  const UploadElement: FC<UploadElementProps> = ({ upload_file_name, idx, isDownload }) => (
    <>
      {!Boolean(isDownload) && <Grid item md={12} xs={12}>
        <div className="document-attach-h1">{upload_file_name}</div>
      </Grid>}
      {!Boolean(isDownload) && <Grid item md={12} xs={12}>
        {getFormError(formState, inputs[idx]).error ? (
          <p style={{ color: "red" }}>
            {getFormError(formState, inputs[idx]).helperText}
          </p>
        ) : (
          <></>
        )}
      </Grid>}
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
                />
                <div className="document-attach-h2">{upload_file_name}</div>
              </div>
            </Grid>
            {Boolean(isDownload) ? <Grid item md={6}>
              <div className="flex-c flex-both-center">
                <div className="document-attach-text">
                  This is a template for you company form
                </div>
                <div className="document-attach-text2">
                  Please download the .docx file and upload it below
                </div>
              </div>
            </Grid> : <Grid item md={6}>
              <div className="flex-c flex-both-center">
                <div className="document-attach-text">
                  Select a file or drag and drop here
                </div>
                <div className="document-attach-text2">
                  JPG, PNG or PDF, file size no more than 10MB
                </div>
              </div>
            </Grid>}
            <Grid item md={2}>
              <div className="flex-both-center">
                {isDownload ? (
                  <a href={'/static/files/company_name.docx'} style={{ textDecoration: "none" }} download target="_blank">
                    <Button
                      style={{
                        border: "solid #0F91D2 2px",
                        borderRadius: 5,
                        backgroundColor: "#FBFDFE",
                        color: "#0F91D2",
                        fontSize: 10
                      }}
                    >Download File</Button>
                  </a>
                ) : (
                  <Button
                    style={{
                      border: "solid #0F91D2 2px",
                      borderRadius: 5,
                      backgroundColor: "#FBFDFE",
                      color: "#0F91D2",
                      fontSize: 10
                    }}
                    onClick={() => uploadClick(inputs[idx])}
                  >Select File</Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );

  const [formState, dispatch] = useReducer(formReducer, formInitState);

  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer);
  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const response = await uploadFile(data['your_company_registration_form'])
    InvestmentPermitAPI.UpdateCompanyRegistrationForm({
      _id: savedBuffer._id, company_registration_form: response
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        setIsLoading(false)
        navigate(routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE, { replace: true })
      }
    })
  };

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys(inputs, savedBuffer),
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  return (
    <>
      <div className="form-box">
        <div className="form-box-header">Upload your company registration form</div>
        <input
          type="file"
          hidden={true}
          ref={(refInput) => (inputRef = refInput)}
          onChange={(e: any) => {
            onChangeFile(e.target.files[0]);
          }}
        />
        <div className="form-box-content">
          <Grid container width="100%" className="form-box-notice" style={{ marginBottom: 15 }} justifyContent="flex-start">
            <Grid
              item
              md={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <InfoOutlinedIcon style={{ fontSize: "45px" }} />
            </Grid>
            <Grid item md={2} display="flex" justifyContent="center" alignItems="center">
              <Typography variant={"h3"}>
                Notice
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant={"h4"} style={{ fontWeight: "normal" }}>
                Please upload your new company name. Please use the form provided in this page.
              </Typography>
            </Grid>
          </Grid>
          <Grid container width="100%" style={{ marginTop: 50 }}>
            <Grid item md={12}>
              <UploadElement upload_file_name={"Template for Company Registration"} idx={0} isDownload={true} />
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} justifyContent="center">
            <Grid item md={8} xs={12}>
              <div
                className="document-attach-title"
                style={{ marginBottom: 25 }}
              >
                Please submit the following documents
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="column"
          >
            <UploadElement upload_file_name={"Your Company Registration Form"} idx={0} />
          </Grid>

          <Grid container width="100%" spacing={4} justifyContent="center" style={{ marginTop: 20 }}>
            <Grid
              item
              md={8}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {isLoading ? <CircularProgress /> : <Button
                style={{
                  color: "white",
                  backgroundColor: "#1e447e",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onClick={() => formSubmit(dispatch)}
              >
                Upload
              </Button>}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default DocumentAttach;
