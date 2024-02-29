"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import "react-quill/dist/quill.snow.css";
// import Message from "@/components/Message";

import Error from "@/components/Error";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PraxisPost = () => {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const MAX_WORDS = 3000;
  const [editorHtml, setEditorHtml] = useState("");

  // Set editorHtml on change
  const handleChange = (html: string) => {
    error && setError("");
    setEditorHtml(html);
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Submitting content: ", editorHtml, title);
    try {
      if (!editorHtml || !title) {
        setError("Both fields are required.");
        return;
      }
      // const userIdString = user!.id.toString();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/praxis`,
        {
          taskId,
          title,
          description: editorHtml,
        },
        {
          withCredentials: true,
        }
      );
      console.log("res:", data);
      router.push(`/praxes/${data}`);
    } catch (err) {
      console.error(err);
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 409) {
        setError("It seems you've already got a praxis for this task!");
      } else {
        setError("Sorry, an error occurred. Please retry.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="mt-36 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-perse-50 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="text-editor flex flex-col items-center mt-8 mx-6 md:mx-24 xl:mx-64">
      {/* Explanation */}
      <h2>Praxis for Task {taskId}</h2>
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
          Praxify
        </button>
      </div>
    </div>
  );
};

export default PraxisPost;
