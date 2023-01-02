import React, { useState, useContext, useEffect } from "react";
import { tasks } from "../../data/tasks-data";
import { DarkModeContext } from "../../components/DarkModeContext";
import { UserContext } from "../../components/UserContext";
import DarkSwitcher from "./DarkSwitcher";
import TaskMapper from "./TaskMapper";

const Tasks = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);

  // RESET FILTERS ON LOGIN/LOGOUT (because available filters change)
  useEffect(() => {
    setFilters(() => []);
    setSearchInput(() => "");
  }, [user]);

  return (
    <div>
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
      <DarkSwitcher
        darkMode={darkMode}
        sortedTasks={sortedTasks}
        searchInput={searchInput}
        filters={filters}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Tasks;
