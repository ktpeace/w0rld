import { useRouter } from "next/router";
import { tasks } from "@/components/tasks/tasks-data";

export default function Task() {
  const router = useRouter();
  const { id } = router.query;
  const task = tasks.find((obj) => obj.id.toString() === id);

  return (
    <main className="flex flex-col items-center min-h-screen mt-20 md:mx-20 lg:mx-48 xl:mx-56 px-6 py-8 gap-2 dark:text-dark">
      <h1 className="text-2xl">{task ? task.name : "Task not found"}</h1>
      <p>{task?.desc}</p>
      <p>Group: {task?.group}</p>
      <p>Status: {task?.status}</p>
      <p>Points: {task?.points}</p>
      <p>In Progress: {task?.inProgress}</p>
      <p>Completed: {task?.completed}</p>
      <p>Minimum Players: {task?.minPlayers}</p>
      <p>Maximum Players: {task?.maxPlayers}</p>
    </main>
  );
}
