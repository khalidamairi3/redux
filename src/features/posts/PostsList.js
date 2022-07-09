import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostDesc from "./PostDesc";
import { selectPosts } from "./postsSlice";
import { fetchPosts } from "./postsSlice";
import { Link } from "react-router-dom";



function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const sortedPosts = [...posts].sort((post1, post2) => post2.date.localeCompare(post1.date));
  
  useEffect(() => {
   if(posts.length ===0 || posts.length===3)  dispatch(fetchPosts()); // make the api call to fetch posts when there is no posts or only initial posts
  }, [dispatch]);

  return (
    <div> 
         <Link to="/add-post"> Add post</Link>
         {sortedPosts.map((post) => <PostDesc key={post.id} post={post} />)}
    </div>
    
  ) ;
}

export default PostsList;
