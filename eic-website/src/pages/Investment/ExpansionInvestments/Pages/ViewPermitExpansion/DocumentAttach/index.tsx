import React, { useState, useReducer, useEffect, FC } from "react"
import { Grid, Button, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, TextareaAutosize } from "@mui/material"
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
    'Copy of Business License',
    'Summary of Financial Statement',
    'Feasibility Study',
    'List of Capital Goods Basic Raw Materials',
    'Land lice agreement'
  ]

  interface UploadElementProps {
    upload_file_name: string
    idx: number
  }

  const inputs = [
    'copy_of_business_license',
    'financial_statement',
    'feasibility_study',
    'list_of_capital_good_and_raw_materials',
    'land_lice_agreement',
    'factors_influencing_plan',
    'how_to_avoid_problems',
    'support_needed_from_eic',
    'other_documents',
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

  const [formState, dispatch] = useReducer(formReducer, formInitState)
  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)

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
            <Grid item md={4}>
              <div className="flex-r flex-both-center">
                <img src={getFormData(formState, inputs[idx]) ? RightIcon : CloudIcon} className="cloud-icon" />
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
              <a href={(() => {
                const values = Object.values(selectRequriedKeys(inputs, savedBuffer.expansion_documents))
                return values[idx]? values[idx] as unknown as string : "#"
              })()} style={{ textDecoration: "none" }} target="_blank">
                <div className="flex-both-center">
                  <Button
                    style={{
                      border: "solid #0F91D2 2px",
                      borderRadius: 5,
                      backgroundColor: "#FBFDFE",
                      color: "#0F91D2",
                      fontSize: 10
                    }}
                  >Download File</Button>
                </div>
              </a>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  )

  

  interface ModalProps {
    onSubmit: (data: any) => void;
    isVisible: boolean;
  }

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
      FormActions.UpdateFormData({
        ...selectRequriedKeys(inputs, savedBuffer),
        ...selectRequriedKeys(inputs, savedBuffer.expansion_documents),
      }, dispatch)
    }
  }, [savedBuffer, dispatch])

  console.log('dd', formState)

  return (
    <>
      <div className="form-box">
        <div className="form-box-header">
          Document Attach
        </div>
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
            justifyContent="center"
          >
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">Major factors influcing the project implementation plan and
                  <br />product marketing of the existing project</FormLabel>
                {getFormError(formState, "factors_influencing_plan").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "factors_influencing_plan").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("factors_influencing_plan", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">
                  What do you intend to do in order to avoid previous problems for the fast
                  <br />and accurate implementation of expansion project
                </FormLabel>
                {getFormError(formState, "how_to_avoid_problems").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "how_to_avoid_problems").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("how_to_avoid_problems", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">
                  What is the basic support that has to be provided by EIC
                </FormLabel>
                {getFormError(formState, "support_needed_from_eic").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "support_needed_from_eic").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("support_needed_from_eic", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel className="invest-title">
                  Please specify if you have other comments
                </FormLabel>
                {getFormError(formState, "other_documents").error ? (
                  <p style={{ color: "red" }}>{getFormError(formState, "other_documents").helperText}</p>
                ) : <></>}
                <TextareaAutosize className="default-text-area" {...register("other_documents", formState, dispatch)} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default DocumentAttach