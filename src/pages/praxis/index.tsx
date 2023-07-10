import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import sloth from "../../../public/images/sloth.jpg";
import pixie from "../../../public/images/pixie-avatar.jpeg";

interface Praxis {
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
  post_description: string;
}

interface ErrorResponse {
  error?: string;
}

const Praxis = () => {
  const [praxes, setPraxes] = useState<Praxis[]>([]);
  const [error, setError] = useState("");

  async function getAllPraxes() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/praxes`,
        { withCredentials: false }
      );
      setPraxes(response.data.praxes);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data.error || "An unexpected error has occurred";
      setError(errorMessage);
    }
  }

  useEffect(() => {
    getAllPraxes();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!praxes) return <p>Loading...</p>;

  const TaskMapper = () => {
    return (
      <>
        {praxes.map((praxis) => {
          const inputDate = praxis.completion_date;
          const dateObject = new Date(inputDate);
          const formattedDate = dateObject.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <Link
              href={`/praxis/post/${praxis.post_id}`}
              key={praxis.post_id}
              className="flex items-center gap-4 p-4 rounded border-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700 parent-hover:child-bg-slate-600"
            >
              {/* Mobile Layout */}
              <div className="flex flex-col gap-2 lg:hidden">
                <div className="flex gap-2 pb-4 border-b">
                  <div className="mr-4 2xl:mr-0">
                    <h4 className="font-bold text-lg mt-0">
                      {praxis.task_name}
                    </h4>
                    <p className="text-sm">{praxis.task_description}</p>
                  </div>
                  <Image
                    src={sloth}
                    alt="sloth"
                    className="w-[100px] h-[100px] rounded object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 md-hidden">
                  <div className="flex gap-2">
                    <p>
                      <span className="font-bold">Group:</span>{" "}
                      {praxis.group_name}
                    </p>
                    <p>
                      <span className="font-bold">Level:</span>{" "}
                      {praxis.task_level}
                    </p>
                    <p>
                      <span className="font-bold">Points:</span>{" "}
                      {praxis.task_points}
                    </p>
                    <p>
                      <span className="font-bold">Done:</span>{" "}
                      {praxis.completed_count}
                    </p>
                  </div>
                  <div className="flex flex-col p-2 mt-2 gap-2 rounded dark:bg-slate-700 dark:hover:bg-slate-600 child-bg-slate-600">
                    <div className="flex justify-around">
                      <div className="flex flex-col items-center">
                        <Image
                          src={pixie}
                          alt="avatar"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <h4 className="font-bold">Pixie</h4>
                      </div>
                      <div>
                        <p>
                          <span className="font-bold">Fin:</span> 2023/01/15{" "}
                        </p>
                        <p>Some other info</p>
                      </div>
                    </div>
                    <div>
                      <p>{praxis.post_description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Desktop Layout */}

              <div className="hidden lg:flex gap-4">
                <Image
                  src={sloth}
                  alt="sloth"
                  className="w-[175px] h-[175px] rounded object-cover"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="mr-4 2xl:mr-0">
                      <h4 className="font-bold">{praxis.task_name}</h4>
                      <p>{praxis.task_description}</p>
                    </div>
                    <div className="flex gap-2">
                      <p>
                        <span className="font-bold">Group:</span>{" "}
                        {praxis.group_name}
                      </p>
                      <p>
                        <span className="font-bold">Level:</span>{" "}
                        {praxis.task_level}
                      </p>
                      <p>
                        <span className="font-bold">Points:</span>{" "}
                        {praxis.task_points}
                      </p>
                      <p>
                        <span className="font-bold">Completed:</span>{" "}
                        {praxis.completed_count}
                      </p>
                    </div>
                  </div>
                  <div className="flex p-2 gap-4 items-center justify-center rounded dark:bg-slate-700 dark:hover:bg-slate-600 child-bg-slate-600">
                    <div className="flex flex-col flex-shrink-0 items-center justify-center">
                      <Image
                        src={pixie}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <h4 className="font-bold">{praxis.username}</h4>
                    </div>
                    <div className="flex-grow">
                      <p>
                        <span className="font-bold">Completed:</span>{" "}
                        {formattedDate}
                      </p>
                      {/* <p>Some other info</p> */}
                    </div>
                    <div className="flex-shrink-0 w-2/3">
                      <p>{praxis.post_description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <main className="flex flex-col items-center mt-20 px-12 sm:px-32 py-8 gap-5 dark:text-dark">
        <h1 className="text-2xl">Praxis</h1>
        <p>View completed tasks.</p>
        <div className="flex flex-col gap-4">
          <TaskMapper />
        </div>
      </main>
    </div>
  );
};

export default Praxis;
