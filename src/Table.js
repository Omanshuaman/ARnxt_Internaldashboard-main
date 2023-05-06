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
          placeholder="Job Id"
        />
        <table
          className="table"
          id="myTable"
          data-filter-control="true"
          data-show-search-clear-button="true">
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
//aa
function TableRow(props) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/applicants"
      )
      .then((response) => {
        const sortedApplicants = response.data.applicants.sort(
          (a, b) => new Date(b.applied_date) - new Date(a.applied_date)
        );
        setApplicants(sortedApplicants);
        setLoading(false); // set loading to false when data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // set loading to false on error as well
      });
  }, []);

  const filteredRows = applicants.filter(
    (row) =>
      row.job_id &&
      row.job_id.toString().toUpperCase().indexOf(props.filter) !== -1
  );
  if (loading) {
    return (
      <tr>
        <td colSpan="6" style={{ textAlign: "center" }}>
          Loading...
        </td>
      </tr>
    );
  }
  return filteredRows.map((row, index) => (
    <tr key={index} className={index % 2 === 1 ? "highlight-row" : ""}>
      <td className="vertical-line">{row.name}</td>
      <td className="vertical-line">{row.emailid}</td>
      <td className="vertical-line">{row.contactNumber}</td>
      <td
        className="vertical-line"
        style={{ cursor: "pointer" }}
        onClick={() => window.open(row.resumeUrl, "_blank")}>
        {row.resumeUrl}
      </td>
      <td className="vertical-line">
        {new Date(row.applied_date).toLocaleDateString("en-GB")}
      </td>
      <td className="vertical-line">{row.job_id}</td>
    </tr>
  ));
}

export default Table;
