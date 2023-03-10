import { useState, useContext, useEffect } from "react";
import { tasks } from "../../components/tasks/tasks-data";
// import { UserContext } from "../../components/UserContext";
import TaskMapper from "../../components/tasks/TaskMapper";

const Tasks = () => {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const { user } = useContext(UserContext);
  const user = { username: "Pixie", level: 3 };

  // RESET FILTERS ON LOGIN/LOGOUT (because available filters change)
  // useEffect(() => {
  //   setFilters(() => []);
  //   setSearchInput(() => "");
  // }, [user]);

  return (
    <main className="flex flex-col items-center min-h-screen mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Tasks</h1>
      <p>
        Still some things to work out with design, responsiveness, and filter
        logic (if you click filter when not on page 1, must click page 1 to see
        results).
      </p>
      <TaskMapper
        user={user}
        sortedTasks={sortedTasks}
        setSortedTasks={setSortedTasks}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        filters={filters}
        setFilters={setFilters}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

export default Tasks;
