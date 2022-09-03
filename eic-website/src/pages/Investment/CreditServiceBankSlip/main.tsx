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

  const submitApplication = async (data: any) => {}
  
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
            <div className="new-permit-header">Upload your Credit Advice</div>
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
