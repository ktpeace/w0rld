"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Message from "@/components/Message";
import Link from "next/link";
import axios from "axios";
import Error from "@/components/Error";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(1);
  const MAX_WORDS = 3000;
  const [editorHtml, setEditorHtml] = useState("");

  // Validate points input on change
  const handlePointsChange = (e: { target: { value: string } }) => {
    const value = parseInt(e.target.value, 10);
    setPoints(Number.isInteger(value) && value > 0 ? value : 1);
  };

  // Validate level input on change
  const handleLevelChange = (e: { target: { value: string } }) => {
    const value = parseInt(e.target.value, 10);
    setLevel(Number.isInteger(value) && value > 0 ? value : 1);
  };

  // Set editorHtml on change
  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Submitting content: ", editorHtml, level, points, title);
    try {
      if (!editorHtml || !level || !points || !title) {
        setError("All fields are required.");
        return;
      }
      // const userIdString = user!.id.toString();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/new`,
        {
          title: title,
          description: editorHtml,
          level: level,
          points: points,
        },
        {
          withCredentials: true,
        }
      );
      console.log("res:", res);
      const id = res.data.id;
      router.push(`/tasks/${id}`);
    } catch (err) {
      console.error(err);
      setError("Sorry, an error occurred. Please retry.");
    }
    //  setError(
    //    "Sorry, something went wrong fetching the user data. Please reload and/or pray like there's no tomorrow (mileage may vary). ⚡"
    //  );
    //    finally {
    //      setLoading(false);
    //    }
  };

  return (
    <div className="text-editor flex flex-col items-center mt-8 mx-6 md:mx-24 xl:mx-64">
      {/* Explanation */}
      <Message text="After submission, your task will be immediately visible in the inactive 'proposed' state. Once a moderator approves your task, it will be available for adoption." />
      {/* Error */}
      {error && <Error message={error} setError={setError} />}
      {/* Title*/}
      <div className="w-full mb-4 flex justify-between items-center gap-2">
        <label htmlFor="title" className="min-w-14">
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full px-2 py-1 bg-transparent border-2 rounded dark:border-gray-600"
        />
      </div>

      <div className="w-full mb-4 flex flex-row md:flex-col justify-between">
        {/* Level */}
        <div className="w-full mb-4 flex gap-2 items-center">
          <label htmlFor="level" className="min-w-14">
            Level:
          </label>
          <input
            id="level"
            type="number"
            value={level}
            onChange={handleLevelChange}
            required
            className="max-w-20 px-2 py-1 bg-transparent border-2 rounded dark:border-gray-600"
          />
        </div>
        {/* Points */}
        <div className="w-full mb-4 flex justify-end md:justify-start items-center gap-2">
          <label htmlFor="points" className="min-w-14">
            Points:
          </label>
          <input
            id="points"
            type="number"
            value={points}
            onChange={handlePointsChange}
            required
            className="max-w-20 px-2 py-1 bg-transparent border-2 rounded dark:border-gray-600"
          />
        </div>
      </div>

      {/* Editor */}
      <div className="react-quill">
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          //   placeholder={placeholder}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              //   [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link"],
            ],
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="my-8 flex justify-center gap-8">
        <Link href="/tasks">
          <button className="py-2 px-4 rounded-3xl font-bold uppercase bg-gray-300 border-gray-400 hover:bg-gray-400 hover:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800 border dark:border-gray-800 dark:hover:border-gray-900">
            Cancel
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          className="py-2 px-4 rounded-3xl font-bold uppercase bg-turquoise-50 hover:bg-turquoise-300 border-turquoise-300 hover:border-turquoise-400 dark:bg-turquoise-500 dark:hover:bg-turquoise-600 border dark:border-turquoise-600 dark:hover:border-turquoise-700"
        >
          Propose
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
