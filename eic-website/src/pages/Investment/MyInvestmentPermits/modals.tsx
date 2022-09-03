import {
  Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button,
  Alert, Tooltip, CircularProgress
} from "@mui/material"
import PrintIcon from "@mui/icons-material/Print";
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, getFormData
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"
import { API as InvestmentPermitAPI, Actions as InvestmentPermitActions } from "src/store/States/InvestmentPermit"
import DownloadIcon from '@mui/icons-material/Download';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PermitDocument } from "./PrintPermit";
import countries from "src/common/countries"

interface ModalProps {
  onSubmit: (data: any) => void;
  isVisible: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalElement: React.FC<ModalProps> = (props) => {
  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
  const inputs = [
    "bank_name"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  const handleSubmit = (data: any) => {
    props.onSubmit(data)
  }

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

  const [selectedBank, setSelectedBank] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState("")
  const _dispatch = useDispatch()
  const updateSelectedBank = () => {
    if (selectedBank.length > 0) {
      setErrorText("")
      setIsLoading(true)
      InvestmentPermitAPI.UpdateSelectedBank({
        _id: savedBuffer._id,
        selected_bank: selectedBank
      }, (err, data) => {
        if (err) throw err
        if (data._id) {
          _dispatch(InvestmentPermitActions.updateInvestmentPermits(data))
          props.onSubmit({})
        }
      })
    } else {
      setErrorText("Please select your preferred bank")
    }
  }

  return (
    <Modal
      open={props.isVisible}
      onClose={isLoading? () => {} : () => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item md={6}>
          {errorText.length > 0 ? <Alert severity="error">{errorText}</Alert> : null}
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Select Bank
            </Typography>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Bank Name</FormLabel>
              <TextField variant="outlined" onChange={(event: any) => setSelectedBank(event.target.value)} select>
                <MenuItem value="CBE">CBE</MenuItem>
                <MenuItem value="Awash">Awash</MenuItem>
                <MenuItem value="Abysinia">Abysinia</MenuItem>
                <MenuItem value="Ababy">Ababy</MenuItem>
                <MenuItem value="Nib">Nib</MenuItem>
              </TextField>
            </FormControl>
            <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
              <Button onClick={updateSelectedBank} disabled={isLoading} color="success" variant="contained">
                {isLoading? <CircularProgress /> : "Submit Preferred Bank"}
              </Button>
            </div>
            {/* {selectedBank === "" ? <></> : <div style={{ marginTop: 20 }}>
              <PDFDownloadLink
                document={<PermitDocument data={savedBuffer} />}
                fileName="bank_support_letter.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading..."
                  ) : (
                    <Tooltip title="Downloading Bank Support Letter" arrow>
                      <>
                        <IconButton color="primary" size="large">
                          <PrintIcon />
                        </IconButton>
                        Download Bank Letter
                      </>
                    </Tooltip>
                  )
                }
              </PDFDownloadLink>
            </div>} */}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}