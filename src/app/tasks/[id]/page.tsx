"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskById } from "@/types";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import ModalConfirm from "@/components/ModalConfirm";

// {
//     "id": 258,
//     "name": "test",
//     "description": "<p>test</p>",
//     "level": 1,
//     "points": 1,
//     "createdAt": "2024-02-26T22:40:30.000Z",
//     "creatorUserId": 60,
//     "imagePath": null,
//     "status": "pretired",
//     "participantsCount": 0,
//     "creator": {
//         "username": "kattest03",
//         "imagePath": null
//     },
//     "groups": []
// }

const TaskPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [task, setTask] = useState<Partial<TaskById>>({});
  const [userTaskStatus, setUserTaskStatus] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Set task object
  useEffect(() => {
    const taskId = params.id;

    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`
        );
        setTask(data);
        console.log("data:", data);
      } catch (err) {
        console.error(err);
        setError("");
      } finally {
        setLoading(false);
      }
    };

    taskId && fetchTask();
  }, [params]);

  // Set user task status
  useEffect(() => {
    const userId = user?.id;
    const taskId = params.id;

    async function fetchUserTaskStatus() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/task`,
          {
            params: {
              userId,
              taskId,
            },
          }
        );
        setUserTaskStatus(data.status);
      } catch (err) {
        console.error(err);
      }
    }

    userId && taskId && fetchUserTaskStatus();
  }, [user]);

  // Add task
  const handleAdopt = async () => {
    const taskId = params.id;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/task/add`,
        { taskId: taskId },
        { withCredentials: true }
      );
      setUserTaskStatus("started");
      console.log("adopted", res);
    } catch (err) {
      console.error(err);
    }
  };

  // Complete task
  const handleComplete = async () => {
    try {
      setLoading(true);
      router.push("/praxes/new");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Abandon task
  const handleAbandon = async () => {
    const taskId = params.id;

    try {
      setLoading(true);
      setConfirmDeleteOpen(false);

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/task/remove?taskId=${taskId}`,
        {
          withCredentials: true,
        }
      );

      setUserTaskStatus("unstarted");
      console.log("abandoned", res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <div
          className="mt-36 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-perse-50 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center my-24 mx-6 md:mx-24 xl:mx-64">
        <div className="w-full p-8 flex flex-col items-center rounded border-2">
          <div className="w-full flex justify-end">
            {userTaskStatus === "unstarted" && (
              <button className="p-1 border rounded" onClick={handleAdopt}>
                Adopt
              </button>
            )}
            {userTaskStatus === "started" && (
              <>
                <button
                  className="p-1 border rounded"
                  onClick={() => setConfirmDeleteOpen(true)}
                >
                  Abandon
                </button>
                <button className="p-1 border rounded" onClick={handleComplete}>
                  Complete
                </button>
              </>
            )}
            {userTaskStatus === "completed" && (
              <button className="p-1 border rounded">Completed!</button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">{task.name}</h1> by{" "}
            <Link href={`/users/${task.creatorUserId}`}>
              {task.creator?.username}
            </Link>
          </div>
          <div className="flex gap-2">
            <div>Status: {task.status}</div>
            <div>Level: {task.level}</div>
            <div>Points: {task.points}</div>
            <div>Participants: {task.participantsCount}</div>
          </div>
          <div className="flex items-center gap-2">
            Groups:{" "}
            {task.groups?.map((group) => (
              <span key={group.id}>{group.name}</span>
            ))}
          </div>
          <div>Description: {task.description}</div>
        </div>
      </div>
      {confirmDeleteOpen && (
        <ModalConfirm
          text="Are you sure you want to abandon this task?"
          onConfirm={handleAbandon}
          onCancel={() => setConfirmDeleteOpen(false)}
        />
      )}
    </>
  );
};

export default TaskPage;

// {
//     "id": 258,
//     "name": "test",
//     "description": "<p>test</p>",
//     "level": 1,
//     "points": 1,
//     "createdAt": "2024-02-26T22:40:30.000Z",
//     "creatorUserId": 60,
//     "imagePath": null,
//     "status": "pretired",
//     "participantsCount": 0,
//     "creator": {
//         "username": "kattest03",
//         "imagePath": null
//     },
//     "groups": []
// }
