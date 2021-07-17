import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../../baseurl';

const Register = () => {
   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
   const [error, setError] = useState(false);

   const onChangeHandler = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
      setError(false);
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      try {
         const res = await axios.post(`${BASE_URL}/auth/register`, formData);
         res.data && window.location.replace("/login");
      } catch (err) {
         setError(true);
      }
   }

   return (
      <div className="register">
         <span className="registerTitle">Register</span>
         <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="registerInput" type="text" placeholder="Enter your username.." name="username" value={formData.username} onChange={onChangeHandler} />
            <label>Email</label>
            <input className="registerInput" type="email" placeholder="Enter your email.." name="email" value={formData.email} onChange={onChangeHandler} />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password.." name="password" value={formData.password} onChange={onChangeHandler} />
            <button className="registerButton" type="submit">Register</button>
         </form>
         <button className="registerLoginButton">
            <Link className="link" to="/login">Login</Link>
         </button>
         {error && <span style={{color:"red", marginTop: "10px"}}>Something went wrong!</span>}
      </div>
   )
}

export default Register
