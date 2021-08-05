import React, { useState } from 'react';
import './write.css';
import axios from 'axios';
import { BASE_URL } from '../../baseurl';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';

const Write = () => {

   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [file, setFile] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const newPost = {
         username: JSON.parse(localStorage.getItem("user")).user.username,
         title,
         desc,
      }
      if (file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append("name", filename);
         data.append("file", file);
         newPost.photo = filename;
         try {
            await axios.post(`${BASE_URL}/upload`, data);
            console.log("file uploaded");
         } catch (err) {
            console.log("file not uploaded");
         }
      }
      try {
         const res = await axios.post(`${BASE_URL}/posts`, newPost);
         setLoading(false);
         window.location.replace('/post/' + res.data._id)
      } catch (err) {
         setLoading(false);
         console.log("not redirecting to posts");
      }
   }

   return (
      <>
         {loading && <LoadingScreen />}
         <div className="write">
            {file &&
               <img className="writeImg" src={URL.createObjectURL(file)} alt="post img" />
            }
            <form className="writeForm" onSubmit={handleSubmit}>
               <div className="writeFormGroup">
                  <label htmlFor="fileInput">
                     <i className="writeIcon fas fa-plus"></i>
                  </label>
                  <input type="file" id="fileInput" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                  <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
               </div>
               <div className="writeFormGroup">
                  <textarea placeholder="Tell your story..." type="text" className="writeInput writeText" onChange={e => setDesc(e.target.value)}></textarea>
               </div>
               <button className="writeSubmit" type="submit">Publish</button>
            </form>
         </div>
      </>
   )
}

export default Write
