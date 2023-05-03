import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const UpdatePostings = () => {
  const [applicants, setApplicants] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        "https://0mbq9runce.execute-api.ap-south-1.amazonaws.com/prod/jobposts"
      )
      .then((response) => {
        setApplicants(response.data.applicants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function openJobPost(id) {
    history.push({
      pathname: "/jobpostingInfo",
      search: `?id=${id}`,
    });
  }

  return (
    <>
      <Navbar />
      <div className="table-container" style={{ overflowX: "auto" }}>
        <table
          className="table"
          id="myTable"
          data-filter-control="true"
          data-show-search-clear-button="true">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "highlight-row" : ""}>
                <td className="vertical-line">{applicant.job_id}</td>
                <td className="vertical-line">{applicant.role}</td>
                <td className="vertical-line">
                  <button onClick={() => openJobPost(applicant.id)}>
                    View
                  </button>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UpdatePostings;
