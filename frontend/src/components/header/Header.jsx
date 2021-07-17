import React from 'react';
import './Header.css';
import headerImg from '../../assets/headerImg.jpg';

const Header = () => {
   return (
      <div className="header">
         <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>
         </div>
         <img className="headerImg" src={ headerImg } alt="header img" />
      </div>
   )
}

export default Header
