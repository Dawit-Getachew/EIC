import React, { FC } from "react";
import "./styles.css";
import { Grid, Button } from "@mui/material";
import UserInfoIcon from "src/assets/user-info.png";
import UserLocationIcon from "src/assets/user-location.png";
import UserInvestIcon from "src/assets/user-invest.png";
import UserAttachIcon from "src/assets/user-attach.png";
import UserDocumentIcon from "src/assets/user-document.png";
import UserConfirmIcon from "src/assets/user-confirm.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import routes from "src/routes";

interface NewPermitIntroProps {}

const texts = [
  {
    title: "Who is this service for?",
    description:
      "This form is designed to register new investments in Ethiopia.",
  },
  {
    title: "How to submit your request?",
    description:
      "This site allows you to submit the application online. It's a simple, three-step process that only takes a few minutes.",
  },
  {
    title: "How do I prepare to submit my investment application form?",
    description:
      "Before starting your online process, make sure you have all the documents to provide by downloading the list of supporting documents.",
  },
  {
    title: "What happens after the validation of my entry?",
    description:
      "After validating your entry online, you will be able to download, and be able to be notified about the  process and approval on this webiste, a confirmation which will also be sent to you by email and portal.",
  },
];

const steps = [
  {
    title: "1. Basic Information",
    description: "Fill in the information relating to Company",
    icon: UserInfoIcon,
  },
  {
    title: "2. Business Detail",
    description: "Fill all the business details relating to company and represenatative",
    icon: UserLocationIcon,
  },
  {
    title: "3. Bio Data & Position to be Occupied",
    description: "Fill in the Bio Data & Position to be occupied by employee",
    icon: UserInvestIcon,
  },
  {
    title: "4. Particulars of Eth. Replacement Employee",
    description: "Fill in the particulars the replacement employee",
    icon: UserInvestIcon,
  },
  {
    title: "5. Document Attach",
    description: "Attach the necessary document",
    icon: UserAttachIcon,
  },
  {
    title: "6. Confirmation",
    description: "Your request is recorded and transmitted",
    icon: UserConfirmIcon,
  },
];

interface Props {
  closePage: () => void;
}
const NewPermitIntro: FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="intro-container">
        <div className="intro-header">NOTE</div>
        <hr className="intro-header-divider" />
        <div className="intro-first-row">
          <div className="intro-instruction">
            Submit your application in 6 steps
          </div>
          <Grid
            container
            width="100%"
            direction="row"
            spacing={3}
            justifyContent="center"
          >
            <div className="intro-icons">
              {steps.map((item, key) => (
                <Grid item md={2} key={key}>
                  <div className="intro-icon-item">
                    <img src={item.icon} className="icon-img" />
                    <div className="icon-description">{item.title}</div>
                    <div className="icon-description-2">{item.description}</div>
                  </div>
                </Grid>
              ))}
            </div>
          </Grid>
        </div>
        <div className="intro-second-row">
          {texts.map((item) => (
            <div className="intro-question-box">
              <div className="flex-r">
                <div className="intro-question-dot">???</div>
                <div className="intro-question-title">{item.title}</div>
              </div>
              <div className="intro-question-description">
                {item.description}
              </div>
            </div>
          ))}
          <div className="intro-question-box">
            <div className="intro-footer-notes">
              <div className="flex-r">
                <div className="intro-description-dot">???</div>
                <div className="intro-question-description">
                  Your input is recorded and saved upon validation of each step.
                  If you exit the webiste during entry, you can resume it later
                  at the last saved step.
                </div>
              </div>
              <div className="flex-r">
                <div className="intro-description-dot">???</div>
                <div className="intro-question-description">
                  Labels having a star or *are optional
                </div>
              </div>
            </div>
          </div>
          <div className="info-submit-container">
            <Button
              style={{
                backgroundColor: "#121f3e",
                color: "white",
                width: 153,
                borderRadius: 5,
                marginBottom: 13,
                fontFamily: "Poppins",
                marginRight: 10,
              }}
              onClick={props.closePage}
            >
              <ArrowForwardIcon className="arrow-fwd-icon" />
              Let's Begin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPermitIntro;
