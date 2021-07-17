import React, { useEffect, useState } from 'react';
import './sidebar.css';
import sideBarImg from '../../assets/sidebarImg.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../baseurl';

const Sidebar = () => {
   const [cats, setCats] = useState([]);

   useEffect(() => {
      const getCats = async () => {
         const res = await axios.get(`${BASE_URL}/categories`);
         setCats(res.data);
      }
      getCats();
   }, [])
   return (
      <div className="sidebar">
         <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img className="sidebarImg" src={sideBarImg} alt="sidebar img" />
            <p>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit enim impedit recusandae expedita numquam ipsam sapiente iure beatae consectetur? Excepturi fugiat nemo ipsum fuga explicabo dolorem asperiores amet saepe nam?
            </p>
         </div>
         <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
               {cats.map(c => (
                  <Link key={c._id} className="link" to={`/?cat=${c.name}`}>
                     <li className="sidebarListItem">{c.name}</li>
                  </Link>
               ))}
            </ul>
         </div>
         <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
               <i className="sidebarIcon fab fa-facebook-square"></i>
               <i className="sidebarIcon fab fa-twitter-square"></i>
               <i className="sidebarIcon fab fa-instagram-square"></i>
               <i className="sidebarIcon fab fa-pinterest-square"></i>
            </div>
         </div>
      </div>
   )
}

export default Sidebar
