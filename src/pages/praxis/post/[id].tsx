import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import sloth from "../../../public/images/sloth.jpg";
import pixie from "../../../public/images/pixie-avatar.jpeg";
import { useRouter } from "next/router";
import { tasks } from "@/components/tasks/tasks-data";
import { group } from "console";

interface Post {
  task_name: string;
  task_description: string;
  task_image: string;
  task_level: number;
  task_points: number;
  completed_count: number;
  group_name: string;
  username: string;
  user_avatar: string;
  completion_date: string;
  post_id: number;
  post_title: string;
  post_description: string;
}

interface ErrorResponse {
  error?: string;
}

const PraxisPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState("");

  async function getPost() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/post?post_id=${id}`,
        { withCredentials: false }
      );
      setPost(response.data);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.status === 404
          ? axiosError.response?.data.error || `No post found with id ${id}`
          : "An unexpected error has occurred";
      setError(errorMessage);
    }
  }

  useEffect(() => {
    id && getPost();
  }, [id]);

  if (error) {
    console.log("error!!!");
    return <p>Error: {error}</p>;
  }

  if (!post) return <p>Loading...</p>;

  const inputDate = post.completion_date;
  const dateObject = new Date(inputDate);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <main className="flex flex-col items-center mt-20 px-12 sm:px-32 py-8 gap-5 dark:text-dark">
        <h1 className="text-2xl">{post.post_title}</h1>
        <p>
          by {post.username} on {formattedDate}
        </p>
        {/* <Image src={pixie} alt="avatar" /> */}
        <p>
          Task: {post.task_name} Level: {post.task_level} Praxis Count:{" "}
          {post.completed_count} Group: {post.group_name}
        </p>
        <p>{post.post_description}</p>
      </main>
    </div>
  );
};

export default PraxisPost;
