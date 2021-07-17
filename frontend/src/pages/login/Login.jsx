import React, { useEffect, useState } from 'react';
import './login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LoginStart, LoginSuccess, LoginFailure } from '../../redux/actions/index';
import {BASE_URL} from '../../baseurl';

const Login = () => {

   const loginState = useSelector(state => state.loginReducer);
   const dispatch = useDispatch();

   const history = useHistory();
   const [formData, setFormData] = useState({ username: '', password: '' });
   const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }

   const onSubmit = async (e) => {
      e.preventDefault();
      dispatch(LoginStart());
      try {
         const res = await axios.post(`${BASE_URL}/auth/login`, formData);
         localStorage.setItem("user", JSON.stringify({...loginState, user: res.data, isFetching: false, error: false}));
         dispatch(LoginSuccess({ payload: res.data }));
         history.push("/");
      } catch (err) {
         dispatch(LoginFailure());
      }
   }

   useEffect(() => {
      try {
         const data = JSON.parse(localStorage.getItem("user"));
         if (data.user !== null) {
            history.push("/");
         }
      } catch (err) {
         localStorage.setItem("user", null);
      }
   }, 
   // eslint-disable-next-line
   []);

   return (
      <div className="login">
         <span className="loginTitle">Login</span>
         <form className="loginForm" onSubmit={onSubmit}>
            <label>Username</label>
            <input className="loginInput" type="text" placeholder="Enter your username.." name="username" value={formData.username} onChange={onChangeHandler} />
            <label>Password</label>
            <input className="loginInput" type="password" placeholder="Enter your password.." name="password" value={formData.password} onChange={onChangeHandler} />
            <button className="loginButton" type="submit" >Login</button>
         </form>
         <button className="loginRegisterButton">
            <Link className="link" to="/register">Register</Link>
         </button>
      </div>
   )
}

export default Login
