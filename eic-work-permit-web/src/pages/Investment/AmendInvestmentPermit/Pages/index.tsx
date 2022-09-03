import React from "react";
import "./styles.css";
import PermitAmmendment from "./PermitAmmendment";

const NewAmmendment = () => {
  return (
    <>
      <div className="flex-c">
        <div className="flex-r">
          <div className="new-permit-container">
            <div className="new-permit-header">
              Amend Investment Permit Form
            </div>
            <hr className="header-line" />

            <PermitAmmendment />
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

export default NewAmmendment;
