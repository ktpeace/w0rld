import Link from "next/link";
import Image from "next/image";
import { tasks } from "@/components/tasks/tasks-data";
import sloth from "../../../public/images/sloth.jpg";
import pixie from "../../../public/images/pixie-avatar.jpeg";

const Praxis = () => {
  const TaskMapper = () => {
    return (
      <>
        {tasks.map((task) => {
          return (
            <Link
              href={`/tasks/${task.id}`}
              key={task.id}
              className="flex gap-4 p-4 rounded border-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700 parent-hover:child-bg-slate-600"
            >
              <Image
                src={sloth}
                alt="sloth"
                className="w-[175px] h-[175px] rounded object-cover"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{task.name}</h4>
                    <p>{task.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      <span className="font-bold">Group:</span> {task.group}
                    </p>
                    <p>
                      <span className="font-bold">Level:</span> {task.level}
                    </p>
                    <p>
                      <span className="font-bold">Points:</span> {task.points}
                    </p>
                    <p>
                      <span className="font-bold">Completed:</span>{" "}
                      {task.completed}
                    </p>
                  </div>
                </div>
                <div className="flex p-2 gap-4 items-center justify-center rounded dark:bg-slate-700 dark:hover:bg-slate-600 child-bg-slate-600">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={pixie}
                      alt="avatar"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <h4 className="font-bold">Pixie</h4>
                  </div>
                  <div className="flex-grow">
                    <p>
                      <span className="font-bold">Completed:</span> January 15,
                      2023{" "}
                    </p>
                    <p>Some other info</p>
                  </div>
                  <div className="flex-shrink-0 w-2/3">
                    <p>
                      &quot;Wowee I can&apos;t believe I completed this thing.
                      Just think about it. There I was, a loser. And now here I
                      am, a winner. Take it from me, snoozers, livin&apos; high
                      is the only way to fly ✈️&quot;
                    </p>
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
      <main className="flex flex-col items-center min-h-screen mt-20 px-32 py-8 gap-5 dark:text-dark">
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
