import React from "react";

import { useHistory, useLocation } from "react-router-dom";
import Divider from './images/divider.svg'
import Navbar from "./Navbar";

const Headermain = () => {

    const history = useHistory();
    const location = useLocation();
  

  return (
    <div>

        <Navbar/>
            <div className="navbar">
      <div>
        <p className=" navoperation" >
        <a href='/modelpath'>Operations</a>
        </p>
       
      </div>
      <img src={Divider} alt="Your SVG" className="divider-svg" />
      <div >
        <p className="navoperation" ><a href="#" >Sales</a></p>
      </div>
      <img src={Divider} alt="Your SVG" className="divider-svg" />
      <div >
        <p  className="navoperation" ><a href="/assignrole" >HR</a></p>
      </div>
    </div>
      
    </div>
  )
}

export default Headermain
