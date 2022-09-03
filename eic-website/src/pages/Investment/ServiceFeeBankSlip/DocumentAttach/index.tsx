import { useState, useReducer, useEffect, FC } from "react";
import { Grid, Button, Typography, CircularProgress } from "@mui/material";
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { API as InvestmentAPI } from "src/store/States/InvestmentPermit/"
import { uploadFile } from "src/store/States/InvestmentPermit/actions"
import routes from "src/routes"
import { useNavigate } from "react-router"

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const DocumentAttach: FC<Props> = (props) => {
  const upload_types = ["Upload Your Bank Slip"];

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  const inputs = ["bank_slip_form"];

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
        {getFormError(formState, "bank_slip_form").error ? (
          <p style={{ color: "red" }}>
            {getFormError(formState, "bank_slip_form").helperText}
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
                    getFormData(formState, "bank_slip_form") ? RightIcon : CloudIcon
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
                  onClick={() => uploadClick("bank_slip_form")}
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
    const response = await uploadFile(data.bank_slip_form)
    if (String(response).length > 10) {
      InvestmentAPI.UpdateServiceFeeBankSlip({
        _id: savedBuffer._id,
        service_fee_bank_slip_form: response
      }, (err, data) => {
        if (err) throw err
        if (data._id) {
          setIsLoading(false)
          navigate(routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE, { replace: true })
        }
      })
    }
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

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
        <div className="form-box-header">Upload your Service Fee Bank Slip</div>
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
                Please upload the bank slip for the payment of the service fee
              </Typography>
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
            {upload_types.map((item, idx) => (
              <UploadElement upload_file_name={item} key={idx} idx={idx} />
            ))}
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
              {isLoading ? <CircularProgress /> : (
                <Button
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
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default DocumentAttach;
