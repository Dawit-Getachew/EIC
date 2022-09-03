import React, { useState } from "react"
import {
  Stepper, Step, StepLabel, Button,
} from '@mui/material';
import './styles.css'
import BasicInformation from './BasicInformation'
import BasicAddress from './Address/'
import InvestmentDetail from './InvestmentDetail'
import SourceOfFinance from './SourceOfFinance'
import DocumentAttach from './DocumentAttach'

const NewWorkPermit = () => {
  const steps = [
    'Basic Information',
    'Address',
    'Investment Detail',
    'Investment Detail (Cont.)',
    'Document Attach',
    'Confirmation',
  ];

  const countries = ['Ethiopia', 'Eriteria']
  const [activeStep, setActiveStep] = useState(4)

  return (
    <>
      <div className="flex-c">
        <div className="flex-r">
          <div className="new-permit-container">
            <div className="new-permit-header">
              Investment Application Form
            </div>
            <hr className="header-line" />
            <Stepper activeStep={activeStep} alternativeLabel className="stepper-container">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {(activeStep === 0) && <BasicInformation />}
            {(activeStep === 1) && <BasicAddress />}
            {(activeStep === 2) && <InvestmentDetail />}
            {(activeStep === 3) && <SourceOfFinance />}
            {(activeStep === 4) && <DocumentAttach />}
            <div className="footer-buttons">
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
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
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
                  onClick={() => setActiveStep(Math.min(7, activeStep + 1))}
                >Next</Button>
              </div>
              <Button style={{
                color: '#F50B0B',
                backgroundColor: 'white',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 5,
                marginRight: 70,
                border: 'solid #F50B0B 2px',
                borderRadius: 5
              }}>Cancel</Button>
            </div>
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

export default NewWorkPermit