import React from 'react';
import './about.css';
import aboutImg from '../../assets/My_pic.jpg';
import { Link } from 'react-router-dom';

const about = () => {
   return (
      <div className="about">
         <div className="aboutLeft">
            <div className="aboutTitle">ABOUT ME</div>
            <div className="aboutheadline">
               Hi! I am Aditya Dev, 2021 B.Tech graduate in Software Engineering branch from Delhi Technological University (DTU).
            </div>
            <div className="aboutpara">
               I enjoy taking complex problems and turning them into simple and beautiful interface designs. I also love the logic and structure of coding and always strive to write elegant and efficient code, whether it be HTML, CSS or Java coding.

               When I'm not coding, I love to sketch and solve puzzles.
               <br />You can find me in below mentioned social media handles.
            </div>
            <div className="aboutSocial">
               <Link className="link" to={{ pathname: "https://www.facebook.com/aditya.dev.14289/" }} target="_blank"><i className="aboutSocialIcons facebook fab fa-facebook-square"></i></Link>
               <Link className="link" to={{ pathname: "https://www.instagram.com/aditya.dev.31/" }} target="_blank"><i className="aboutSocialIcons insta fab fa-instagram-square"></i></Link>
               <Link className="link" to={{ pathname: "https://www.linkedin.com/in/adityadev31/" }} target="_blank"><i className="aboutSocialIcons linkedin fab fa-linkedin"></i></Link>
               <Link className="link" to={{ pathname: "#" }} target="_blank"><i className="aboutSocialIcons twitter fab fa-twitter-square"></i></Link>
            </div>
         </div>
         <div className="aboutRight">
            <img className="aboutimg" src={aboutImg} alt="hello" />
         </div>
      </div>
   )
}

export default about;
