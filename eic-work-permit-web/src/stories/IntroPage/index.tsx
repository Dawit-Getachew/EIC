import React from 'react';
import './styles.css'
import { Grid, Button } from "@mui/material"
import UserInfoIcon from "../assets/user-info.png"
import UserLocationIcon from "../assets/user-location.png"
import UserInvestIcon from "../assets/user-invest.png"
import UserAttachIcon from "../assets/user-attach.png"
import UserDocumentIcon from "../assets/user-document.png"
import UserConfirmIcon from "../assets/user-confirm.png"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface NewPermitIntroProps { }

const texts = [
  {
    title: "Who is this service for?",
    description: "This form is designed to register new investments in Ethiopia."
  },
  {
    title: "How to submit your request?",
    description: "This site allows you to submit the application online. It's a simple, three-step process that only takes a few minutes."
  },
  {
    title: "How do I prepare to submit my investment application form?",
    description: "Before starting your online process, make sure you have all the documents to provide by downloading the list of supporting documents."
  },
  {
    title: "What happens after the validation of my entry?",
    description: "After validating your entry online, you will be able to download, and be able to be notified about the  process and approval on this webiste, a confirmation which will also be sent to you by email and portal."
  }
]

const NewPermitIntro = ({ }: NewPermitIntroProps) => (
  <div>
    <div className="intro-container">
      <div className="intro-header">
        NOTE
      </div>
      <hr className="intro-header-divider" />
      <div className="intro-first-row">
        <div className="intro-instruction">Submit your application in 6 steps</div>
        <Grid
          container
          width="100%"
          direction="row"
          spacing={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="intro-icons">
            <Grid item md={2}>
              <div className="intro-icon-item">
                <img src={UserInfoIcon} className="icon-img" />
                <div className="icon-description">
                  1. Basic Information
                </div>
                <div className="icon-description-2">
                  Fill in the information relating to Company
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="intro-icon-item">
                <img src={UserLocationIcon} className="icon-img" />
                <div className="icon-description">
                  2. Address
                </div>
                <div className="icon-description-2">
                  Fill in the address relating to company and represenatative
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="intro-icon-item">
                <img src={UserInvestIcon} className="icon-img" />
                <div className="icon-description">
                  3. Investment Detail
                </div>
                <div className="icon-description-2">
                  Fill in the detail of the investment project
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="intro-icon-item">
                <img src={UserAttachIcon} className="icon-img" />
                <div className="icon-description">
                  4. Document Attach
                </div>
                <div className="icon-description-2">
                  Attach the necessary document
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="intro-icon-item">
                <img src={UserDocumentIcon} className="icon-img" />
                <div className="icon-description">
                  5. Summary
                </div>
                <div className="icon-description-2">
                  Check that the information entered and documents provided are compliant
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="intro-icon-item">
                <img src={UserConfirmIcon} className="icon-img" />
                <div className="icon-description">
                  6. Confirmation
                </div>
                <div className="icon-description-2">
                  Your request is recorded and transmitted
                </div>
              </div>
            </Grid>
          </div>
        </Grid>
      </div>
      <div className="intro-second-row">
        {texts.map(item => (
          <div className="intro-question-box">
            <div className="flex-r">
              <div className="intro-question-dot">•</div>
              <div className="intro-question-title">{item.title}</div>
            </div>
            <div className="intro-question-description">{item.description}</div>
          </div>
        ))}
        <div className="intro-question-box">
          <div className="intro-footer-notes">
            <div className="flex-r">
              <div className="intro-description-dot">•</div>
              <div className="intro-question-description">Your input is recorded and saved upon validation of each step. If you exit the webiste during entry, you can resume it later at the last saved step.</div>
            </div>
            <div className="flex-r">
              <div className="intro-description-dot">•</div>
              <div className="intro-question-description">Labels having a star or *are optional</div>
            </div>
          </div>
        </div>
        <div className="info-submit-container">
          <Button style={{
            backgroundColor: "#121f3e",
            color: "white",
            width: 153,
            borderRadius: 5,
            marginBottom: 13,
            fontFamily: "Poppins",
          }}>
            <ArrowForwardIcon className="arrow-fwd-icon" />
            Let's Begin
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default NewPermitIntro