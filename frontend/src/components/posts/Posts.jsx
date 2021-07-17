import React from 'react';
import './posts.css';
import Post from '../post/Post';

const Posts = ({allPosts}) => {
   return (
      <div className="posts">
         {allPosts.map(p=>(
            <Post key={p._id} individualPost={p} />
         ))}
      </div>
   )
}

export default Posts
