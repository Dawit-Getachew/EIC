import { Modal, Box, Typography, Grid, FormControl, FormLabel, TextField, MenuItem, Button } from "@mui/material"
import React, { useState } from "react"

interface ModalProps {
  onSubmit: (data: any) => void;
  isVisible: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ProductModalElement: React.FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({})

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Modal
      open={props.isVisible}
      onClose={() => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Product
        </Typography>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Type of Product</FormLabel>
              <TextField className="default-input" variant="outlined" name="name" onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-both-center" style={{ marginTop: 25 }}>
              <div className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Unit</FormLabel>
                <TextField className="short-input" variant="outlined" name="unit" onChange={handleChange} select>
                  <MenuItem value="m2">m2</MenuItem>
                  <MenuItem value="m3">m3</MenuItem>
                </TextField>
              </div>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Quantity</FormLabel>
              <TextField className="default-input" variant="outlined" name="quantity" type="number" onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Local Share Market</FormLabel>
              <TextField className="default-input" variant="outlined" name="local_share_market" type="number" onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Export Share Market</FormLabel>
              <TextField className="default-input" variant="outlined" name="export_share_market" type="number" onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} xs={12} justifyContent="center">
            <div className="flex-both-center">
              <Button onClick={() => props.onSubmit(formData)} style={{
                color: 'white',
                backgroundColor: '#1e447e',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export const RawMaterialModalElement: React.FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({})

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Modal
      open={props.isVisible}
      onClose={() => props.onSubmit({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Raw Material
        </Typography>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Type of Raw Material</FormLabel>
              <TextField className="default-input" variant="outlined" name="name" onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-both-center" style={{ marginTop: 25 }}>
              <div className="flex-c">
                <FormLabel id="demo-radio-buttons-group-label">Unit</FormLabel>
                <TextField className="short-input" variant="outlined" name="unit" onChange={handleChange} select>
                  <MenuItem value="m2">m2</MenuItem>
                  <MenuItem value="m3">m3</MenuItem>
                </TextField>
              </div>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">Quantity</FormLabel>
              <TextField className="default-input" variant="outlined" name="quantity" type="number" onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">SOURCED FROM LOCAL (PERCENT)</FormLabel>
              <TextField className="default-input" variant="outlined" name="local_source" type="number" onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">IMPORTED (PERCENT)</FormLabel>
              <TextField className="default-input" variant="outlined" name="import_source" type="number" onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} xs={12} justifyContent="center">
            <div className="flex-both-center">
              <Button onClick={() => props.onSubmit(formData)} style={{
                color: 'white',
                backgroundColor: '#1e447e',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}