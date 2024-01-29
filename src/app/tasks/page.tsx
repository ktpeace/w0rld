import Link from "next/link";
import Image from "next/image";
import dummyTasks from "@/api/dummyTasks";
import { Task } from "@/types";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type CardProps = {
  task: Task;
};

const Card = ({ task }: CardProps) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="w-full p-4 flex justify-between gap-4 cursor-pointer rounded-lg border border-transparent dark:text-parchment-100 bg-white dark:bg-perse-100 hover:border-gray-400 dark:border-perse-50 dark:hover:bg-perse-400"
    >
      {/* Image */}
      <div className="mx-auto max-w-48 hidden md:block">
        <Image
          src={task.image_path || ""}
          alt={task.name}
          layout="responsive"
          width={16}
          height={24}
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="w-full flex items-center gap-2">
              {/* Image */}
              <div className="max-w-12 block md:hidden">
                <Image
                  src={task.image_path || ""}
                  alt={task.name}
                  layout="responsive"
                  width={16}
                  height={24}
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              {/* Name & Status */}
              <h2 className="text-lg font-bold">{task.name}</h2>
            </div>
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
          <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center mb-4">
            {/* Creator & Date */}
            <div className="w-full flex items-center justify-between lg:justify-start mb-4 lg:mb-0">
              <span className="font-bold mr-2 text-sm">by {task.creator}</span>
              <span>{task.created_at}</span>
            </div>
            {/* Icons */}
            <div className="flex justify-between items-center w-full lg:w-1/2">
              <span className="font-bold text-gray-500  dark:bg-perse-100 dark:text-parchment-300">
                {task.points}P
              </span>
              <div className="px-2 flex items-center justify-center rounded-full border dark:border-parchment-300 dark:bg-parchment-300 dark:text-perse-100  font-bold text-sm text-white bg-gray-500">
                <span className="">{task.level}</span>
              </div>
              <AcademicCapIcon className="h-7 w-7 text-gray-500 dark:text-parchment-300" />
              <span className="font-bold text-gray-500 dark:text-parchment-300">
                {task.participants}人
              </span>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="w-full flex-grow bg-gray-100 dark:bg-perse-200 rounded-lg p-3 border border-gray-300 dark:border-perse-50">
          <p className="text-gray-700 dark:text-parchment-100 text-base line-clamp-3">
            {task.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function TasksPage() {
  return (
    <main className="flex flex-col items-center my-24 mx-6 md:mx-24 xl:mx-64">
      {/* Header + Search/Filter/Sort */}
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
      {/* Task Cards */}
      <section className="w-full flex flex-col items-center gap-6">
        {dummyTasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </section>
    </main>
  );
}
