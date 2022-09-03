import React, { useState } from "react"
import {
  Stepper, Step, StepLabel, Button, CircularProgress
} from '@mui/material';
import './styles.css'
import BasicInformation from './BasicInformation/'
import ProposedProfile from './ProposedProfile'
import EmployeeInformation from './EmployeeInformation'
import ProductInformation from './ProductInformation'
import DocumentAttach from './DocumentAttach'
import ProjectImplementation from './ProjectImplementation'
import { Actions as BufferActions, Selectors as BufferSelectors, selectServiceID } from "src/store/States/Buffer"
import { useDispatch, useSelector } from "react-redux"
import { API as InvestmentPermitExpansionAPI } from "src/store/States/InvestmentPermitExpansion"
import { InvestmentPermitStatus } from "src/models/InvestmentModels/investment_permit_expansion"
import { uploadFile } from "src/store/States/InvestmentPermit/actions"
import { selectRequriedKeys } from "src/common/form"
import FormData from 'form-data'
import { IInvestmentPermitInput } from "src/models/InvestmentModels/investment_permit";
import { useNavigate } from 'react-router'
import routes from "src/constants/routes"
import PageHeader from "./PageHeader"

const VewInvestmentPermit = () => {
  const dispatch = useDispatch()
  const savedBuffer = useSelector(BufferSelectors.selectViewPermitBuffer)
  const steps = [
    'Basic Information',
    'Proposed Profile',
    'Employee Information',
    'Product Information',
    'Project Implementation',
    'Document Attach'
  ];
  const [activeStep, setActiveStep] = useState(0)
  const [pageClickCount, setPageClickCount] = useState(0)

  const nextPage = () => {
    setActiveStep(Math.min(5, activeStep + 1))
  }

  const prevPage = () => {
    setActiveStep(Math.max(0, activeStep - 1))
  }

  return (
    <>
      <PageHeader data={savedBuffer} />
      <div className="flex-c">
        <div className="flex-r">
          <div className="new-permit-container">
            <div className="new-permit-header">
              Investment Expansion Application Form
            </div>
            <hr className="header-line" />
            <Stepper activeStep={activeStep} alternativeLabel className="stepper-container" style={{ background: 'white' }}>
              {steps.map((label, idx) => (
                <Step key={label} onClick={() => setActiveStep(idx)} style={{ cursor: "pointer" }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {(activeStep === 0) && <BasicInformation pageClickCount={pageClickCount} nextPage={nextPage} />}
            {(activeStep === 1) && <ProposedProfile pageClickCount={pageClickCount} nextPage={nextPage} />}
            {(activeStep === 2) && <EmployeeInformation pageClickCount={pageClickCount} nextPage={nextPage} />}
            {(activeStep === 3) && <ProductInformation pageClickCount={pageClickCount} nextPage={nextPage} />}
            {(activeStep === 4) && <ProjectImplementation pageClickCount={pageClickCount} nextPage={nextPage} />}
            {(activeStep === 5) && <DocumentAttach pageClickCount={pageClickCount} nextPage={() => null} />}
            {(activeStep !== 6) && <div className="footer-buttons">
              <div>
                <Button
                  style={{
                    color: '#707070',
                    backgroundColor: '#F3F3F3',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginRight: 70
                  }}
                  onClick={prevPage}
                >Previous</Button>
                <Button
                  style={{
                    color: 'white',
                    backgroundColor: '#1e447e',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  onClick={nextPage}
                >Next</Button>
              </div>
            </div>}
          </div>
          <div className="short-form-box">
            <div className="short-form-box-header">
              Need Help?
            </div>
            <hr className="short-header-line" />
          </div>
        </div>
      </div>
    </>
  )
}

export default VewInvestmentPermit