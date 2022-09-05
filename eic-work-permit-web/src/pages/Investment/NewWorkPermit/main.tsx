/* eslint-disable */
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
import BasicAddress from "./BusinessDetail";
import InvestmentDetail from "./BioDataPositionOccupied";
import SourceOfFinance from "./ParticularsReplacementEmployee";
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
import { API as WorkPermitAPI } from "src/store/States/WorkPermit"

const NewWorkPermit = () => {
  const dispatch = useDispatch();
  const steps = [
    "Basic Information",
    "Business Detail",
    "Bio Data & Position to be Occupied",
    "Particulars of Eth. Replacement Employee",
    "Document Attach",
    "Confirmation",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);

  const inputs = [
    "power_of_attorney",
    "investment_visa_for_foreigners",
    "notarized_minutes_of_resolution",
    "passport",
    "project_proposal",
    "certificate_of_incorporation",
    "memorandum_and_articles_of_association",
    "business_background",
  ];

  const [uploadedItems, setUploadedItems] = useState(inputs.map(() => false));
  const [doneItems, setDoneItems] = useState<string[]>([]);
  const uploadItems = async (data: any) => {
    const inputs = [
      "power_of_attorney",
      "investment_visa_for_foreigners",
      "notarized_minutes_of_resolution",
      "passport",
      "project_proposal",
      "certificate_of_incorporation",
      "memorandum_and_articles_of_association",
      "business_background",
    ];
    const toBeUploaded = Object.values(selectRequriedKeys(inputs, data));
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
        setDoneItems(uploaded.concat(result));
      }
      let newUploadedItems = uploadedItems;
      newUploadedItems[i] = true;
    }
    return uploaded;
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const investor_id = useSelector(selectServiceID);
  const getValue = (value: any) => {
    try {
      return value? String(value) : ""
    } catch (e) {
      return ""
    }
  }

  const submitApplication = async (data: any) => {
    setIsLoading(true);
    console.log("submitted ", data)
    WorkPermitAPI.CreateWorkPermit({
      address: {
        city: getValue(data.city),
        city_amharic: getValue(data.city_amharic),
        email: getValue(data.email),
        fax: getValue(data.fax),
        house_number: getValue(data.house_number),
        po_box: getValue(data.po_box),
        region: getValue(data.region),
        region_amharic: getValue(data.region_amharic),
        sub_city: getValue(data.sub_city),
        sub_city_amharic: getValue(data.sub_city_amharic),
        telephone_direct: getValue(data.telephone_number),
        telephone_mobile: "",
        wereda: getValue(data.other_address),
        wereda_amharic: getValue(data.other_address_amharic),
        zone: "",
        zone_amharic: "",
      },
      bio_data_expat_information: {
        agreed_length_of_empl_per_empl_contract: getValue(data.agreed_length_of_employment_per_the_employment_contract),
        basic_salary_in_birr: Number(getValue(data.basic_salary_birr)),
        date_of_birth: getValue(data.date_of_birth) as unknown as Date,
        expat_qualification: {
          education_level: getValue(data.qualification_education),
          professional_skill: getValue(data.qualification_professional_skill),
          years_of_experiance: getValue(data.qualification_years_of_experiance),
        },
        expected_date_of_employment: getValue(data.qualification_expected_date_of_employment) as unknown as Date,
        full_name: getValue(data.full_name),
        full_name_amharic: getValue(data.full_name_amharic),
        gender: getValue(data.gender),
        monthly_allowance_in_birr: Number(getValue(data.monthly_allowance_birr)),
        nationality: getValue(data.nationality),
        passport_number: getValue(data.passport_number),
        passport_valid_until: getValue(data.passport_valid_until) as unknown as Date,
        project_phase_expat_employment_is_sought: getValue(data.project_phase_for_which_expat_employment_is_sought),
        title_to_be_occupied_by_expat: getValue(data.title_of_profession),
        visa_date_of_issue: getValue(data.visa_date_of_issue) as unknown as Date,
        visa_type: getValue(data.visa_type),
        visa_valid_until_till: getValue(data.visa_valid_until) as unknown as Date,
      },
      business_activity: getValue(data.business_description),
      capital_of_enterprise: getValue(data.capital_of_enterprise),
      certification: {
        date: getValue(data.certification_date) as unknown as Date,
        name: getValue(data.certification_name),
        title: getValue(data.certification_title),
      },
      company_name: getValue(data.company_name),
      company_name_amharic: getValue(data.company_name_amharic),
      country_of_incorporation: getValue(data.nationality),
      current_number_of_holding_eth_management_posts: Number(getValue(data.current_total_number_of_local_employees_in_management_position)),
      current_number_of_permanent_eth_employees: Number(getValue(data.current_total_number_of_local_employees_in_permanent_position)),
      current_total_number_of_expansion: Number(getValue(data.current_total_number_of_expats)),
      current_total_number_of_expats: Number(getValue(data.current_total_number_of_expats)),
      date_of_issuance: getValue(data.date_of_issuance) as unknown as Date,
      expansion_license_number: getValue(data.expansion_license_number),
      heard_from: getValue(data.heard_from),
      investment_permit_license_number: getValue(data.ref_number),
      permit_documents: {
        picture: "lolz"
      },
      service_id: investor_id,
      replacement_employees: data.employees?
        data.employees.map((item: any) => ({
          name: getValue(item.name),
          age: Number(getValue(item.age)),
          gender: getValue(item.gender),
          full_address: getValue(item.full_address),
          description_of_academic_credentials_and_experience: getValue(item.description_of_academic_credentials_and_experience),
          content_of_training_program_designed_to_replace_the_expat: getValue(item.content_of_training_program_designed_to_replace_the_expat),
          schedule_of_training_program: getValue(item.schedule_of_training_program),
          estimate_of_total_time_required_to_transfer_knowledge_and_skills: getValue(item.estimate_of_total_time_required_to_transfer_knowledge_and_skills)
        })) : []
    }, (err: any, data: any) => {
      if (err) throw err
      setIsLoading(false)
      if (data._id) {
        navigate(routes.WORK_PERMIT.MY_WORK_PERMITS.ROUTE, { replace: true })
      }
    })
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
          path: routes.WORK_PERMIT.NEW_WORK_PERMIT.ROUTE,
          title: "New Work Permit",
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
              Work Permit Application Form
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
