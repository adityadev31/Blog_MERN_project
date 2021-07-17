import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './home.css';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {BASE_URL} from '../../baseurl';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const { search } = useLocation();

   useEffect(()=>{
      const fetchPosts = async () =>{
         const res = await axios.get(`${BASE_URL}/posts/${search}`);
         setPosts(res.data);
      }
      fetchPosts();
   },[search]);

   return (
      <>
         <Header />
         <div className="home">
            <Posts allPosts={posts} />
            <Sidebar />
         </div>
      </>
   )
}

export default Home
