import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const JobpostingInfo = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  console.log(id);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default JobpostingInfo;
