/* eslint-disable */
import React, { useState, useReducer, useEffect, FC } from "react"
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
import { ProductModalElement, RawMaterialModalElement, AnticipatedProductModalElement } from "./modals"
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

const SourceOfFinance: FC<Props> = (props) => {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [productRows, setProductRows] = useState([])

  const addProductItem = (data: any) => {
    if (Object.keys(data).length > 0) {
      setProductRows([
        ...productRows,
        data
      ])
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

  const [isAnticipatedProductModalVisible, setIsAnticipatedProductModalVisible] = useState(false)
  const [anticipatedRows, setAnticipatedRows] = useState([])

  const addAnticipatedProduct = (data: any) => {
    if (Object.keys(data).length > 0) {
      setAnticipatedRows(anticipatedRows.concat(data))
    }
    setIsAnticipatedProductModalVisible(false)
  }

  const inputs = [
    "current_products",
    "anticipated_products",
    "raw_materials",
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  const handleSubmit = (data: any) => {
    props.nextPage(data)
  }

  console.log('ss', formState)
  useEffect(() => {
    formSubmit(dispatch)
  }, [props.pageClickCount])

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

  useEffect(() => {
    if (productRows.length > 0) {
      FormActions.UpdateFormInput({ name: "current_products", value: productRows }, dispatch)
    }
  }, [productRows, dispatch])

  useEffect(() => {
    if (rawMaterialRows.length > 0) {
      FormActions.UpdateFormInput({ name: "raw_materials", value: rawMaterialRows }, dispatch)
    }
  }, [rawMaterialRows, dispatch])

  useEffect(() => {
    if (anticipatedRows.length > 0) {
      FormActions.UpdateFormInput({ name: "anticipated_products", value: anticipatedRows }, dispatch)
    }
  }, [anticipatedRows, dispatch])

  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer)
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(selectRequriedKeys(inputs, savedBuffer), dispatch)
    }
  }, [savedBuffer, dispatch])

  useEffect(() => {
    if (savedBuffer.products) {
      if (savedBuffer.products.length > 0) {
        setProductRows(savedBuffer.products)
      }
    }
  }, [savedBuffer.products, setProductRows])

  useEffect(() => {
    if (savedBuffer.raw_materials) {
      if (savedBuffer.raw_materials.length > 0) {
        setRawMaterialRows(savedBuffer.raw_materials)
      }
    }
  }, [savedBuffer.raw_materials, setRawMaterialRows])

  useEffect(() => {
    if (savedBuffer.anticipated_products) {
      if (savedBuffer.anticipated_products.length > 0) {
        setAnticipatedRows(savedBuffer.anticipated_products)
      }
    }
  }, [savedBuffer.anticipated_products, setAnticipatedRows])

  return (
    <>
      <div className="form-box">
        {isProductModalVisible && <ProductModalElement isVisible={isProductModalVisible} onSubmit={addProductItem} />}
        {isRawMaterialModalVisible && <RawMaterialModalElement isVisible={isRawMaterialModalVisible} onSubmit={addRawMaterialItem} />}
        {isAnticipatedProductModalVisible && <AnticipatedProductModalElement isVisible={isAnticipatedProductModalVisible} onSubmit={addAnticipatedProduct} />}
        <div className="form-box-header">
          Main Products/Services
        </div>
        <div className="form-box-content">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              <div className="investment-detail-title">
                The past 2 years of production services and sale program (average)
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div className="flex-both-center">
                <Button style={{ backgroundColor: '#E6EDF6' }} onClick={() => setIsProductModalVisible(true)}>
                  <div className="button-text">+ Add</div>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              {getFormError(formState, "current_products").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "current_products").helperText}</p>
              ) : <></>}
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
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={9} xs={12}>
              {getFormError(formState, "raw_materials").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "raw_materials").helperText}</p>
              ) : <></>}
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
            justifyContent="space-between"
            style={{ marginTop: 50 }}
          >
            <Grid item md={9} xs={12}>
              <div className="investment-detail-title-default">
                Anticipated (future) annual production/service and percentage increase and market share
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div className="flex-both-center">
                <Button style={{ backgroundColor: '#E6EDF6' }} onClick={() => setIsAnticipatedProductModalVisible(true)}>
                  <div className="button-text">+ Add</div>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              {getFormError(formState, "anticipated_products").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "anticipated_products").helperText}</p>
              ) : <></>}
            </Grid>
          </Grid>
          <Grid item md={12}>
            <div className="main-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Type of Product</TableCell>
                      <TableCell align="right">Sourced From Local (Percent)</TableCell>
                      <TableCell align="right">Imported Percent</TableCell>
                      <TableCell align="right">Percentage Increased Unit</TableCell>
                      <TableCell align="right">Percentage Increased Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {anticipatedRows.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{idx + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.local_share_market}</TableCell>
                        <TableCell align="right">{row.export_share_market}</TableCell>
                        <TableCell align="right">{row.percentage_capacity_increased}</TableCell>
                        <TableCell align="right">{row.percentage_unit_increased}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>

        </div>
      </div>
    </>
  )
}

export default SourceOfFinance