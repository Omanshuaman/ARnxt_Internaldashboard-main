import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [filter, setFilter] = useState("");

  function handleFilterChange(event) {
    setFilter(event.target.value.toUpperCase());
  }

  return (
    <>
      <div className="container">
        <input
          type="text"
          id="myInput"
          onChange={handleFilterChange}
          placeholder="JobId"
        />
        <table
          className="table"
          id="myTable"
          data-filter-control="true"
          data-show-search-clear-button="true"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Resume URL</th>
              <th>Applied Date</th>
              <th>Job ID</th>
            </tr>
          </thead>
          <tbody>
            <TableRow filter={filter} />
          </tbody>
        </table>
      </div>
    </>
  );
}

function TableRow(props) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/applicants"
      )
      .then((response) => setApplicants(response.data.applicants))
      .catch((error) => console.log(error));
  }, [applicants]);
  console.log(applicants);

  const filteredRows = applicants.filter(
    (row) =>
      row.job_id &&
      row.job_id.toString().toUpperCase().indexOf(props.filter) !== -1
  );

  return filteredRows.map((row, index) => (
    <tr key={index} className={index % 2 === 1 ? "highlight-row" : ""}>
      <td className="vertical-line">{row.name}</td>
      <td className="vertical-line">{row.emailid}</td>
      <td className="vertical-line">{row.contactNumber}</td>
      <td
        className="vertical-line"
        style={{ cursor: "pointer" }}
        onClick={() => window.open(row.resumeUrl, "_blank")}
      >
        {row.resumeUrl}
      </td>
      <td className="vertical-line">{row.applied_date}</td>
      <td className="vertical-line">{row.job_id}</td>
    </tr>
  ));
}

export default Table;
