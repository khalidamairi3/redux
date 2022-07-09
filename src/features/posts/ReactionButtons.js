import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmojis = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "💖",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const buttonHandler = (postId, emojiKey) => {
    dispatch(reactionAdded({
      postId,
      reactionKey: emojiKey
    }))
  }
  // [['thumbsUp', '👍'], ['wow', '😲'], ...]
  const reactionButtons = Object.entries(reactionEmojis).map((entry) => {
    const emojiKey = entry[0];
    const emoji = entry[1];
    return (
      <button
        className="reactionButton"
        key={emojiKey}
        onClick={() => buttonHandler(post.id, emojiKey)}
      >
        {emoji} {post.reactions[emojiKey]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
