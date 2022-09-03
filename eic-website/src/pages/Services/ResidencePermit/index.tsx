import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
  getFormData,
  getFormError,
} from "src/common/form";
import CloudIcon from "src/assets/cloud-icon.png";
import RightIcon from "src/assets/user-right.png";
import { useReducer, useEffect, useState, FC, ChangeEventHandler, useRef } from "react"
import { useSelector } from "react-redux"
import { Selectors as BufferSelectors } from "src/store/States/Buffer/"
import { Grid, FormControl, FormLabel, TextField, Button, CircularProgress } from "@mui/material";
import { API } from "src/store/States/Services/"
import { useNavigate } from "react-router"
import routes from "src/routes"
import { uploadFile } from "src/store/States/InvestmentPermit/actions"

const ResidencePermitForm = () => {
  const [formState, dispatch] = useReducer(formReducer, formInitState)
  const [isLoading, setIsLoading] = useState(false)
  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
  const inputs = ["company_name", "company_name_amharic", "amount_in_birr", "amount_in_dollar"]
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys(inputs, savedBuffer),
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const navigate = useNavigate()
  const handleSubmit = (data: any) => {
    setIsLoading(true)
    API.CapitalRegistrationUpdate({
      _id: savedBuffer._id,
      amount_in_birr: data.amount_in_birr,
      amount_in_dollar: data.amount_in_dollar
    }, (err, data) => {
      if (err) throw err
      if (data._id) {
        navigate(routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE, { replace: true })
      }
      setIsLoading(false)
    })
  }

  interface UploadElementProps {
    upload_file_name: string;
    idx: number;
  }

  const inputRef = useRef<any>()

  const uploadClick = (name: string) => {
    setCurrentFileTag(name);
    if (Object.keys(inputRef).length > 0) {
      inputRef.current.click();
    }
  };
  const [currentFileTag, setCurrentFileTag] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>(null)
  const onFileSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      if (e.target.files[0]) {
        setSelectedFile(e.target.files[0])
      }
    }
  }

  const UploadElement = () => (
    <>
      <input type="file" hidden onChange={onFileSelect} ref={inputRef} />
      <Grid item md={12} xs={12}>
        <div className="document-attach-h1">Request Residence Permit</div>
      </Grid>
      <Grid item md={12} xs={12}>
        {getFormError(formState, "visa_doc").error ? (
          <p style={{ color: "red" }}>
            {getFormError(formState, "visa_doc").helperText}
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
                    Boolean(selectedFile) ? RightIcon : CloudIcon
                  }
                  className="cloud-icon"
                  alt=""
                />
                <div className="document-attach-h2">Upload VISA</div>
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
                  onClick={() => uploadClick("memorandum_form")}
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

  const uploadForm = async () => {
    setIsLoading(true)
    const response = await uploadFile(selectedFile)
    if (response.length > 0) {
      API.UpdateNotirizedMinutes(savedBuffer._id, response, (err, data) => {
        setIsLoading(false)
        if (err) throw err
        if (data._id) {
          navigate(routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE, { replace: true })
        }
      })
    }
  }



  return (
    <div className="form-box">
      <div className="form-box-header">Request Residence Permit</div>
      <div className="form-box-content">
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                VISA Type
              </FormLabel>
              <TextField
                variant="outlined"
                {...register("visa_type", formState, dispatch)}
                // disabled
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
          sx={{ mt: 1 }}
        >
          <UploadElement />
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
            {isLoading ? <CircularProgress /> : <Button
              style={{
                color: "white",
                backgroundColor: Boolean(selectedFile) ? "#1e447e" : "gray",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10
              }}
              onClick={() => uploadForm()}
              disabled={!Boolean(selectedFile)}
            >
              Submit
            </Button>}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ResidencePermitForm