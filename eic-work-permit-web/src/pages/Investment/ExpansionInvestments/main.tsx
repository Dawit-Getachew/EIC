import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import "./styles.css";
import BasicInformation from "./BasicInformation/";
import ProposedProfile from "./ProposedProfile";
import EmployeeInformation from "./EmployeeInformation";
import ProductInformation from "./ProductInformation";
import DocumentAttach from "./DocumentAttach";
import Confirmation from "./Confirmation";
import ProjectImplementation from "./ProjectImplementation";
import {
  Actions as BufferActions,
  Selectors as BufferSelectors,
  selectServiceID,
} from "src/store/States/Buffer";
import { useDispatch, useSelector } from "react-redux";
import { API as InvestmentPermitExpansionAPI } from "src/store/States/InvestmentPermitExpansion";
import { InvestmentPermitStatus } from "src/models/InvestmentModels/investment_permit_expansion";
import { uploadFile } from "src/store/States/InvestmentPermit/actions";
import { selectRequriedKeys } from "src/common/form";
import FormData from "form-data";
import { IInvestmentPermitInput } from "src/models/InvestmentModels/investment_permit";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";

const NewWorkPermit = () => {
  const dispatch = useDispatch();
  const steps = [
    "Basic Information",
    "Proposed Profile",
    "Employee Information",
    "Product Information",
    "Project Implementation",
    "Document Attach",
    "Confirmation",
  ];

  const countries = ["Ethiopia", "Eriteria"];
  const [activeStep, setActiveStep] = useState(0);
  const [pageClickCount, setPageClickCount] = useState(0);

  const inputs = [
    "copy_of_business_license",
    "financial_statement",
    "feasibility_study",
    "list_of_capital_good_and_raw_materials",
    "land_lice_agreement",
  ];

  const [uploadedItems, setUploadedItems] = useState(inputs.map(() => false));
  const [doneItems, setDoneItems] = useState<string[]>([]);
  const uploadItems = async (data: any) => {
    const keys = Object.keys(selectRequriedKeys(inputs, data));
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
  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer);
  const submitApplication = async (formData: any) => {
    setIsLoading(true);
    const uploaded = await uploadItems(formData);
    const data = {
      ...savedBuffer,
      ...formData,
    };
    InvestmentPermitExpansionAPI.CreateInvestmentPermitExpansion(
      {
        ...savedBuffer,
        company_name: data.company_name,
        company_name_amharic: data.company_name_amharic,
        company_address: {
          city: data.business_city,
          sub_city: data.business_sub_city,
          region: data.business_region,
          zone: data.business_zone,
          house_number: data.business_house_number,
          email: data.business_email,
          telephone_direct: data.business_telephone,
          telephone_mobile: data.business_telephone,
          fax: data.business_fax,
          po_box: data.business_po_box,
          other_address: "",
        },
        investment_activity: data.investment_activity,
        project_description: data.project_description,
        equity: Number(data.equity),
        loan: Number(data.loan),
        raw_materials: data.raw_materials.map((item) => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_source: Number(item.local_source),
          import_source: Number(item.import_source),
          unit: String(item.unit),
        })),
        anticipated_products: data.anticipated_products.map((item) => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_share_market: Number(item.local_share_market),
          export_share_market: Number(item.export_share_market),
          unit: String(item.unit),
          percentage_capacity_increased: Number(
            item.percentage_capacity_increased
          ),
          percentage_unit_increased: Number(item.percentage_unit_increased),
        })),
        company_expansion_address: {
          region: String(data.expansion_region),
          zone: String(data.expansion_zone),
          city: String(data.expansion_city),
          sub_city: String(data.expansion_sub_city),
          house_number: String(data.expansion_house_number),
          email: String(data.expansion_email),
          telephone_direct: String(data.expansion_telephone),
          telephone_mobile: String(data.expansion_telephone),
          fax: String(data.expansion_fax),
          po_box: String(data.expansion_po_box),
          other_address: "",
          country: String(data.expansion_country),
        },
        current_products: data.current_products.map((item) => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          local_share_market: Number(item.local_share_market),
          export_share_market: Number(item.export_share_market),
          unit: String(item.unit),
        })),
        proposed_investment_capital: data.proposed_expansion_capital,
        starting_date: data.starting_date,
        ending_date: data.ending_date,
        expected_employees: {
          permanent_amount: Number(data.permanent_employees),
          temporary_amount: Number(data.temporary_employees),
        },
        factors_influencing_plan: data.factors_influencing_investment,
        how_to_avoid_problems: data.what_do_you_intend_to_do_to_avoid_mistakes,
        invesment_permit_id: data._id,
        investment_costs: {
          land: Number(data.land_cost),
          building: Number(data.building_cost),
          working_capital: Number(data.working_capital_cost),
          machinery: Number(data.machinery_cost),
          material: Number(data.material_cost),
          other_costs: Number(data.other_cost),
        },
        other_documents: "",
        permit_status: InvestmentPermitStatus.DRAFTED,
        previous_employees: {
          permanent_female_amount: Number(data.permanent_female_employees),
          permanent_male_amount: Number(data.permanent_male_employees),
          temporary_female_amount: Number(data.temporary_female_employees),
          temporary_male_amount: Number(data.temporary_male_employees),
        },
        project_impl_plan: {
          project_devt_feasiblility_study: data.project_devt_feasibility_study,
          land_acquisition: data.land_acquisition,
          building_civil_work: data.building_civil_work,
          public_utility_acquisition: {
            electricity: data.electricity_utility,
            water: data.water_utility,
            telecom: data.telecom_utility,
            other: data.other_utility,
          },
          machinery_procurement_purchase: data.machinery_procurement_purchase,
          reaching_of_machinery_at_project_site:
            data.reaching_machinery_at_project_site,
          work_permit_for_technician: data.work_permit_for_technician,
          machinery_erection_installation: data.machinery_erection_installation,
          preparation_of_raw_material: data.preparation_of_raw_material,
          co_missing_machines_and_make_ready_for_operator:
            data.co_missing_machines_make_ready_for_operator,
          common_cement_of_product_service: data.common_cement_product_service,
          other: data.any_other,
        },
        project_utilities: {
          size_of_land_sqm: Number(data.size_of_land),
          electrical_power_kw: Number(data.electricity),
          water_m3: Number(data.water),
          telecom_services_needed: data.telecom_services,
          other_services: data.other_services,
        },
        investor_id,
        support_needed_from_eic: data.support_provided_by_eic,
        expansion_documents: {
          copy_of_business_license: uploaded[0],
          feasibility_study: uploaded[1],
          financial_statement: uploaded[2],
          land_lice_agreement: uploaded[3],
          list_of_capital_good_and_raw_materials: uploaded[4],
        },
      },
      (err, data) => {
        if (err) throw err;
        if (data._id) {
          setActiveStep(Math.min(6, activeStep + 1));
          dispatch(BufferActions.ClearExpansionPermitBuffer());
        }
        setIsLoading(false);
      }
    );
  };

  const nextButton = () => {
    setPageClickCount(pageClickCount + 1);
  };

  const nextPage = (data: any) => {
    dispatch(BufferActions.SetExpansionPermitBuffer(data));
    setActiveStep(Math.min(6, activeStep + 1));
  };

  const prevPage = (data: any) => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  const cancelForm = () => {
    setActiveStep(0);
    dispatch(BufferActions.ClearExpansionPermitBuffer());
    window.location.reload();
  };

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
              <ProposedProfile
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 2 && (
              <EmployeeInformation
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 3 && (
              <ProductInformation
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 4 && (
              <ProjectImplementation
                pageClickCount={pageClickCount}
                nextPage={nextPage}
              />
            )}
            {activeStep === 5 && (
              <DocumentAttach
                pageClickCount={pageClickCount}
                nextPage={submitApplication}
              />
            )}
            {activeStep === 6 && <Confirmation />}
            {activeStep !== 6 && (
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
                  {activeStep < 5 ? (
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
