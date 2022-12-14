import { useReducer, useEffect, FC } from "react";
import { Grid, TextField, FormControl, FormLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../styles.css";
import {
  formInitState,
  formReducer,
  formSubmit,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
} from "src/common/form";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { useSelector } from "react-redux";
import PhoneInput from "src/components/DropWithInput/DropWithInput";

interface Props {
  nextPage: (data: any) => void;
  pageClickCount: number;
}

const BasicInformation: FC<Props> = (props) => {
  const inputs = [
    "company_name",
    "region",
    "zone",
    "wereda",
    "city",
    "sub_city",
    "telephone_direct",
  ];

  const optional_inputs = [
    "company_name_amharic",
    "region_amharic",
    "city_amharic",
    "other_address",
    "other_address_amharic",
    "house_number",
    "po_box",
    "fax",
    "email",
  ];

  const [formState, dispatch] = useReducer(formReducer, formInitState);

  const handleSubmit = (data: any) => {
    props.nextPage(data);
  };

  useEffect(() => {
    formSubmit(dispatch);
  }, [props.pageClickCount]);

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  useEffect(() => {
    if (savedBuffer && savedBuffer.address) {
      if (Object.keys(savedBuffer).length > 0) {
        FormActions.UpdateFormData(
          selectRequriedKeys([...inputs, ...optional_inputs], {
            ...savedBuffer,
            ...savedBuffer.address,
          }),
          dispatch
        );
      }
    }
  }, [savedBuffer, dispatch]);

  return (
    <div>
      <div className="form-box-content">
        <Grid container width="100%" spacing={4}>
          <Grid item md={6} xs={12}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Basic Information</div>
          </Grid>
        </Grid>
        <>
          <Grid container width="100%" spacing={4}>
            <Grid item md={12} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Company / Investor Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("company_name", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4} style={{ marginTop: 20 }}>
            <Grid item md={6} xs={12}>
              <Typography variant="h4">Address</Typography>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Region
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("region", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Zone</FormLabel>
                <TextField
                  variant="outlined"
                  {...register("zone", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  City
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("city", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Woreda / Kebele
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("wereda", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Sub-City / ????????? ?????????
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("sub_city", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  House No. / ????????? ???.
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("trade_name_amharic", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Tel. No
                </FormLabel>
                <PhoneInput
                  registerPhone={() => register("telephone_direct", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  P.O. Box
                </FormLabel>
                <TextField
                  variant="outlined"
                  {...register("po_box", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container width="100%" spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Fax</FormLabel>
                <TextField
                  variant="outlined"
                  {...register("fax", formState, dispatch)}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className="flex-c" style={{ marginTop: 25 }}>
                <FormLabel id="demo-radio-buttons-group-label">Email</FormLabel>
                <TextField
                  variant="outlined"
                  {...register("email", formState, dispatch)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </>
      </div>
    </div>
  );
};

export default BasicInformation;
