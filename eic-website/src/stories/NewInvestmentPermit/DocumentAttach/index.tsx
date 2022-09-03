import React, { FC } from "react"
import { Grid, Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import '../styles.css'
import './styles.css'
import CloudIcon from "../../assets/cloud-icon.png"

export default () => {
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
  }

  const UploadElement: FC<UploadElementProps> = ({ upload_file_name }) => (
    <>
      <Grid item md={12} xs={12}>
        <div className="document-attach-h1">{upload_file_name}</div>
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
                <img src={CloudIcon} className="cloud-icon" />
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
                  onClick={uploadClick}
                >Select File</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  )

  let inputRef!: any;

  const uploadClick = () => {
    if (Object.keys(inputRef).length > 0) {
      inputRef.click() 
    }
  }

  return (
    <>
      <div className="form-box">
        <div className="form-box-header">
          Document Attach
        </div>
        <input type="file" hidden={true} ref={refInput => inputRef = refInput} />
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
            {upload_types.map(item => (
              <UploadElement upload_file_name={item} key={item} />
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
            <Grid item md={6} xs={12}>
              <FormControl className="flex-r" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  {[
                    "Website", "Word of mouth", "Friend, Family", "Network",
                    "Other Government Institution", "Other"
                  ].map(item => (
                    <FormControlLabel value={item} control={<Radio />} className="radio-input" label={item} />
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