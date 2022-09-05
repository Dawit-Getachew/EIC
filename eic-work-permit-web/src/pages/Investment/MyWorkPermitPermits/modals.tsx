/* eslint-disable */
import {
  Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button,
  IconButton,
  Tooltip,
} from "@mui/material"
import PrintIcon from "@mui/icons-material/Print";
import React, { useState, useReducer, useEffect, FC } from "react"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, getFormData
} from "src/common/form"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"
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
  return (
    <Modal
      open={props.isVisible}
      onClose={() => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
        >
          <Grid item md={6} xs={12}>
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
            {selectedBank === "" ? <></> : <div style={{ marginTop: 20 }}>
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
            </div>}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}