"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Message from "@/components/Message";
import Link from "next/link";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const MAX_WORDS = 3000;
  const [editorHtml, setEditorHtml] = useState("");

  // Set editorHtml on changes
  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitting content: ", editorHtml);

    // Perform your submission logic here, e.g., sending the content to a server
  };

  return (
    <div className="text-editor flex flex-col items-center mt-8 md:mx-24 xl:mx-64">
      {/* Explanation */}
      <Message text="After submission, your task will be immediately visible in the inactive 'proposed' state. Once a moderator approves your task, it will be available for adoption." />
      {/* Editor */}
      <div className="react-quill">
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          placeholder={placeholder}
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
              ["link", "image"],
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
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
