import React, { useEffect, useState } from 'react'
import { setUserSession } from './service/AuthService';
import axios from 'axios';
const adminloginurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminlogin';

const Login = ({history}) => {

    const [loginemail, setLoginEmail] = useState();
    const [loginpassword, setLoginPassword] = useState();
    const [res, setRes]= useState('')


    useEffect(()=>{
        if(res === 200){
          history.push('/main')
        }
      },[history, res])

    
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

<form class="login"  onSubmit={loginHandler}>
  <h2>ARnxt, Users!</h2>
  <p>Please log in</p>
  <input type='email' onChange={event=> setLoginEmail(event.target.value)} placeholder='ARnxt email' />
  <input type='password'  onChange={event=> setLoginPassword(event.target.value)} placeholder='employee id' />
  <input type="submit" value="Log In" style={{cursor:'pointer'}} />
  <div class="links">
    <a href="#">Forgot password</a>
   
  </div>
</form>
      
    </div>
  )
}

export default Login
