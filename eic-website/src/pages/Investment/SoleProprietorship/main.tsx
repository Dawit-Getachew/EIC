import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import "./styles.css";
import BasicInformation from "./BasicInformation";
import BasicAddress from "./Address";
import InvestmentDetail from "./InvestmentDetail";
import SourceOfFinance from "./SourceOfFinance";
import DocumentAttach from "./DocumentAttach";
import Confirmation from "./Confirmation";
import {
  Actions as BufferActions,
  Selectors as BufferSelectors,
  selectServiceID,
} from "src/store/States/Buffer";
import { useDispatch, useSelector } from "react-redux";
import { API as InvestmentPermitAPI } from "src/store/States/InvestmentPermit";
import { uploadFile } from "src/store/States/InvestmentPermit/actions";
import { selectRequriedKeys } from "src/common/form";
import { useNavigate } from "react-router";
import routes from "src/routes";
import { TypeOfBusiness } from "src/common/enums"

const NewWorkPermit = () => {
  const dispatch = useDispatch();
  const steps = [
    "Basic Information",
    "Address",
    "Investment Detail",
    "Investment Detail (Cont.)",
    "Document Attach",
    "Confirmation",
  ];

  const countries = ["Ethiopia", "Eriteria"];
  const [activeStep, setActiveStep] = useState(4);
  const [pageClickCount, setPageClickCount] = useState(0);

  const inputs = [
    "power_of_attorney",
    "investment_visa_for_foreigners",
    "notarized_minutes_of_resolution",
    "passport",
    "project_proposal",
    "certificate_of_incorporation",
    "business_background",
  ];

  const [uploadedItems, setUploadedItems] = useState(inputs.map(() => false));
  const [doneItems, setDoneItems] = useState<string[]>([]);
  const [permitDocuments, setPermitDocuments] = useState<any>({})
  const uploadItems = async (data: any) => {
    const inputs = [
      "power_of_attorney",
      "investment_visa_for_foreigners",
      "notarized_minutes_of_resolution",
      "passport",
      "project_proposal",
      "certificate_of_incorporation",
      "business_background",
    ];
    const toBeUploaded = Object.values(selectRequriedKeys(inputs, data));
    const toBeUploadedKeys = Object.keys(selectRequriedKeys(inputs, data));
    let uploadObj = {}
    const uploaded = [];
    for (let i = 0; i < toBeUploaded.length; ++i) {
      const result = await uploadFile(toBeUploaded[i]);
      if (result.uri) {
        if (result.uri.length > 0) {
          uploaded.push(result.uri[0]);
        }
      }
      if (result.length > 0) {
        uploaded.push(result);
        uploadObj = {
          ...uploadObj, [toBeUploadedKeys[i]]: result
        }
        setDoneItems(uploaded.concat(result));
      }
      console.log("uu", uploadObj)
      let newUploadedItems = uploadedItems;
      newUploadedItems[i] = true;
    }
    setPermitDocuments(uploadObj)
    return uploaded;
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const investor_id = useSelector(selectServiceID);
  const submitApplication = async (data: any) => {
    setIsLoading(true);
    const uploaded = await uploadItems(data);
    InvestmentPermitAPI.addInvestmentPermit(
      {
        company_name: data.company_name,
        company_name_amharic: data.company_name_amharic,
        trade_name: data.trade_name,
        trade_name_amharic: data.trade_name_amharic,
        investor_nationality: data.investor_nationality,
        type_of_business: TypeOfBusiness["Sole Proprietorship"],
        type_of_ownership: data.type_of_ownership,
        shareholders: [],
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
        market_destination_local_amount: Number(data.production_amount_local),
        market_destination_export_amount: Number(data.production_amount_export),
        number_of_employees: Number(data.number_of_permanent_employees),
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
          country: String(data.home_country_address),
        },
        employee_information: {
          permanent_female_amount: Number(data.permanent_female_amount),
          permanent_male_amount: Number(data.permanent_male_amount),
          temporary_female_amount: Number(data.temporary_female_amount),
          temporary_male_amount: Number(data.temporary_male_amount),
        },
        representative_full_name: data.representative_name,
        investor_id,
        permit_documents: {
          business_background: permitDocuments.business_background? permitDocuments.business_background : "",
          certificate_of_incorporation: permitDocuments.certificate_of_incorporation? permitDocuments.certificate_of_incorporation : "",
          investment_visa_for_foreigners: permitDocuments.investment_visa_for_foreigners? permitDocuments.investment_visa_for_foreigners : "",
          memorandum_and_articles_of_association: permitDocuments.memorandum_and_articles_of_association? permitDocuments.memorandum_and_articles_of_association : "",
          notarized_minutes_of_resolution: permitDocuments.notarized_minutes_of_resolution? permitDocuments.notarized_minutes_of_resolution : "",
          passport: permitDocuments.passport? permitDocuments.passport : "",
          power_of_attorney: permitDocuments.power_of_attorney? permitDocuments.power_of_attorney : "",
          project_proposal: permitDocuments.project_proposal? permitDocuments.project_proposal : "",
        },
        products: data.products.map((item) => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_share_market: Number(item.local_share_market),
          export_share_market: Number(item.export_share_market),
          unit: String(item.unit),
        })),
        raw_materials: data.raw_materials.map((item) => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_source: Number(item.local_source),
          import_source: Number(item.import_source),
          unit: String(item.unit),
        })),
      },
      (err, data) => {
        if (err) throw err;
        if (data._id) {
          setActiveStep(Math.min(5, activeStep + 1));
          dispatch(BufferActions.ClearNewPermitBuffer());
          navigate(routes.INVESTMENT.MY_INVESTMENT_PERMITS.ROUTE, { replace: true })
        }
        setIsLoading(false);
      }
    );
  };

  const nextButton = () => {
    setPageClickCount(pageClickCount + 1);
  };

  const nextPage = (data: any) => {
    dispatch(BufferActions.SetNewPermitBuffer(data));
    setActiveStep(Math.min(5, activeStep + 1));
  };

  const prevPage = (data: any) => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  const cancelForm = () => {
    setActiveStep(0);
    dispatch(BufferActions.ClearNewPermitBuffer());
    window.location.reload();
  };

  useEffect(() => {
    dispatch(
      BufferActions.SetBreadCrumps([
        {
          path: "/",
          title: "Home",
        },
        {
          path: "//invest/new",
          title: "New Investment Permit",
        },
      ])
    );
  }, []);

  return (
    <>
      <div className="flex-c">
        <div className="flex-r">
          <div className="new-permit-container">
            <div className="new-permit-header">
              Investment Application Form (Sole Proprietorship)
            </div>
            <hr className="header-line" />
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="stepper-container"
              style={{ background: "white" }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <BasicInformation
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 1 && (
              <BasicAddress
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 2 && (
              <InvestmentDetail
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 3 && (
              <SourceOfFinance
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 4 && (
              <DocumentAttach
                pageClickCount={pageClickCount}
                nextPage={submitApplication}
              />
            )}
            {activeStep === 5 && <Confirmation />}
            {activeStep !== 5 && (
              <div className="footer-buttons">
                <div>
                  <Button
                    style={{
                      color: "#707070",
                      backgroundColor: "#F3F3F3",
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginRight: 70,
                    }}
                    onClick={prevPage}
                  >
                    Previous
                  </Button>
                  {activeStep < 4 ? (
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "#1e447e",
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                      onClick={() => {
                        nextButton();
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <>
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          style={{
                            color: "white",
                            backgroundColor: "green",
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                          onClick={() => {
                            nextButton();
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </>
                  )}
                </div>
                <Button
                  onClick={cancelForm}
                  style={{
                    color: "#F50B0B",
                    backgroundColor: "white",
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                    border: "solid #F50B0B 2px",
                    borderRadius: 5,
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <div className="short-form-box">
            <div className="short-form-box-header">Need Help?</div>
            <hr className="short-header-line" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewWorkPermit;
