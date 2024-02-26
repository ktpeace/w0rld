"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Message from "@/components/Message";
import Link from "next/link";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState("");

  // Set editorHtml on changes
  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here, editorHtml contains the HTML content of the editor, including any images
    console.log("Submitting content: ", editorHtml);

    // Perform your submission logic here, e.g., sending the content to a server
    // If you need to process images (e.g., extracting URLs, uploading base64 images), do it in this step
  };

  return (
    <div className="text-editor flex flex-col items-center mt-8 md:mx-24 xl:mx-64">
      {/* Explanation */}
      <Message text="After submission, your task will be immediately visible in the inactive 'proposed' state. Once a moderator approves your task, it will be available for adoption." />

      {/* Editor */}
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
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        }}
      />

      {/* Action buttons */}
      <div className="mt-8 flex justify-center gap-8">
        <Link href="/tasks">
          <button className="bg-gray-700 hover:bg-gray-800 border border-gray-800 hover:border-gray-900 font-bold py-2 px-4 rounded-3xl uppercase">
            Cancel
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          className="bg-turquoise-500 hover:bg-turquoise-600 border border-turquoise-600 hover:border-turquoise-700 font-bold py-2 px-4 rounded-3xl uppercase"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
