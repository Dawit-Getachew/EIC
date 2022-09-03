import React from "react";
import "./styles.css";
import PermitCancellation from "./PermitCancellation";

const CancelInvestment = () => {
  return (
    <>
      <div className="flex-c">
        <div className="flex-r">
          <div className="new-permit-container">
            <div className="new-permit-header">
              Investment Permit Cancellation Form
            </div>
            <hr className="header-line" />

            <PermitCancellation />
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

export default CancelInvestment;
