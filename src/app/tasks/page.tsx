import dummyTasks from "@/api/dummyTasks";
import { Task } from "@/types";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

type CardProps = {
  task: Task;
};

const Card = ({ task }: CardProps) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="w-full mx-auto p-4 flex flex-col justify-between leading-normal cursor-pointer rounded-lg border border-transparent dark:text-parchment-100 bg-white dark:bg-perse-100 hover:border-gray-400 dark:border-perse-50 dark:hover:bg-perse-400"
    >
      {/* Name & Status */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{task.name}</h2>
        <span
          className={`rounded ${
            task.status === "active"
              ? "dark:bg-lime-920 bg-green-300"
              : task.status === "retired"
              ? "dark:bg-gray-900 bg-gray-400"
              : "dark:bg-gray-700 bg-gray-200"
          } dark:text-parchment-100 px-2 py-1 text-xs font-semibold uppercase`}
        >
          {task.status}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* Creator & Date */}
        <div className="flex justify-between items-center">
          <span className="font-bold mr-2 text-sm">by {task.creator}</span>
          <span>{task.created_at}</span>
        </div>
        {/* Icons */}
        <div className="flex justify-between items-center gap-4  w-1/4">
          <span className="font-bold px-1 dark:bg-perse-100 dark:text-parchment-300">
            {task.points}P
          </span>
          <div className="flex items-center justify-center rounded-full border dark:border-parchment-300 dark:bg-parchment-300 dark:text-perse-100 px-2">
            <span className="font-bold text-sm">{task.level}</span>
          </div>
          <AcademicCapIcon className="h-7 w-7 text-gray-500 dark:text-parchment-300" />
          <span className="font-bold">{task.participants}人</span>
        </div>
      </div>
      {/* Description */}
      <div className="bg-gray-100 dark:bg-perse-200  rounded-lg p-3 border border-gray-300 dark:border-perse-50">
        <p className="text-gray-700 dark:text-parchment-100 text-base line-clamp-3">
          {task.description}
        </p>
      </div>
    </Link>
  );
};

export default function TasksPage() {
  return (
    <main className="flex flex-col items-center my-24 mx-3 md:mx-56">
      <section className="flex w-full justify-between items-center mb-4 gap-4">
        <h1 className="font-bold dark:text-gray-400">Tasks</h1>
        <div className="w-full relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border-2 rounded-lg dark:bg-smoke-50 dark:border-dusk-800 dark:focus:outline-none dark:focus:border-dusk-600"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 pr-12 flex items-center">
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-6">
        {dummyTasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </section>
    </main>
  );
}
