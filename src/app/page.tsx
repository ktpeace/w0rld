import dummyTasks from "@/api/dummyTasks";
import RegistrationForm from "@/components/RegistrationForm";
import { Task } from "@/types";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import worldBg from "../../public/worldw0rld.webp";

type CardProps = {
  task: Task;
};

const Card = ({ task }: CardProps) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="w-full mx-auto p-4 flex flex-col justify-between leading-normal cursor-pointer rounded-lg border border-transparent dark:text-parchment-100 bg-white dark:bg-teal-600 hover:border-gray-400 dark:border-teal-400 dark:hover:bg-teal-500 dark:hover:border-teal-300"
    >
      {/* Name & Status */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{task.name}</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* Creator & Date */}
        <div className="flex justify-between items-center">
          <span className="font-bold mr-2 text-sm">by {task.creator}</span>
          <span>{task.created_at}</span>
        </div>
        {/* Icons */}
        <div className="flex justify-between items-center gap-4  w-1/4">
          <span className="font-bold px-1 text-gray-500 dark:bg-perse-100 dark:text-parchment-300">
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
      {/* Description */}
      <div className="bg-gray-100 dark:bg-teal-400 rounded-lg p-3 border border-gray-300 dark:border-teal-500">
        <p className="text-gray-700 dark:text-parchment-100 text-base line-clamp-3">
          {task.description}
        </p>
      </div>
    </Link>
  );
};

export default function Home() {
  const isUser = false;
  return (
    <main className="flex flex-col items-center my-24 mx-3 md:mx-64">
      {/* Background image */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <Image
          src={worldBg}
          alt="Background image of fantasy world"
          quality={100}
          fill
          sizes="100vw"
          className="opacity-30 object-cover"
        />
      </div>
      {/* Signup box if no signed in user */}
      {!isUser && (
        <section className="mb-6 flex flex-col p-6 justify-between bg-gradient-to-r from-[rgba(0,151,178,0.6)] via-[rgba(82,140,65,0.6)] to-[rgba(82,140,65,0.6)]">
          <div className="text-white text-xl font-medium">
            <p className="mb-4">
              <strong>
                W<span className="text-2xl">O</span>RLD ZER
                <span className="text-2xl">O</span>
              </strong>{" "}
              is a free game played worldwide by doing tasks in real life and
              sharing them with fellow players for points and glory.
            </p>
            <p className="text-xl">Begin your journey?</p>
          </div>
          <div className="flex justify-end items-end">
            <button
              type="submit"
              className="px-5 py-1 rounded-full bg-teal-500 hover:bg-teal-400 focus:ring-4 focus:outline-none focus:ring-teal-300 text-white  text-center text-xl font-semibold uppercase"
            >
              Sign Up
            </button>
          </div>
        </section>
      )}
      {/* Header + Search/Filter/Sort */}
      <section className="flex w-full justify-between items-center mb-4 gap-4">
        <h1 className="font-bold dark:text-parchment-100">Updates</h1>
        <div className="w-full relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border-2 rounded-lg dark:bg-teal-600 dark:border-teal-500 dark:focus:outline-none dark:focus:border-teal-300"
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
      {/* Update Cards */}
      <section className="w-full flex flex-col items-center gap-6">
        {dummyTasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </section>
    </main>
  );
}
