import React, { useState, useReducer, useEffect, FC } from "react"
import { Grid, Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import '../styles.css'
import './styles.css'
import CloudIcon from "src/assets/cloud-icon.png"
import RightIcon from "src/assets/user-right.png"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, getFormData, selectRequriedKeys, registerForm
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const DocumentAttach: FC<Props> = (props) => {
  const upload_types = [
    'Power of attorney',
    'Investment Visa for Foreigners',
    'Notarized Minutes of Resolution',
    'Passport',
    'Project Proposal',
    'Certificate of Incorporation',
    'Memorandum and Articles of Association',
    'Business Background'
  ]

  interface UploadElementProps {
    upload_file_name: string
    idx: number
  }

  const inputs = [
    'power_of_attorney',
    'investment_visa_for_foreigners',
    'notarized_minutes_of_resolution',
    'passport',
    'project_proposal',
    'certificate_of_incorporation',
    'memorandum_and_articles_of_association',
    'business_background',
    'heard_from'
  ]

  let inputRef!: any;

  const uploadClick = (name: string) => {
    setCurrentFileTag(name)
    if (Object.keys(inputRef).length > 0) {
      inputRef.click() 
    }
  }
  const [currentFileTag, setCurrentFileTag] = useState("")
  const onChangeFile = (value: any) => {
    if (value) {
      FormActions.UpdateFormInput({ name: currentFileTag, value }, dispatch)
    }
  }

  const UploadElement: FC<UploadElementProps> = ({ upload_file_name, idx }) => (
    <>
      <Grid item md={12} xs={12}>
        <div className="document-attach-h1">{upload_file_name}</div>
      </Grid>
      <Grid item md={12} xs={12}>
        {getFormError(formState, inputs[idx]).error ? (
          <p style={{ color: "red" }}>{getFormError(formState, inputs[idx]).helperText}</p>
        ) : <></>}
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
                <img src={getFormData(formState, inputs[idx]) ? RightIcon : CloudIcon } className="cloud-icon" />
                <div className="document-attach-h2">
                  {upload_file_name}
                </div>
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
                    fontSize: 10
                  }}
                  onClick={() => uploadClick(inputs[idx])}
                >Select File</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  )

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  const handleSubmit = (data: any) => {
    props.nextPage({
      ...savedBuffer,
      ...data
    })
  }

  useEffect(() => {
    formSubmit(dispatch)
  }, [props.pageClickCount])

  const submitFunction = () => {
    formSubmit(dispatch)
  }

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

  
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(selectRequriedKeys(inputs, savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  return (
    <>
      <div className="form-box">
        <div className="form-box-header">
          Document Attach
        </div>
        <input type="file" hidden={true} ref={refInput => inputRef = refInput} onChange={(e: any) => {
          onChangeFile(e.target.files[0])
        }} />
        <div className="form-box-content">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="center"
          >
            <Grid item md={8} xs={12}>
              <div className="document-attach-title" style={{ marginBottom: 25 }}>Please submit the following documents</div>
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
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={12} xs={12}>
              <div className="document-attach-h1" style={{ marginBottom: 10, marginTop: 20 }}>
                Please indicate where you recevied information about investing in Ethiopia?
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={12} xs={12}>
              {getFormError(formState, 'heard_from').error ? (
                <p style={{ color: "red" }}>{getFormError(formState, 'heard_from').helperText}</p>
              ) : <></>}
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-r" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  {[
                    "Website", "Friend, Family", "Network",
                    "Other Government Institution", "Other"
                  ].map(item => (
                    <FormControlLabel value={item} control={<Radio {...registerForm({
                      name: "heard_from", formState, dispatch, exactValue: item
                    })} />} className="radio-input" label={item} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default DocumentAttach