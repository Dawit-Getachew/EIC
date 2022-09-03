import React, { useEffect, useReducer, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Grid, Container, Stepper, Step, StepLabel } from "@mui/material/";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Actions as BufferActions,
  Selectors as BufferSelectors,
} from "src/store/States/Buffer";
import { useDispatch, useSelector } from "react-redux";
import CompanyNameEdit from "./EditTinRegNumber";
import {
  formInitState,
  formReducer,
  register,
  setFormDefaults,
  FormActions,
  selectRequriedKeys,
  formSubmit
} from "src/common/form";
import { API as InvestmentPermitAPI } from "src/store/States/Investment/InvestmentPermit"
import { InvestmentPermitStatus } from "src/common/enums"
import { useNavigate } from "react-router";
import routes from "src/constants/routes";

const EditCompanyName: React.FC<any> = () => {
  const selectedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  const inputs = [
    "edited_name",
    "edited_name_amharic",
    "edited_trade_name",
    "edited_trade_name_amharic",
    "company_registration_form",
    "registration_number",
    "tin_number"
  ];

  const [formState, dispatch] = useReducer(formReducer, formInitState);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const handleSubmit = (data: any) => {
    setIsLoading(true)
    // InvestmentPermitAPI.UpdateCompanyNameInvestmentPermitBody({
    //   _id: savedBuffer._id,
    //   edited_name: data.edited_name,
    //   edited_name_amharic: data.edited_name_amharic,
    //   edited_trade_name: data.edited_trade_name,
    //   edited_trade_name_amharic: data.edited_trade_name_amharic,
    //   permit_status: InvestmentPermitStatus.REGISTERED_COMPANY_NAME,
    //   registration_number: data.registration_number,
    //   tin_number: data.tin_number,
    // }, (err, data) => {
    //   if (err) throw err
    //   if (data._id) {
    //     setIsLoading(false)
    //     navigate(routes.INVESTMENT.INVESTMENT_PERMIT.ROUTE, { replace: true })
    //   }
    // })
  }

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch);
  }, [dispatch]);

  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  useEffect(() => {
    if (Object.keys(savedBuffer).length > 0) {
      FormActions.UpdateFormData(
        selectRequriedKeys(inputs, savedBuffer),
        dispatch
      );
    }
  }, [savedBuffer, dispatch]);

  const _register = (name: string) => register(
    name,
    formState,
    dispatch,
    true
  )

  return (
    <>
      <Helmet>
        <title>Edited Company Name</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader name={selectedBuffer.company_name} handleSubmit={() => formSubmit(dispatch)} isLoading={isLoading} />
      </PageTitleWrapper>
      <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <form>
              <Card sx={{ p: 4 }}>
                <CompanyNameEdit
                  register={_register}
                />
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditCompanyName;
