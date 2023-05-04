import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UpdatePostings = () => {
  const [applicants, setApplicants] = useState([]);
  const history = useHistory();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const isDeleteEnabled = inputValue === "delete"; // enable delete button only if input value is "delete"
  const [itemId, setItemId] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDelete = () => {
    axios
      .delete(
        "https://0mbq9runce.execute-api.ap-south-1.amazonaws.com/prod/jobpost",
        { data: { id: itemId } }
      )
      .then((response) => {
        console.log(response.data);
        toast("Deleted Successfully");
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function openModal(id) {
    setItemId(id);

    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
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
  function viewJobPost(id) {
    history.push({
      pathname: "/viewpostingInfo",
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
                  <button onClick={() => viewJobPost(applicant.id)}>
                    View
                  </button>
                  <button onClick={() => openJobPost(applicant.id)}>
                    Edit
                  </button>
                  <button onClick={() => openModal(applicant.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "15px",
            border: "none",
            padding: "30px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
            maxWidth: "500px",
            width: "100%",
          },
        }}
        contentLabel="Delete Modal">
        <h2 style={{ marginBottom: "20px" }}>Delete Item</h2>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#dc3545",
            fontSize: "18px",
            fontWeight: "bold",
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={closeModal}>
          Close
        </button>
        <div style={{ marginBottom: "20px" }}>
          Are you certain you want to delete this job posting? Please note that
          deleting this job posting will also remove all resumes submitted by
          applicants for this position.
        </div>
        <form>
          <label
            htmlFor="deleteInput"
            style={{ display: "block", marginBottom: "10px" }}>
            Type "delete" to confirm:
          </label>
          <input
            id="deleteInput"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "20px",
              width: "100%",
            }}
          />
          <button
            type="button"
            onClick={handleDelete}
            disabled={!isDeleteEnabled}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: isDeleteEnabled ? "pointer" : "not-allowed",
              opacity: isDeleteEnabled ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}>
            Delete
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UpdatePostings;
