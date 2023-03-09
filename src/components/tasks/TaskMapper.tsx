import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // &#xf002;
import Link from "next/link";
import SortHandler from "./SortHandler";
import {
  FilterClickHandler,
  FilterByUserStatus,
  FilterTasks,
  SearchTasks,
} from "./FilterHandlers";

interface User {
  username: string;
  level: number;
}

interface Task {
  id: number;
  name: string;
  group: string;
  status: string;
  level: number;
  points: number;
  description: string;
  inProgress: number;
  completed: number;
  minPlayers: number;
  maxPlayers: number;
}

const TaskMapper = ({
  user,
  sortedTasks,
  setSortedTasks,
  searchInput,
  setSearchInput,
  filters,
  setFilters,
  currentPage,
  setCurrentPage,
}: {
  user: User;
  sortedTasks: Task[];
  setSortedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const rowsPerPage = 17;
  let totalPages = Math.ceil(sortedTasks.length / rowsPerPage);

  // MAP TABLE BY PAGE
  const DummyDataMapper = () => {
    let sortedTasksCopy = [...sortedTasks];
    if (!user || user.level < 3)
      sortedTasksCopy = FilterByUserStatus(sortedTasksCopy);
    if (filters.length > 0)
      sortedTasksCopy = FilterTasks(sortedTasksCopy, filters);
    if (searchInput)
      sortedTasksCopy = SearchTasks(sortedTasksCopy, searchInput);
    totalPages = Math.ceil(sortedTasksCopy.length / rowsPerPage);
    const pageSlice = sortedTasksCopy.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    return pageSlice.map((task) => {
      return (
        <tr
          key={task.id}
          status={task.status}
          name={task.name}
          description={task.description}
          group={task.group}
          level={task.level}
          points={task.points}
          completed={task.completed}
        >
          <td className="max-w-0 md:max-w-sm truncate font-medium">
            <Link href={`/tasks/${task.id}`}>{task.name}</Link>
          </td>
          <td className="max-w-0 md:max-w-sm truncate">{task.description}</td>
          <td className="max-w-0 md:max-w-sm truncate">{task.group}</td>
          <td className="max-w-0 md:max-w-sm truncate text-center">
            {task.level}
          </td>
          <td className="max-w-0 md:max-w-sm truncate hidden md:table-cell text-center">
            {task.points}
          </td>
          <td className="max-w-0 md:max-w-sm truncate hidden md:table-cell text-center">
            {task.completed}
          </td>
        </tr>
      );
    });
  };

  // PAGE NUMBER BUTTONS
  const TableFooter = () => {
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex w-full justify-center gap-16">
        {allPages.map((num) => (
          <button
            key={num}
            className="border rounded min-w-[1.5em] dark:hover:bg-gray-600"
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  // MAIN JSX
  return (
    <div className="max-w-full">
      <div className="flex justify-between mb-4 gap-6">
        {/* Group Filter Selection */}
        <FontAwesomeIcon
          icon={faFilter}
          className="dark:text-dark inline-block md:hidden text-4xl"
        />
        <div className="hidden md:inline-block ">
          <h3 className="text-center mb-2">GROUP</h3>
          <ul className="flex gap-1 max-w-xl flex-wrap">
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("University of Aesthematics")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                <span>University of Aesthematics</span>
              </div>
            </li>
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("U.A. Masters Course")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                U.A. Masters Course
              </div>
            </li>
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("S.N.I.D.E.")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#660B09" }}
                ></div>
                S.N.I.D.E.
              </div>
            </li>
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("Journeymen")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                Journeymen
              </div>
            </li>
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("Analog")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                Analog
              </div>
            </li>
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("Gestalt")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                Gestalt
              </div>
            </li>
          </ul>
        </div>
        {/* Status Filter Selection */}
        <div className="hidden md:inline-block">
          <h3 className="text-center mb-2">STATUS</h3>
          <ul className="flex gap-1 max-w-xl flex-wrap">
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("Active")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                Active
              </div>
            </li>
            <li
              className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                filters.includes("Retired")
                  ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                  : ""
              }`}
            >
              <div
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
              >
                Retired
              </div>
            </li>
            {user && user.level >= 3 ? (
              <li
                className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                  filters.includes("Pretired")
                    ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                    : ""
                }`}
              >
                <div
                  onClick={(event) =>
                    FilterClickHandler(event, filters, setFilters)
                  }
                >
                  Pretired
                </div>
              </li>
            ) : null}
            {user ? (
              <li
                className={`min-w-max cursor-pointer min-w-max border rounded px-2 py-1 dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]  ${
                  filters.includes("Accepted")
                    ? "dark:bg-[#cbd5e0] dark:text-[#1a202c]"
                    : ""
                }`}
              >
                <div
                  onClick={(event) =>
                    FilterClickHandler(event, filters, setFilters)
                  }
                >
                  Accepted
                </div>
              </li>
            ) : null}
          </ul>
        </div>
        {/* Search Table */}
        <div className="self-center">
          <input
            type="search"
            id="site-search"
            name="search"
            placeholder="search"
            className="rounded w-[10rem] sm:w-full mx-4 p-2 text-[#1a202c]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {/* Add A Task */}
        <Link href="/tasks/new" className="self-center">
          <button className="border rounded p-2 font-bold dark:hover:bg-[#cbd5e0] dark:hover:text-[#1a202c]">
            NEW TASK
          </button>
        </Link>
      </div>

      <div>
        <table className="table-auto md:table-fixed w-full border rounded border-slate-500 border-separate border-spacing-x-2 sm:border-spacing-x-6 border-spacing-y-4 mb-4 w-full sm:max-w-screen-xl ">
          <thead className="dark:bg-gray-800">
            <tr>
              <th className="md:w-1/5">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Name{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th className="min-w-full md:w-1/3 cursor-pointer">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Desc{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th className="cursor-pointer md:w-1/5">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Group{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th className="cursor-pointer">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Level{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th className="hidden md:table-cell cursor-pointer">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Points{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th className="hidden md:table-cell cursor-pointer">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Done{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <DummyDataMapper />
          </tbody>
        </table>
        <div className="flex w-full justify-between">
          <TableFooter />
        </div>
      </div>
    </div>
  );
};

export default TaskMapper;
