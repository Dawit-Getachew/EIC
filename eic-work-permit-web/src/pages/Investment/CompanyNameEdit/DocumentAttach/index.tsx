/* eslint-disable */
import React, { useState, useReducer, useEffect, FC } from "react";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormLabel,
  Typography,
  CircularProgress
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
  getFormError,
  FormActions,
  getFormData,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { uploadFile } from "src/store/States/InvestmentPermit/actions"
import { API as InvestmentPermitAPI } from "src/store/States/InvestmentPermit/"
import { useNavigate } from "react-router"
import routes from "src/routes"

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const DocumentAttach: FC<Props> = (props) => {
  const upload_types = ["Memorandum of Association & Articles"];
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  const inputs = [
    "company_name",
    "company_name_amharic",
    "trade_name",
    "trade_name_amharic",
    "memorandum_of_association_articles"
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
        {getFormError(formState, "memorandum_of_association_articles").error ? (
          <p style={{ color: "red" }}>
            {getFormError(formState, "memorandum_of_association_articles").helperText}
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
            <Grid item md={4} justifyContent="flex-start">
              <div className="flex-r flex-both-start">
                <img
                  src={
                    getFormData(formState, "memorandum_of_association_articles") ? RightIcon : CloudIcon
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
                <Button
                  style={{
                    border: "solid #0F91D2 2px",
                    borderRadius: 5,
                    backgroundColor: "#FBFDFE",
                    color: "#0F91D2",
                    fontSize: 10,
                  }}
                  onClick={() => uploadClick("memorandum_of_association_articles")}
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

  const [formState, dispatch] = useReducer(formReducer, formInitState);

  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer);
  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const response = await uploadFile(data["memorandum_of_association_articles"])
    if (String(response).length > 10) {
      InvestmentPermitAPI.UpdateNewCompanyName({
        _id: savedBuffer._id,
        edited_name: data.company_name,
        edited_name_amharic: data.company_name_amharic,
        edited_trade_name: data.trade_name,
        edited_trade_name_amharic: data.trade_name_amharic,
        memorandum_of_association: response
      }, (err, data) => {
        if (err) throw err
        if (data._id) {
          setIsLoading(false)
          navigate(routes.WORK_PERMIT.MY_WORK_PERMITS.ROUTE, { replace: true })
        }
      })
    }
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
        <div className="form-box-header">Edit Your Company Name</div>
        <input
          type="file"
          hidden={true}
          ref={(refInput) => (inputRef = refInput)}
          onChange={(e: any) => {
            onChangeFile(e.target.files[0]);
          }}
        />
        <div className="form-box-content">
          <Grid container width="100%" className="form-box-notice">
            <Grid
              item
              md={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <InfoOutlinedIcon style={{ fontSize: "45px" }} />
            </Grid>
            <Grid item md={10}>
              <Typography variant={"h3"} style={{ marginBottom: "10px" }}>
                Notice
              </Typography>

              <Typography variant={"h4"} style={{ fontWeight: "normal" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} justifyContent="center">
            <Grid item md={8} xs={12}>
              <div
                className="document-attach-title"
                style={{ marginBottom: 25 }}
              >
                Please Provide the Following Information
              </div>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Name of the Company
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
                  Trade Name of the Company
                </FormLabel>
                <TextField
                  
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
                  
                  variant="outlined"
                  {...register("trade_name_amharic", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="column"
            style={{ marginTop: 18 }}
          >
            {upload_types.map((item, idx) => (
              <UploadElement upload_file_name={item} key={idx} idx={idx} />
            ))}
          </Grid>

          <Grid container width="100%" spacing={4} justifyContent="center" style={{ marginTop: 25 }}>
            <Grid
              item
              md={8}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {isLoading? <CircularProgress /> : <Button
                style={{
                  color: "white",
                  backgroundColor: "#1e447e",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10
                }}
                onClick={() => formSubmit(dispatch)}
              >
                Submit
              </Button>}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default DocumentAttach;
