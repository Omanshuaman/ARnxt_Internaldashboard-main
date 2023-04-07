import React, { useState } from 'react'

const adminurl='https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminroute';

const RolesAdd = () => {

    const [email, setEmail] = useState();
    const [employeeid, setEmployeeId] = useState();
    const [role, setRole] = useState();

  return (
    <div>

<form class="login"  >
  <h2>ARnxt, Admin!</h2>
  <p>Please assign roles</p>
  <input type='email' onChange={event=> setEmail(event.target.value)} placeholder='ARnxt email' />
  <input type='password'  onChange={event=> setEmployeeId(event.target.value)} placeholder='employee id' />
  

  <select className='admindropdown'  onChange={event=>setRole(event.target.value)} > 
     
             <option selected='selected' className='optroles' >Assign roles</option>
              
              <option value='admin' >admin</option>
              <option value='user' >user</option>
              <option  value= 'ql' >ql</option>

             </select>

  <input type="submit" value="Log In" style={{cursor:'pointer'}} />
  <div class="links">
    <a href="#">Forgot password</a>
   
  </div>
</form>

      
    </div>
  )
}

export default RolesAdd
