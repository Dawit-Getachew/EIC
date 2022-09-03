import React, { useState } from "react"
import {
  FormControl, FormLabel, Grid, TextField, RadioGroup,
  FormControlLabel, Radio, Button, MenuItem, Box, TextareaAutosize
} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../styles.css'
import './styles.css'
import closestIndexTo from "date-fns/esm/closestIndexTo/index";
import { ProductModalElement, RawMaterialModalElement } from "./modals"

export default () => {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [productRows, setProductRows] = useState([])

  const addProductItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setProductRows(productRows.concat(data))
    }
    setIsProductModalVisible(false)
  }

  const [isRawMaterialModalVisible, setIsRawMaterialModalVisible] = useState(false)
  const [rawMaterialRows, setRawMaterialRows] = useState([])

  const addRawMaterialItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setRawMaterialRows(rawMaterialRows.concat(data))
    }
    setIsRawMaterialModalVisible(false)
  }

  return (
    <>
      <div className="form-box">
        <ProductModalElement isVisible={isProductModalVisible} onSubmit={addProductItem} />
        <RawMaterialModalElement isVisible={isRawMaterialModalVisible} onSubmit={addRawMaterialItem} />
        <div className="form-box-header">
          Investment Detail (Cont.)
        </div>
        <div className="form-box-content">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={12} xs={12}>
              <div className="investment-detail-title">Source of Finance</div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Equity</FormLabel>
                <TextField className="default-input" variant="outlined" type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Loan</FormLabel>
                <TextField className="default-input" variant="outlined" type="number" />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Estimated of permanent employees at full capacity</FormLabel>
                <TextField className="long-input" variant="outlined" type="number" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={12} xs={12}>
              <div className="investment-detail-title-default" style={{ marginTop: 20 }}>Market Destination</div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={12} xs={12}>
              <FormControl className="flex-r" style={{ marginTop: 25, width: "100%", display: "flex", flexDirection: "row" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  {["Export", "Local"].map(item => (
                    <div className="flex-r" style={{ marginBottom: 10 }}>
                      <FormControlLabel value={item} control={<Radio />} className="radio-input" label={item} />
                      <TextField className="default-input radio-input" variant="outlined" type="number" />
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              <div className="investment-detail-title-default" style={{ marginTop: 20 }}>Estimated annual production/service rendering of the project at full capacity</div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div className="flex-both-center">
                <Button style={{ backgroundColor: '#E6EDF6' }} onClick={() => setIsProductModalVisible(true)}>
                  <div className="button-text">+ Add</div>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <div className="main-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Local Share Market</TableCell>
                      <TableCell align="right">Export Share Market</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productRows.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{idx + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.local_share_market}</TableCell>
                        <TableCell align="right">{row.export_share_market}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
            style={{ marginTop: 50 }}
          >
            <Grid item md={9} xs={12}>
              <div className="investment-detail-title-default">
                Raw material requirements at full capacity (applicable to manufacturing and agricultural projects only)
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div className="flex-both-center">
                <Button style={{ backgroundColor: '#E6EDF6' }} onClick={() => setIsRawMaterialModalVisible(true)}>
                  <div className="button-text">+ Add</div>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <div className="main-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Type of Raw Materials</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Sourced From Local (Percent)</TableCell>
                      <TableCell align="right">Imported Percent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rawMaterialRows.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{idx + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.local_source}</TableCell>
                        <TableCell align="right">{row.import_source}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            style={{ marginTop: 50 }}
          >
            <Grid item md={9}>
              <div className="investment-detail-title">
                Breief description about the potential impact of the proposed investment on environment and measures of mitigation to be undertaken
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={9}>
              <TextareaAutosize className="default-text-area" />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}