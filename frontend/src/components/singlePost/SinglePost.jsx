import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './singlePost.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../baseurl';
import { PIC_URL } from '../../baseurl';

const SinglePost = () => {
   const location = useLocation();
   const path = location.pathname.split("/")[2];
   const [post, setPost] = useState({});
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [updateMode, setUpdateMode] = useState(false);
   const PF = PIC_URL;
   let username = "";
   if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).user) {
      username = JSON.parse(localStorage.getItem("user")).user.username;
   }

   const handleDelete = async () => {
      try {
         if (window.confirm("Delete the item?")) {
            await axios.delete(`${BASE_URL}/posts/${post._id}`, { data: { username: username } });
            window.location.replace("/");
         }
      } catch (err) {
         console.log(path);
      }
   }

   const handleUpdate = async () => {
      try {
         await axios.put(`${BASE_URL}/posts/${post._id}`, {username, title, desc});
         setUpdateMode(false);
      } catch (err) {}
   }

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get(`${BASE_URL}/posts/${path}`);
         console.log(res);
         setPost(res.data);
         setTitle(res.data.title);
         setDesc(res.data.desc);
      }
      getPost();
   }, [path]);

   return (
      <div className="singlePost">
         <div className="singlePostWrapper">
            {post.photo &&
               (<img className="singlePostImg" src={PF + post.photo} alt="post banner" />)
            }
            {updateMode ? <input type="text" value={title} autoFocus className="singlePostTitleInput" onChange={(e) => setTitle(e.target.value)} /> : (
               <h1 className="singlePostTitle">
                  {title}
                  {username === post.username &&
                     <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                     </div>
                  }
               </h1>
            )}
            <div className="singlePostInfo">
               <span className="singlePostAuthor">Author:&nbsp;
                  <Link className="link" to={`/?user=${post.username}`}>
                     <b>{post.username}</b>
                  </Link>
               </span>
               <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> : (
            <p className="singlePostDesc">
               {desc}
            </p>
            )}
            { updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}
         </div>
      </div>
   )
}

export default SinglePost
