import React, { useEffect, useState } from 'react';
import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import {BASE_URL} from '../../baseurl';
import { PIC_URL } from '../../baseurl';

function Settings() {

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [userProfilePic, setUserProfilePic] = useState(null);
   const [file, setFile] = useState(null);
   const [success, setSuccess] = useState(false);
   const { user } = JSON.parse(localStorage.getItem("user"));
   const PF = PIC_URL;

   const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedData = { userId: user._id, username, email, password };
      if(file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append("name",filename);
         data.append("file",file);
         updatedData.profilePic = filename;
         try {
            await axios.post(`${BASE_URL}/upload`, data);
         } catch (err) {}
      }
      try {
         await axios.put(`${BASE_URL}/users/${user._id}`, updatedData);
         setSuccess(true);
         localStorage.setItem("user", null);
         window.alert("user updated successfully.. please login again");
         window.location.replace("/login");
      } catch (err) {}
   }

   useEffect(() => {
      setUsername(user.username);
      setPassword(user.password);
      setEmail(user.email);
      if(user.profilePic !== null) {
         setUserProfilePic(PF + user.profilePic);
      }
   }, 
   // eslint-disable-next-line
   []);

   return (
      <div className="settings">
         <div className="settingsWrapper">
            <div className="settingsTitle">
               <span className="settingsUpdateTitle">Update Your Account</span>
               <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
               <label>Profile Picture</label>
               <div className="settingsPP">
                  {userProfilePic && !file && <img src={userProfilePic} alt="profile pic" />}
                  {file && <img src={URL.createObjectURL(file)} alt="profile pic" />}
                  <label htmlFor="fileInput">
                     <i className="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])} />
               </div>
               <label>Username</label>
               <input type="text" value={username} onChange={e => {setUsername(e.target.value); setSuccess(false);}} />
               <label>Email</label>
               <input type="email" value={email} onChange={e => {setEmail(e.target.value); setSuccess(false);}} />
               <label>Password</label>
               <input type="text" value={password} onChange={e => {setPassword(e.target.value); setSuccess(false);}} />
               <button className="settingsSubmit" type="submit">Update</button>
               {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated...</span>}
            </form>
         </div>
         <Sidebar />
      </div>
   )
}

export default Settings
