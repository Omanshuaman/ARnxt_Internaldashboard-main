import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewPostingInfo = () => {
  const location1 = useLocation();
  const [jobPostingData, setJobPostingData] = useState(null);
  const id = new URLSearchParams(location1.search).get("id");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [role, setRole] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobPostDate, setJobPostDate] = useState("");
  const [location, setLocation] = useState("");
  const [educationReq, setEducationReq] = useState("");
  const [numberOfVacancy, setNumberOfVacancy] = useState("");
  const [whatWeAreLookingFor, setWhatWeAreLookingFor] = useState("");
  const [whatYouWillBeDoing, setWhatYouWillBeDoing] = useState("");
  const [bonusPoint, setBonusPoint] = useState("");
  const [perksBenefits, setPerksBenefits] = useState("");
  const [salary, setSalary] = useState("");

  const options = [
    { value: "Technology & IT", label: "Technology & IT" },
    { value: "Operations", label: "Operations" },
    { value: "Product Marketing", label: "Product Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
    { value: "Legal", label: "Legal" },
    { value: "HR & Admin", label: "HR & Admin" },
    { value: "Customer Support", label: "Customer Support" },
  ];

  const options1 = [
    { value: "Fresher", label: "Fresher" },
    { value: "0-1 Years", label: "0-1 Years" },
    { value: "1-2 Years", label: "1-2 Years" },
    { value: "2-5 Years", label: "2-5 Years" },
    { value: "5-8 Years", label: "5-8 Years" },
    { value: "8-10 Years", label: "8-10 Years" },
  ];

  const options3 = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
  ];
  useEffect(() => {
    axios
      .get(
        `https://0mbq9runce.execute-api.ap-south-1.amazonaws.com/prod/jobpost?id=${id}`
      )
      .then((response) => {
        if (response.data) {
          setJobPostingData(response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    setRole(jobPostingData?.role);
    setLocation(jobPostingData?.location);
    setNumberOfVacancy(jobPostingData?.number_of_vacancy);
    setWhatWeAreLookingFor(jobPostingData?.what_we_are_looking_for);
    setWhatYouWillBeDoing(jobPostingData?.what_you_will_be_doing);
    setBonusPoint(jobPostingData?.bonus_point);
    setPerksBenefits(jobPostingData?.perks_benefits);
    setSalary(jobPostingData?.salary);
    setEducationReq(jobPostingData?.education_requirement);
  }, [jobPostingData]);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleDeadlineChange = (event) => {
    const selectedDate = event.target.value;
    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    setDeadline(formattedDate);
  };

  const handleJobPostDateChange = (event) => {
    const selectedDate = event.target.value;
    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    setJobPostDate(formattedDate);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleNumberOfVacancyChange = (event) => {
    setNumberOfVacancy(event.target.value);
  };

  const handleWhatWeAreLookingForChange = (event) => {
    setWhatWeAreLookingFor(event.target.value);
  };

  const handleWhatYouWillBeDoingChange = (event) => {
    setWhatYouWillBeDoing(event.target.value);
  };

  const handleBonusPointChange = (event) => {
    setBonusPoint(event.target.value);
  };

  const handlePerksBenefitsChange = (event) => {
    setPerksBenefits(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };
  const handleEducationChange = (event) => {
    setEducationReq(event.target.value);
  };

  console.log(id);
  return (
    <div>
      <Navbar />
      <div className="border">
        <div className="banner-grid">
          <nav>
            <div>View Job Details:</div>
            <hr></hr>
          </nav>

          <div id="department">
            Department:
            {jobPostingData?.department}
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div id="role">
            <div>Role:</div>
            <input
              className="roleinput"
              value={role}
              onChange={handleRoleChange}></input>
          </div>
          <div id="experience">
            <div>Experience :{jobPostingData?.experience}</div>

            <select
              value={selectedOption1}
              onChange={(e) => setSelectedOption1(e.target.value)}>
              {options1.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div id="deadline">
            <div>
              Deadline :
              {new Date(jobPostingData?.deadline * 1000).toLocaleDateString(
                "en-GB"
              )}
            </div>
            <input
              type="date"
              name="dateofbirth"
              id="dateofbirth"
              onChange={handleDeadlineChange}></input>
          </div>

          <div id="jobpostdate">
            <div>
              Job Post Date :
              {new Date(
                jobPostingData?.job_post_date * 1000
              ).toLocaleDateString("en-GB")}
            </div>
            <input
              type="date"
              name="dateofbirth"
              id="dateofbirth"
              onChange={handleJobPostDateChange}></input>
          </div>
          <div id="location">
            <div>Location:</div>
            <input
              className="roleinput"
              value={location}
              onChange={handleLocationChange}></input>
          </div>

          <div id="job-type">
            <div>Job Type: {jobPostingData?.job_type}</div>
            <select onChange={(e) => setSelectedOption3(e.target.value)}>
              {options3.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div id="number-vacancy">
            <div>No. of Vacancy :</div>
            <input
              className="roleinput"
              value={numberOfVacancy}
              onChange={handleNumberOfVacancyChange}></input>
          </div>
          <div id="salary">
            <div>Salary : </div>
            <input
              className="roleinput"
              value={salary}
              onChange={handleSalaryChange}></input>
          </div>
          <div id="job-post-date">
            <div>Education Requirement :</div>
            <input
              className="roleinput"
              value={educationReq}
              onChange={handleEducationChange}></input>
          </div>
          <div id="looking">
            <div>
              What we are looking for: <h6>(use * for new line)</h6>
            </div>
            <textarea
              rows="6"
              cols="50"
              name="comment"
              form="usrform"
              value={whatWeAreLookingFor}
              onChange={handleWhatWeAreLookingForChange}></textarea>
          </div>
          <div id="doing">
            <div>
              What you will be doing: <h6>(use * for new line)</h6>
            </div>
            <textarea
              rows="6"
              cols="50"
              name="comment"
              form="usrform"
              value={whatYouWillBeDoing}
              onChange={handleWhatYouWillBeDoingChange}></textarea>
          </div>
          <div id="perks">
            <div>
              Perks & Benefits: <h6>(use * for new line)</h6>
            </div>
            <textarea
              rows="6"
              cols="50"
              name="comment"
              form="usrform"
              value={perksBenefits}
              onChange={handlePerksBenefitsChange}></textarea>
          </div>
          <div id="bonus">
            <div>
              Bonus Points: <h6>(use * for new line)</h6>
            </div>
            <textarea
              rows="6"
              cols="50"
              name="comment"
              form="usrform"
              value={bonusPoint}
              onChange={handleBonusPointChange}></textarea>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ViewPostingInfo;
