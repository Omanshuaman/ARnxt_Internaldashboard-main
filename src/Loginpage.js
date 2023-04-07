import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { setUserSession } from './service/AuthService';

const adminurl='https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminroute';
const adminloginurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminlogin';
const verifyadminurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/verifyadmin'

const Loginpage = ({history}) => {

  const [email, setEmail] = useState();
  const [employeeid, setEmployeeId] = useState();
  const [role, setRole] = useState();

  const [loginemail, setLoginEmail] = useState();
  const [loginpassword, setLoginPassword] = useState();
  const [res, setRes]= useState('')
  
useEffect(()=>{
  if(res === 200){
    history.push('/admin')
  }
},[history, res])
  const submitHandler=(e)=>{
    e.preventDefault();
const requestBody= {
  email: email,
  employee_Id: employeeid,
  role: role
}
axios.post(adminurl,requestBody).then(res=>{



}).catch(error=>{
  console.log(error)
})
    
      
  }


  const loginHandler=(e)=>{
    e.preventDefault();

    const loginbody={
      email: loginemail,
      employee_Id: loginpassword
    }
    axios.post(adminloginurl, loginbody).then(res=>{
      console.log(res.status)
      if(res.status === 200){
        setRes(res.status)
        setUserSession(res.data.user, res.data.token) 
      }
    }).catch(error=>{
      console.log(error)
    })
  }


  return (

   
    <div>

        <div className='logindiv' >
          <div className='logincontainer'>
           
           <div className='emaildiv'> 
           <label style={{marginRight:'10px'}}>Email</label>
             <input type='text' onChange={event=> setEmail(event.target.value)} />
           </div>

           <div className='emaildiv'> 
           <label style={{marginRight:'10px'}}>Employee Id</label>
             <input type='text'  onChange={event=> setEmployeeId(event.target.value)} />
           </div>

           <div className='emaildiv'> 
           <label style={{marginRight:'10px'}}>Role</label>
             <select onChange={event=>setRole(event.target.value)} >
             <option value='' ></option>
              
              <option value='admin' >admin</option>
              <option value='user' >user</option>
              <option  value= 'ql' >ql</option>

             </select>
           </div>
            <div  className='buttonadminlogin'>
           <button onClick={submitHandler} >Submit</button>


            </div>
            

           
          
          </div>

        </div>


        <div className='logindiv' >
          <div className='logincontainer'>
           
           <div className='emaildiv'> 
           <label style={{marginRight:'10px'}}>Email</label>
             <input type='text' onChange={event=> setLoginEmail(event.target.value)} />
           </div>

           <div className='emaildiv'> 
           <label style={{marginRight:'10px'}}>Password</label>
             <input type='password'  onChange={event=> setLoginPassword(event.target.value)} />
           </div>

     
            <div  className='buttonadminlogin'>
           <button onClick={loginHandler} >Submit</button>


            </div>
            

           
          
          </div>

        </div>
      
    </div>
  )
}

export default Loginpage
