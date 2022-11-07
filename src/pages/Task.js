import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import sloth from "../images/sloth.jpg";

const Task = () => {
  const taskName = "The Odyssey";
  const minPlayers = 1;
  const maxPlayers = 10;
  const pointReward = 250;
  const level = 6;
  const zone = "BART Psychogeographical Association";
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const saveHandler = (event) => {
    event.preventDefault();
    console.log(value);
    alert("Draft saved.");
    return navigate("/tasks");
  };

  const previewHandler = () => {
    console.log(value);
    return navigate("/preview/1");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(value);
    alert("Task updated.");
    return navigate("/tasks");
  };

  const dropHandler = () => {
    alert("Are you sure you wish to drop this task?");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <main className="center-page task-page add">
      <h1>Task: {taskName}</h1>
      <section className="task-details">
        <p className="instructions">
          <span className="instructions-word">Instructions:</span> Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Distinctio, alias
          doloremque, repellendus fugit similique, delectus animi possimus
          fugiat neque dolores enim fuga odio earum! Praesentium tenetur
          voluptate similique deserunt veritatis.
        </p>
        <img src={sloth} alt="sloth" className="single-task-image" />
        <div className="task-stats">
          <span>
            {minPlayers} to {maxPlayers} players
          </span>
          <span>{pointReward} points</span>
          <span>Level {level}</span>
          <span>Zone: {zone}</span>
        </div>
      </section>
      <h2>Edit Task</h2>
      <ReactQuill
        className="task-editor"
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
      ></ReactQuill>
      <br />
      <div className="task-editor-buttons">
        <button className="task-editor-button" onClick={saveHandler}>
          SAVE DRAFT
        </button>
        <button className="task-editor-button" onClick={previewHandler}>
          PREVIEW
        </button>
        <button className="task-editor-button" onClick={submitHandler}>
          SUBMIT
        </button>
        <button className="task-editor-button drop-task" onClick={dropHandler}>
          DROP TASK
        </button>
      </div>
    </main>
  );
};

export default Task;
