import React from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import { PIC_URL } from '../../baseurl';

const Post = ({individualPost}) => {
   const thisPost = individualPost;
   const PF = PIC_URL;
   return (
      <div className="post">
         { thisPost.photo && 
            (<img className="postImg" src={ PF + thisPost.photo } alt="post banner" />)
         } 
         <div className="postInfo">
            <div className="postCats">
               { thisPost.categories.map(cat => (<span className="postCat">{ cat.name }</span>)) }
            </div>
            <Link className="link" to={`/post/${thisPost._id}`}>
               <span className="postTitle">{ thisPost.title }</span>
            </Link>
            <hr />
            <span className="postDate">{ new Date(thisPost.createdAt).toDateString() }</span>
         </div>
         <div className="postDesc">{ thisPost.desc }</div>
      </div>
   )
}

export default Post
