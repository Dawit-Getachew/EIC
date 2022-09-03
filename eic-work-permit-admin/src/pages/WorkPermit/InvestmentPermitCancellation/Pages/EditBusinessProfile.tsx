import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, MenuItem, Box, Container, CircularProgress } from "@mui/material/"
import { LegalStatusTypes, FormOfOwnerShipTypes, IBusinessProfileEdit, IBusinessProfileInput } from "src/models/InvestmentModels/business_profile"
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useForm } from "react-hook-form"
import routes from "src/constants/routes"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { API, Selectors as BusinessProfileSelectors } from "src/store/States/Investment/BusinessProfile/"

const EditBusinessProfile: React.FC<any> = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IBusinessProfileInput>();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const business_profile = useSelector(BusinessProfileSelectors.selectSelectedBusinessProfile)

  const onSubmit = (input: IBusinessProfileInput) => {
    setIsLoading(true)
    API.EditBusinessProfile({
      _id: business_profile._id,
      ...input
    }, (err, data) => {
      if (err) throw err
      setIsLoading(false)
      if (data._id) {
        navigate(routes.WORK_PERMIT.BUSINESS_PROFILE.ROUTE, { replace: true })
      }
    })
  }
  
  return (
    <>
      <Helmet>
        <title>Business Profile</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name="" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card style={{ padding: 20 }}>
                <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: 15, marginTop: 5 }}>
                  Business Address
                </Typography>
                <Grid container spacing={3} display="flex" alignItems="flex-start">
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Legal Status"
                      select
                      defaultValue={business_profile.legal_status}
                      {...register("legal_status", { required: "This is a required field" })}
                    >
                      {Object.values(LegalStatusTypes).map(item => (
                        <MenuItem key={item} value={item}>{String(item).replace("_", " ")}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Form of Ownership"
                      defaultValue={business_profile.form_of_ownership}
                      select
                      {...register("form_of_ownership", { required: "This is a required field" })}
                    >
                      {Object.values(FormOfOwnerShipTypes).map(item => (
                        <MenuItem key={item} value={item}>{String(item).replace("_", " ")}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Company of Incorporation"
                      select
                      style={{ width: 200 }}
                      defaultValue={business_profile.company_of_incorporation}
                      {...register("company_of_incorporation", { required: "This is a required field" })}
                    >
                      {["Ethiopia", "Eritria"].map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Company Name"
                      defaultValue={business_profile.company_name}
                      {...register("company_name", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Company Name (Amharic)"
                      defaultValue={business_profile.company_name_amharic}
                      {...register("company_name_amharic", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Tin Number"
                      defaultValue={business_profile.tin_number}
                      {...register("tin_number", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Registration Number"
                      defaultValue={business_profile.registration_number}
                      {...register("registration_number", { required: "This is a required field" })}
                    />
                  </Grid>
                </Grid>
                <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: 10, marginTop: 15 }}>
                  Business Address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Region"
                      defaultValue={business_profile.address.region}
                      {...register("address.region", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Zone"
                      defaultValue={business_profile.address.zone}
                      {...register("address.zone", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Wereda"
                      defaultValue={business_profile.address.city}
                      {...register("address.city", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Kebele"
                      defaultValue={business_profile.address.sub_city}
                      {...register("address.sub_city", { required: "This is a required field" })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="House Number"
                      defaultValue={business_profile.address.house_number}
                      {...register("address.house_number", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Email"
                      defaultValue={business_profile.address.email}
                      {...register("address.email", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Telephone (Direct)"
                      defaultValue={business_profile.address.telephone_direct}
                      {...register("address.telephone_direct", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      required
                      label="Telephone (Mobile)"
                      defaultValue={business_profile.address.telephone_direct}
                      {...register("address.telephone_mobile", { required: "This is a required field" })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15 }}>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="Fax"
                      defaultValue={business_profile.address.fax}
                      {...register("address.fax", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      required
                      label="P.O. Box"
                      defaultValue={business_profile.address.po_box}
                      {...register("address.po_box", { required: "This is a required field" })}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Other Address"
                      defaultValue={business_profile.address.other_address}
                      {...register("address.other_address")}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 15, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
                    <Button sx={{ margin: 1 }} variant="contained" color="primary" type="submit" disabled={isLoading}>
                      {isLoading? <CircularProgress /> : "Edit Business Profile"}
                    </Button>
                  </Grid>
                  <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
                    <Button sx={{ margin: 1 }} variant="contained" color="secondary" disabled={isLoading}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EditBusinessProfile