import React from "react";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostDesc = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>
        {/* Author */}
        <PostAuthor userId={post.userId} />
        {/* Date Stamp */}
        <TimeAgo timestamp={post.date} />
      </p>
      {/* Reaction icons */}
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostDesc;
