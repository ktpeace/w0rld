import Link from "next/link";
import Image from "next/image";
import { Task } from "@/types";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

type CardProps = {
  task: Task;
};

const TaskCard = ({ task }: CardProps) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="w-full p-4 flex justify-between gap-4 cursor-pointer rounded-lg border border-transparent dark:text-parchment-100 bg-white dark:bg-perse-100 hover:border-gray-400 dark:border-perse-50 dark:hover:bg-perse-400"
    >
      {/* Image Desktop */}
      <div className="mx-auto max-w-48 hidden md:block">
        <Image
          src={
            task.imagePath ||
            "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg"
          }
          alt={task.name}
          sizes="100vw"
          width={16}
          height={24}
          className="w-full h-auto rounded object-cover"
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="w-full flex items-center gap-2">
              {/* Image Mobile */}
              <div className="max-w-12 block md:hidden">
                <Image
                  src={
                    task.imagePath ||
                    "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg"
                  }
                  alt={task.name}
                  sizes="100vw"
                  width={16}
                  height={24}
                  className="w-full h-auto rounded object-cover"
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
                <span className="">L{task.level}</span>
              </div>
              <AcademicCapIcon className="h-7 w-7 text-gray-500 dark:text-parchment-300" />
              <span className="font-bold text-gray-500 dark:text-parchment-300">
                {task.participantsCount}人
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

export default TaskCard;
