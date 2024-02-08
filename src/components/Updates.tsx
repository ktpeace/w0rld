"use client";
import dummyUpdates from "@/api/dummyUpdates";
import { Praxis, Task, isPraxis, isTask } from "@/types";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import TaskCard from "./TaskCard";
import PraxisCard from "./PraxisCard";

const Updates = () => {
  return (
    <>
      {/* Header + Search/Filter/Sort */}
      <section className="flex w-full justify-between items-center mb-4 gap-4">
        <h1 className="font-bold dark:text-parchment-100">Updates</h1>
        <div className="w-full relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border-2 rounded-lg dark:bg-turquoise-600 dark:border-turquoise-500 dark:focus:outline-none dark:focus:border-turquoise-300"
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
        {dummyUpdates.map((update) => {
          console.log("update logs:", update);
          if (
            update.elementType === "new-task" &&
            isTask(update.additionalInfo)
          ) {
            return (
              <TaskCard
                key={update.id}
                task={update.additionalInfo as Task}
                color="turquoise"
              />
            );
          } else if (
            update.elementType === "praxis-post" &&
            isPraxis(update.additionalInfo)
          ) {
            return (
              <PraxisCard
                key={update.id}
                praxis={update.additionalInfo as Praxis}
              />
            );
          }
        })}
      </section>
    </>
  );
};

export default Updates;
