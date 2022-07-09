import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../users/usersSlice";
import { addPost } from "./postsSlice";
import { useNavigate } from "react-router-dom";
// rfce

function AddPostForm() {
  const [title, setTitle] = useState(""); // local state (temporary state)
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const users = useSelector(selectUsers);
  const navigate = useNavigate();


  const canSave = title && content && authorId;

  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const onContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  const onAuthorChange = (e) => {
    const newAuthorId = e.target.value;
    setAuthorId(newAuthorId);
  };

  const onSavePost = (e) => {
    e.preventDefault();
    // dispatch the action to add a new post
    // call dispatch with the action creator and provide the payload to the action creator
    dispatch(addPost(title, content, parseInt(authorId)));
    // reset the local state of the form
    setTitle("");
    setContent("");
    setAuthorId("");
    // navigate to the /posts route
    navigate("/posts")
  };

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });
  // <>
  //    <option key="1" vale="1">Greg</option>
  //    <option key="2" vale="2">Monika</option>
  //    <option key="3" vale="3">Alex</option>
  //    <option key="4" vale="4">Michelle</option>
  // </>

  return (
    <section>
      <h2>Add New Post</h2>
      <form onSubmit={onSavePost}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={authorId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <button disabled={!canSave}>Save Post</button>
      </form>
    </section>
  );
}

export default AddPostForm;
