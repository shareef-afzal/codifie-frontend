import React, { useState, useRef } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './loginSignup.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate=useNavigate();
  const [usernameAvailiable,setUsernameAvailiable]=useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    institute: '',
    codeforces: '',
    leetcode: '',
    codechef: ''
  });
  let availiable;
  const handleChange =async (e) => {
    let {name,value}=e.target;
    if(name==="username"){
      value = value.replace(/\s+/g, ""); // Remove all spaces
      try{
        const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/check-username/${value}`);
        setUsernameAvailiable(res.data.availiable);
      }
      catch(err){
        console.log(err);
        setUsernameAvailiable(false);
      }
    }
    setFormData({ ...formData, [name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(usernameAvailiable===true){
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/signup`, formData, { withCredentials: true });
        if(res.data.success){
          navigate(`/users/${res.data.user.username}`);
        }
      } catch (err) {
        alert(err.message);
      }
    }
    
  };

  return (
    <div className="signup-form-container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} method='post'>
        <div className="signup-inputs ">
          <div className="signup-input ">
            <i class="fa-solid fa-user"></i>
            <input className="username" type="text" placeholder='User Name' onChange={handleChange} required name='username'value={formData.username}/>
            {usernameAvailiable===false && (<i class="fa-solid fa-exclamation"></i>)}
            {usernameAvailiable===true && (<i class="fa-solid fa-check"></i>)}
            
          </div>
          <div className="signup-input ">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" placeholder='Email Id' onChange={handleChange} required name='email'/>
          </div>
          <div className="signup-input ">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder='Password' onChange={handleChange} required name='password'/>
          </div>
          <button type='submit' className='submit'> Sing Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
