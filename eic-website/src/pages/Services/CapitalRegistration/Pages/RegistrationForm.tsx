import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
} from "src/common/form";
import { useReducer, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Selectors as BufferSelectors } from "src/store/States/Buffer/"
import { Grid, FormControl, FormLabel, TextField, Button, CircularProgress } from "@mui/material";
import { API } from "src/store/States/Services/"
import { useNavigate } from "react-router"
import routes from "src/routes"

const RegistrationForm = () => {
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

  return (
    <div className="form-box">
      <div className="form-box-header">Capital Registration Form</div>
      <div className="form-box-content">
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Name of the Company
              </FormLabel>
              <TextField
                variant="outlined"
                {...register("company_name", formState, dispatch)}
                disabled
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                የድርጅቱ ስም
              </FormLabel>
              <TextField
                variant="outlined"
                {...register("company_name_amharic", formState, dispatch)}
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Amount in Birr
              </FormLabel>
              <TextField
                variant="outlined"
                type="number"
                {...register("amount_in_birr", formState, dispatch)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl className="flex-c" style={{ marginTop: 25 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Amount in USD
              </FormLabel>
              <TextField
                variant="outlined"
                type="number"
                {...register("amount_in_dollar", formState, dispatch)}
              />
            </FormControl>
          </Grid>
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
              {isLoading? <CircularProgress /> : <Button
                style={{
                  color: "white",
                  backgroundColor: "#1e447e",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10
                }}
                onClick={() => formSubmit(dispatch)}
              >
                Submit
              </Button>}
            </Grid>
          </Grid>
      </div>
    </div>
  )
}

export default RegistrationForm