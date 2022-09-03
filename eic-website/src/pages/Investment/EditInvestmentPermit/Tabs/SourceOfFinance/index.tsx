import React, { useState, useReducer, useEffect, FC } from "react"
import {
  FormControl, FormLabel, Grid, TextField, RadioGroup,
  FormControlLabel, Radio, TextareaAutosize
} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles.css'
import './styles.css'
import { ProductModalElement, RawMaterialModalElement } from "./modals"
import {
  formInitState, formReducer, formSubmit, register, setFormDefaults, selectFormErrors,
  getFormError, FormActions, getFormData, selectRequriedKeys, registerForm
} from "src/common/form"
import { Selectors as BufferSelectors, Actions as BufferActions } from "src/store/States/Buffer"
import { useSelector, useDispatch } from "react-redux"

interface Props {
  nextPage: (data: any) => void
  pageClickCount: number
}

const SourceOfFinance: FC<Props> = (props) => {
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

  const inputs = [
    "equity",
    "loan",
    "number_of_employees",
    "market_destination_amount",
    "market_destination_type",
    "products",
    "raw_materials",
    "enviromental_impact"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)

  const handleSubmit = (data: any) => {
    props.nextPage(data)
  }

  useEffect(() => {
    formSubmit(dispatch)
  }, [props.pageClickCount])

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])

  useEffect(() => {
    if (productRows.length > 0) {
      FormActions.UpdateFormInput({ name: "products", value: productRows }, dispatch)
    }
  }, [productRows, dispatch])

  useEffect(() => {
    if (rawMaterialRows.length > 0) {
      FormActions.UpdateFormInput({ name: "raw_materials", value: rawMaterialRows }, dispatch)
    }
  }, [rawMaterialRows, dispatch])

  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
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


  const _dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(formState.formData).length > 0) {
      _dispatch(BufferActions.SetEditUserObject({
        _id: savedBuffer._id,
        ...formState.formData
      }))
    }
  }, [formState.formData])

  return (
    <>
      <div>
        <ProductModalElement isVisible={isProductModalVisible} onSubmit={addProductItem} />
        <RawMaterialModalElement isVisible={isRawMaterialModalVisible} onSubmit={addRawMaterialItem} />
        <div>
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
                <TextField className="default-input" variant="outlined" type="number" {...register("equity", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25, width: "100%" }}>
                <FormLabel id="demo-radio-buttons-group-label">Loan</FormLabel>
                <TextField className="default-input" variant="outlined" type="number" {...register("loan", formState, dispatch)} />
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
                <TextField className="long-input" variant="outlined" type="number" {...register("number_of_employees", formState, dispatch)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            style={{ marginTop: 40 }}
          >
            <Grid item md={12} xs={12}>
              {getFormError(formState, "market_destination_type").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "market_destination_type").helperText}</p>
              ) : <></>}
            </Grid>
            <Grid item md={12} xs={12}>
              <div className="investment-detail-title-default">Market Destination</div>
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
                      <FormControlLabel value={item} control={<Radio {...registerForm({
                        name: "market_destination_type", formState, dispatch, exactValue: item
                      })} />} className="radio-input" label={item} />
                      {getFormData(formState, 'market_destination_type') ? (
                        <>
                          <TextField
                            className="default-input radio-input"
                            variant="outlined"
                            type="number"
                            {...register("market_destination_amount", formState, dispatch, (getFormData(formState, 'market_destination_type') === item))}
                            disabled={getFormData(formState, 'market_destination_type') !== item}
                            value={getFormData(formState, 'market_destination_type') === item ? getFormData(formState, 'market_destination_amount') : ""}
                          />
                        </>
                      ) : (
                        <TextField className="default-input radio-input" variant="outlined" type="number" {...register("production_amount", formState, dispatch)} />
                      )}
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
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item md={9} xs={12}>
              {getFormError(formState, "products").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "products").helperText}</p>
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
                      <TableCell align="right">Local Market Share</TableCell>
                      <TableCell align="right">Export Market Share</TableCell>
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
            <Grid item md={9} xs={12}>
              {getFormError(formState, "enviromental_impact").error ? (
                <p style={{ color: "red" }}>{getFormError(formState, "enviromental_impact").helperText}</p>
              ) : <></>}
            </Grid>
          </Grid>
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
          >
            <Grid item md={9}>
              <TextareaAutosize className="default-text-area" {...register("enviromental_impact", formState, dispatch)} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default SourceOfFinance