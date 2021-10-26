import React from "react";
import { FcCheckmark } from "react-icons/fc";
import "../../css/Login_Signup/signinlist.css";

export default function Details() {
  return (
    <div className="list">
      <h2>Be in Charge, From Just About Anywhere</h2>
      <ul>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          New Hire Onboarding
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          Employee Management
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          Immigration
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          I-9 Management &amp; E-Verify
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          QuickBooks Integration
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          Finance
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          Employee Self Service
        </li>
        <li>
          <span>
            <FcCheckmark />
          </span>{" "}
          Exit Management
        </li>
      </ul>
    </div>
  );
}
