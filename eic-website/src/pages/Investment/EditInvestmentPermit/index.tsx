import React, { useState, useEffect, MutableRefObject } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {
  Grid,
  Container,
  Stepper, Step, StepLabel
} from "@mui/material/";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Actions as BufferActions, Selectors as BufferSelectors } from "src/store/States/Buffer"
import { API as InvestmentPermitAPI } from "src/store/States/InvestmentPermit/"
import { useDispatch, useSelector } from "react-redux"
import BasicInformation from "./Tabs/BasicInformation"
import Address from "./Tabs/Address"
import InvestmentDetail from "./Tabs/InvestmentDetail"
import SourceOfFinance from "./Tabs/SourceOfFinance"
import DocumentAttach from "./Tabs/DocumentAttach"
import { useNavigate } from "react-router-dom"
import routes from "src/routes"

const EditInvestmentPermit: React.FC<any> = () => {
  const dispatch = useDispatch()
  const selectedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer)
  const steps = [
    'Basic Information',
    'Address',
    'Investment Detail',
    'Investment Detail (Cont.)',
    'Document Attach'
  ];

  const [activeStep, setActiveStep] = useState(0)
  const [pageClickCount, setPageClickCount] = useState(0)

  const nextPage = (data: any) => {
    setActiveStep(Math.min(4, activeStep + 1))
  }

  const prevPage = (data: any) => {
    setActiveStep(Math.max(0, activeStep - 1))
  }

  const viewBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
  const editBuffer = useSelector(BufferSelectors.selectEditUserObject)
  const navigate = useNavigate()
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const editPermit = (data: any) => {
    setIsUpdateLoading(true)
    InvestmentPermitAPI.UpdateInvestmentPermit(
      {
        _id: data._id,
        company_name: data.company_name,
        company_name_amharic: data.company_name_amharic,
        trade_name: data.trade_name,
        trade_name_amharic: data.trade_name_amharic,
        investor_nationality: data.investor_nationality,
        type_of_business: data.type_of_business,
        type_of_ownership: data.type_of_ownership,
        shareholders: data.shareholders.map(item => ({
          name: item.name,
          nationality: item.nationality,
          country_of_incorporation: item.country_of_incorporation,
          address: item.address
        })),
        manager_full_name: data.manager_full_name,
        manager_full_name_amharic: data.manager_full_name_amharic,
        company_address: {
          city: data.business_city,
          city_amharic: data.business_city_amharic,
          sub_city: data.business_sub_city,
          sub_city_amharic: data.business_sub_city_amharic,
          region: data.business_region,
          region_amharic: data.business_region_amharic,
          zone: data.business_zone,
          zone_amharic: data.business_zone_amharic,
          wereda: data.business_wereda,
          wereda_amharic: data.business_wereda_amharic,
          house_number: data.business_house_number,
          email: data.business_email,
          telephone_direct: data.business_telephone,
          telephone_mobile: data.business_telephone,
          fax: data.business_fax,
          po_box: data.business_po_box,
          other_address: "",
        },
        representative_address: {
          region: "",
          region_amharic: "",
          zone: "",
          zone_amharic: "",
          city: "",
          city_amharic: "",
          sub_city: "",
          sub_city_amharic: "",
          wereda: "",
          wereda_amharic: "",
          house_number: "",
          email: data.representative_email,
          telephone_direct: data.representative_tel_1,
          telephone_mobile: data.representative_tel_2,
          fax: "",
          po_box: "",
          other_address: "",
        },
        sector: data.sector,
        investment_activity: data.investment_activity,
        investment_activity_amharic: data.investment_activity_amharic,
        project_description: data.project_description,
        investment_address: {
          city: data.investment_city,
          city_amharic: data.investment_city_amharic,
          sub_city: data.investment_sub_city,
          sub_city_amharic: data.investment_sub_city_amharic,
          region: data.investment_region,
          region_amharic: data.investment_region_amharic,
          zone: data.investment_zone,
          zone_amharic: data.investment_zone_amharic,
          wereda: data.investment_wereda,
          wereda_amharic: data.investment_wereda_amharic,
          house_number: data.investment_house_number,
          email: data.investment_email,
          telephone_direct: data.investment_telephone,
          telephone_mobile: data.investment_telephone,
          fax: data.investment_fax,
          po_box: data.investment_po_box,
          other_address: "",
        },
        land_size_sqm: Number(data.land_size_sqm),
        land_acquisition_type: String(data.land_acquisition_type),
        investment_capital_usd: Number(data.investment_capital_usd),
        investment_capital_birr: Number(data.investment_capital_birr),
        enviromental_impact: data.enviromental_impact,
        equity: Number(data.equity),
        loan: Number(data.loan),
        heard_from: data.heard_from,
        market_destination_local_amount: Number(data.market_destination_amount % 100),
        market_destination_export_amount: Number(100 - (data.market_destination_amount % 100)),
        number_of_employees: Number(data.number_of_employees),
        home_address: {
          region: "",
          region_amharic: "",
          zone: "",
          zone_amharic: "",
          city: "",
          city_amharic: "",
          sub_city: "",
          sub_city_amharic: "",
          wereda: "",
          wereda_amharic: "",
          house_number: "",
          email: data.home_email,
          telephone_direct: data.home_telephone,
          telephone_mobile: "",
          fax: "",
          po_box: data.home_po_box,
          other_address: "",
          country: String(data.home_country_address)
        },
        employee_information: {
          permanent_female_amount: Number(data.permanent_female_amount),
          permanent_male_amount: Number(data.permanent_male_amount),
          temporary_female_amount: Number(data.temporary_female_amount),
          temporary_male_amount: Number(data.temporary_male_amount),
        },
        representative_full_name: data.representative_name,
        investor_id: data.investor_id,
        permit_documents: {} as any,
        products: data.products.map(item => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_share_market: Number(item.local_share_market),
          export_share_market: Number(item.export_share_market),
          unit: String(item.unit),
        })),
        raw_materials: data.raw_materials.map(item => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_source: Number(item.local_source),
          import_source: Number(item.import_source),
          unit: String(item.unit),
        }))
      }, (err, data) => {
        if (err) throw err
        if (data._id) {
          setIsUpdateLoading(true)
          navigate(routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE, { replace: true })
        }
        console.log("lolz", data)
      })
  }

  const [editCount, setEditCount] = useState(0)
  const [beforeCount, setBeforeCount] = useState(0)
  const updateCount = () => setEditCount(editCount + 1)
  useEffect(() => {
    if (beforeCount !== editCount) {
      editPermit({ ...viewBuffer, ...editBuffer })
      setBeforeCount(editCount)
    }
  }, [editCount])


  return (
    <>
      <Helmet>
        <title>Investment Permit</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader isUpdateLoading={isUpdateLoading} name={selectedBuffer.company_name} data={selectedBuffer} updateCount={updateCount} />
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
            <form>
              <Card sx={{ p: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel className="stepper-container" style={{ background: 'white' }}>
                  {steps.map((label, idx) => (
                    <Step key={label} onClick={() => setActiveStep(idx)}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === 0 && <BasicInformation pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 1 && <Address pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 2 && <InvestmentDetail pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 3 && <SourceOfFinance pageClickCount={pageClickCount} nextPage={nextPage} />}
                {activeStep === 4 && <DocumentAttach pageClickCount={pageClickCount} nextPage={nextPage} />}
                <Grid
                  container
                  spacing={3}
                  style={{
                    marginTop: 15,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    md={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={prevPage}
                    >
                      Previous
                    </Button>

                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={nextPage}
                    >
                      Next
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
};

export default EditInvestmentPermit;