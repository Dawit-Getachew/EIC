/* eslint-disable */
import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import "./styles.css";
import DocumentAttach from "./DocumentAttach";
import {
  Actions as BufferActions,
  Selectors as BufferSelectors,
  selectServiceID,
} from "src/store/States/Buffer";
import { useDispatch, useSelector } from "react-redux";
import { API as InvestmentPermitAPI } from "src/store/States/InvestmentPermit";
import { uploadFile } from "src/store/States/InvestmentPermit/actions";
import { selectRequriedKeys } from "src/common/form";
import FormData from "form-data";
import { IInvestmentPermitInput } from "src/models/InvestmentModels/investment_permit";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";

const BankSlip = () => {
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
  const submitApplication = async (data: any) => {
  //   setIsLoading(true);
  //   const uploaded = await uploadItems(data);
  //   InvestmentPermitAPI.addInvestmentPermit(
  //     {
  //       company_name: data.company_name,
  //       company_name_amharic: data.company_name_amharic,
  //       trade_name: data.trade_name,
  //       trade_name_amharic: data.trade_name_amharic,
  //       investor_nationality: data.investor_nationality,
  //       type_of_business: data.type_of_business,
  //       type_of_ownership: data.type_of_ownership,
  //       shareholders: data.shareholders.map((item) => ({
  //         name: item.name,
  //         nationality: item.nationality,
  //         country_of_incorporation: item.country_of_incorporation,
  //         address: item.address,
  //       })),
  //       manager_full_name: data.manager_full_name,
  //       manager_full_name_amharic: data.manager_full_name_amharic,
  //       company_address: {
  //         city: data.business_city,
  //         city_amharic: data.business_city_amharic,
  //         sub_city: data.business_sub_city,
  //         sub_city_amharic: data.business_sub_city_amharic,
  //         region: data.business_region,
  //         region_amharic: data.business_region_amharic,
  //         zone: data.business_zone,
  //         zone_amharic: data.business_zone_amharic,
  //         wereda: data.business_wereda,
  //         wereda_amharic: data.business_wereda_amharic,
  //         house_number: data.business_house_number,
  //         email: data.business_email,
  //         telephone_direct: data.business_telephone,
  //         telephone_mobile: data.business_telephone,
  //         fax: data.business_fax,
  //         po_box: data.business_po_box,
  //         other_address: "",
  //       },
  //       representative_address: {
  //         region: "",
  //         region_amharic: "",
  //         zone: "",
  //         zone_amharic: "",
  //         city: "",
  //         city_amharic: "",
  //         sub_city: "",
  //         sub_city_amharic: "",
  //         wereda: "",
  //         wereda_amharic: "",
  //         house_number: "",
  //         email: data.representative_email,
  //         telephone_direct: data.representative_tel_1,
  //         telephone_mobile: data.representative_tel_2,
  //         fax: "",
  //         po_box: "",
  //         other_address: "",
  //       },
  //       sector: data.sector,
  //       investment_activity: data.investment_activity,
  //       investment_activity_amharic: data.investment_activity_amharic,
  //       project_description: data.project_description,
  //       investment_address: {
  //         city: data.investment_city,
  //         city_amharic: data.investment_city_amharic,
  //         sub_city: data.investment_sub_city,
  //         sub_city_amharic: data.investment_sub_city_amharic,
  //         region: data.investment_region,
  //         region_amharic: data.investment_region_amharic,
  //         zone: data.investment_zone,
  //         zone_amharic: data.investment_zone_amharic,
  //         wereda: data.investment_wereda,
  //         wereda_amharic: data.investment_wereda_amharic,
  //         house_number: data.investment_house_number,
  //         email: data.investment_email,
  //         telephone_direct: data.investment_telephone,
  //         telephone_mobile: data.investment_telephone,
  //         fax: data.investment_fax,
  //         po_box: data.investment_po_box,
  //         other_address: "",
  //       },
  //       land_size_sqm: Number(data.land_size_sqm),
  //       land_acquisition_type: String(data.land_acquisition_type),
  //       investment_capital_usd: Number(data.investment_capital_usd),
  //       investment_capital_birr: Number(data.investment_capital_birr),
  //       enviromental_impact: data.enviromental_impact,
  //       equity: Number(data.equity),
  //       loan: Number(data.loan),
  //       heard_from: data.heard_from,
  //       market_destination_local_amount: Number(
  //         data.market_destination_local_amount
  //       ),
  //       market_destination_export_amount: Number(
  //         data.market_destination_export_amount
  //       ),
  //       number_of_employees: Number(data.number_of_permanent_employees),
  //       home_address: {
  //         region: "",
  //         region_amharic: "",
  //         zone: "",
  //         zone_amharic: "",
  //         city: "",
  //         city_amharic: "",
  //         sub_city: "",
  //         sub_city_amharic: "",
  //         wereda: "",
  //         wereda_amharic: "",
  //         house_number: "",
  //         email: data.home_email,
  //         telephone_direct: data.home_telephone,
  //         telephone_mobile: "",
  //         fax: "",
  //         po_box: data.home_po_box,
  //         other_address: "",
  //         country: String(data.home_country_address),
  //       },
  //       representative_full_name: data.representative_name,
  //       investor_id,
  //       permit_documents: {
  //         business_background: uploaded[0],
  //         certificate_of_incorporation: uploaded[1],
  //         investment_visa_for_foreigners: uploaded[2],
  //         memorandum_and_articles_of_association: uploaded[3],
  //         notarized_minutes_of_resolution: uploaded[4],
  //         passport: uploaded[5],
  //         power_of_attorney: uploaded[6],
  //         project_proposal: uploaded[7],
  //       },
  //       products: data.products.map((item) => ({
  //         name: String(item.name),
  //         quantity: Number(item.quantity),
  //         local_share_market: Number(item.local_share_market),
  //         export_share_market: Number(item.export_share_market),
  //         unit: String(item.unit),
  //       })),
  //       raw_materials: data.raw_materials.map((item) => ({
  //         name: String(item.name),
  //         quantity: Number(item.quantity),
  //         local_source: Number(item.local_source),
  //         import_source: Number(item.import_source),
  //         unit: String(item.unit),
  //       })),
  //     },
  //     (err, data) => {
  //       if (err) throw err;
  //       if (data._id) {
  //         setActiveStep(Math.min(5, activeStep + 1));
  //         dispatch(BufferActions.ClearNewPermitBuffer());
  //       }
  //       setIsLoading(false);
  //     }
  //   );
  // }
  }
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

  return (
    <>
      <div className="flex-c">
        <div className="flex-r">
          <div className="new-permit-container">
            <div className="new-permit-header">Upload your Bank Slip for your Memorandum of Articles & Association</div>
            <hr className="header-line" />
            <DocumentAttach
              pageClickCount={pageClickCount}
              nextPage={submitApplication}
            />
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

export default BankSlip;
