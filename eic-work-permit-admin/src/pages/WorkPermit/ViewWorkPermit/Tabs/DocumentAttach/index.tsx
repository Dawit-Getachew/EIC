/* eslint-disable */
import React, { useState, useReducer, useEffect, FC } from "react";
import { Grid, Button } from "@mui/material";
import "../styles.css";
import "./styles.css";
import CloudIcon from "src/assets/cloud-icon.png";
import RightIcon from "src/assets/user-right.png";
import {
  formInitState,
  formReducer,
  formSubmit,
  setFormDefaults,
  getFormError,
  FormActions,
  getFormData,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const DocumentAttach: FC<Props> = (props) => {
  const upload_types = ["Photo", "Passport", "Investment Permit"];

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  const inputs = ["picture", "passport", "investment_permit"];

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
            <Grid item md={6}>
              <div className="flex-c flex-both-center">
                <div className="document-attach-text">
                  Click download to view in another Tab
                </div>
                <div className="document-attach-text2">
                  JPG, PNG or PDF, file size no more than 10MB
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <a target="_blank" href={getFormData(formState, inputs[idx]) ? getFormData(formState, inputs[idx]) as string : "#"}>
                <Button
                  fullWidth
                  variant="outlined"
                >
                  Download File
                </Button>
              </a>
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

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
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
    if (savedBuffer) {
      if (savedBuffer.permit_documents) {
        if (Object.keys(savedBuffer.permit_documents).length > 0) {
          FormActions.UpdateFormData(
            selectRequriedKeys(inputs, savedBuffer.permit_documents),
            dispatch
          );
        }
      }
    }
  }, [savedBuffer, dispatch]);

  console.log("ssf", formState)

  return (
    <>
      <div>
        <div className="form-box-content">
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Attached Documents</div>
            </Grid>
          </Grid>
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
        </div>
      </div>
    </>
  );
};

export default DocumentAttach;