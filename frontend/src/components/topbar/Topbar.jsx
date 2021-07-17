import React, { useEffect } from 'react';
import './Topbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions';
import { PIC_URL } from '../../baseurl';

const Topbar = () => {
   const loginState = useSelector(state => state.loginReducer);
   const dispatch = useDispatch();
   const PF = PIC_URL;
   const { user } = loginState;

   const handleLogout = () => {
      localStorage.removeItem("user");
      dispatch(Logout());
   }

   useEffect(() => {
   }, []);

   return (
      <div className="top">
         <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
         </div>
         <div className="topCenter">
            <ul className="topList">
               <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
               <li className="topListItem"><Link className="link" to="/about">ABOUT</Link></li>
               <li className="topListItem"><Link className="link" to="/contact">CONTACT</Link></li>
               <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
               <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
         </div>
         <div className="topRight">
            {user ? (<Link to = "/settings">
               <img className="topImg" src={PF + JSON.parse(localStorage.getItem("user")).user.profilePic} alt="avatar img" />
            </Link>
            ) : (
               <ul className="topList">
                  <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
                  <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>
               </ul>
            )}
            <i className="searchIcon fas fa-search"></i>
         </div>
      </div>
   )
}

export default Topbar
