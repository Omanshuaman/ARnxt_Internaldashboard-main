import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import Divider from "./images/divider.svg";
import axios from "axios";
const adminurl =
  "https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminroute";

const HRmanage = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      employee_Id: employeeid,
      role: role,
    };
    axios
      .post(adminurl, requestBody)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const rolesHandler = (e) => {
    e.preventDefault();
    document.getElementById("addrolesdiv").style.display = "block";
  };

  const [email, setEmail] = useState();
  const [employeeid, setEmployeeId] = useState();
  const [role, setRole] = useState();
  return (
    <div>
      <div className="navbar">
        <div>
          <p className=" navoperation">
            <a href="" onClick={rolesHandler}>
              Assign roles
            </a>
          </p>
        </div>
        <img src={Divider} alt="Your SVG" className="divider-svg" />
        <div>
          <p className="navoperation">
            <a href="/jobpost">Post job</a>
          </p>
        </div>
        <img src={Divider} alt="Your SVG" className="divider-svg" />
        <div>
          <p className="navoperation">
            <a href="/viewapplicants"> View Applicants Info</a>
          </p>
        </div>
      </div>

      <form className="login" id="addrolesdiv" onSubmit={submitHandler}>
        <h2>ARnxt, Admin!</h2>
        <p>Please assign roles</p>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ARnxt email"
        />
        <input
          type="password"
          onChange={(event) => setEmployeeId(event.target.value)}
          placeholder="employee id"
        />

        <select
          className="admindropdown"
          onChange={(event) => setRole(event.target.value)}>
          <option selected="selected" className="optroles">
            Assign roles
          </option>

          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="ql">ql</option>
        </select>

        <input type="submit" value="Submit" style={{ cursor: "pointer" }} />
      </form>
    </div>
  );
};

export default HRmanage;
