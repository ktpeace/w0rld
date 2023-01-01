import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { tasks } from "../../data/tasks-data";
// import { DarkModeContext } from "../../components/DarkModeContext";
import { UserContext } from "../../components/UserContext";

// remove/apply dark mode to all elements on toggle
// control all the dark/light styles in one CSS thing
// exclude pretired/active if user <3 / null

const Tasks = () => {
  console.log("Tasks");
  // const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const rowsPerPage = 17;
  let totalPages = Math.ceil(sortedTasks.length / rowsPerPage);

  // RESET FILTERS ON LOGIN/LOGOUT (because available filters change)
  useEffect(() => {
    setFilters(() => []);
    setSearchInput(() => "");
  }, [user]);

  // SORTING 1/2 SORT DATA
  function sortTasks(value, direction) {
    value = value.toLowerCase();
    let sortedTasksCopy = [...sortedTasks];
    const isNum =
      value === "level" || value === "points" || value === "completed";
    if (direction === "↓") {
      if (isNum) {
        sortedTasksCopy.sort((a, b) => a[value] - b[value]);
      } else {
        sortedTasksCopy.sort((a, b) => a[value].localeCompare(b[value]));
      }
    } else if (direction === "↑") {
      if (isNum) {
        sortedTasksCopy.sort((a, b) => b[value] - a[value]);
      } else {
        sortedTasksCopy.sort((a, b) => b[value].localeCompare(a[value]));
      }
    } else {
      sortedTasksCopy = tasks;
    }
    setSortedTasks(sortedTasksCopy);
  }

  // SORTING 2/2 SET TABLE HEADER ARROWS
  const sortHandler = (e) => {
    const text = e.currentTarget.innerText;
    const arrow = text[text.length - 1];
    const header = text.slice(0, text.length - 2);
    const allArrows = document.getElementsByClassName("arrow");
    for (let i = 0; i < allArrows.length; i++) {
      allArrows[i].innerText = "↕";
    }
    if (arrow === "↕") {
      sortTasks(header, "↓");
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↓</span>`;
    } else if (arrow === "↓") {
      sortTasks(header, "↑");
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↑</span>`;
    } else if (arrow === "↑") {
      sortTasks(header, "↕");
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↕</span>`;
    }
  };

  // FILTERING
  // Filter Tasks
  function filterClickHandler(e) {
    const name = e.currentTarget.innerText;
    if (filters.includes(name)) {
      setFilters(filters.filter((filterName) => filterName !== name));
    } else {
      setFilters((prev) => [...prev, name]);
    }
  }

  function filterByUserStatus() {
    return sortedTasks.filter((task) => task.status !== "Pretired");
  }

  // this filter works by separating out groups + statuses so they can both apply at once
  // could make them separate filter states from the start if the separation also becomes needed elsewhere
  const filterTasks = (taskArray) => {
    const groups = [];
    const statuses = [];
    taskArray.forEach((task) => {
      if (filters.includes(task.status)) {
        statuses.push(task.status);
      } else if (filters.includes(task.group)) {
        groups.push(task.group);
      }
    });
    if (groups.length > 0 && statuses.length > 0) {
      return taskArray.filter(
        (task) => groups.includes(task.group) && statuses.includes(task.status)
      );
    } else if (groups.length > 0) {
      return taskArray.filter((task) => groups.includes(task.group));
    } else if (statuses.length > 0) {
      return taskArray.filter((task) => statuses.includes(task.status));
    } else {
      return taskArray;
    }
  };

  // Search Tasks
  function searchTasks(data) {
    return data.filter((task) => {
      return Object.values(task)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
  }

  // Add/Remove Filter "Buttons"
  const filterScraps = filters.map((name) => {
    return (
      <span
        className="filter-scrap filter-scrap-light"
        onClick={(e) => filterClickHandler(e)}
        key={name}
      >
        {name}
      </span>
    );
  });

  // MAP TABLE BY PAGE
  const DummyDataMapper = () => {
    let sortedTasksCopy = [...sortedTasks];
    if (!user || user.level < 3) sortedTasksCopy = filterByUserStatus();
    if (filters.length > 0) sortedTasksCopy = filterTasks(sortedTasks);
    if (searchInput) sortedTasksCopy = searchTasks(sortedTasksCopy);
    totalPages = Math.ceil(sortedTasksCopy.length / rowsPerPage);
    const pageSlice = sortedTasksCopy.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    return pageSlice.map((task) => {
      console.log("DummyDataMapper");
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
          className="tx-row, tr-light"
        >
          <td className="tx-name-cell">
            <Link className="tx-name" to={`/tasks/${task.id}`}>
              {task.name}
            </Link>
          </td>
          <td className="tx-desc">{task.description}</td>
          <td className="tx-group">{task.group}</td>
          <td>{task.level}</td>
          <td>{task.points}</td>
          <td>{task.completed}</td>
        </tr>
      );
    });
  };

  // PAGE NUMBER BUTTONS
  const TableFooter = () => {
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="tx-footer">
        {allPages.map((num) => (
          <button
            key={num}
            className="tx-footer-button tx-footer-button-light"
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
    <main className="task-page add">
      <div className="filter-options">
        <div className="filter-box filter-box-light filter-groups">
          <h3>Filter by Group</h3>
          <ul className="filter-list">
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#000" }}
                ></div>
                <span
                  style={{
                    textDecoration: filters.includes(
                      "University of Aesthematics"
                    )
                      ? "underline"
                      : "none",
                  }}
                >
                  University of Aesthematics
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{
                    backgroundColor: "#000",
                    border: "3px solid #BA4C00",
                  }}
                ></div>
                <span
                  style={{
                    textDecoration: filters.includes("U.A. Masters Course")
                      ? "underline"
                      : "none",
                  }}
                >
                  U.A. Masters Course
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#660B09" }}
                ></div>
                <span
                  style={{
                    textDecoration: filters.includes("S.N.I.D.E.")
                      ? "underline"
                      : "none",
                  }}
                >
                  S.N.I.D.E.
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#EAB547" }}
                ></div>
                <span
                  style={{
                    textDecoration: filters.includes("Journeymen")
                      ? "underline"
                      : "none",
                  }}
                >
                  Journeymen
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#007549" }}
                ></div>
                <span
                  style={{
                    textDecoration: filters.includes("Analog")
                      ? "underline"
                      : "none",
                  }}
                >
                  Analog
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#4D1568" }}
                ></div>
                <span
                  style={{
                    textDecoration: filters.includes("Gestalt")
                      ? "underline"
                      : "none",
                  }}
                >
                  Gestalt
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="filter-box filter-box-light filter-status">
          <h3>Filter by Status</h3>
          <ul className="filter-list">
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div className="filter-color status-filter-color"></div>
                <span
                  style={{
                    textDecoration: filters.includes("Active")
                      ? "underline"
                      : "none",
                  }}
                >
                  Active
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => filterClickHandler(e)}
              >
                <div className="filter-color status-filter-color"></div>
                <span
                  style={{
                    textDecoration: filters.includes("Retired")
                      ? "underline"
                      : "none",
                  }}
                >
                  Retired
                </span>
              </div>
            </li>
            {user && user.level >= 3 ? (
              <li className="filter-li">
                <div
                  className="filter-li-group"
                  onClick={(e) => filterClickHandler(e)}
                >
                  <div className="filter-color status-filter-color"></div>
                  <span
                    style={{
                      textDecoration: filters.includes("Pretired")
                        ? "underline"
                        : "none",
                    }}
                  >
                    Pretired
                  </span>
                </div>
              </li>
            ) : null}
            {user ? (
              <li className="filter-li">
                <div
                  className="filter-li-group"
                  onClick={(e) => filterClickHandler(e)}
                >
                  <div className="filter-color status-filter-color"></div>
                  <span
                    style={{
                      textDecoration: filters.includes("Accepted")
                        ? "underline"
                        : "none",
                    }}
                  >
                    Accepted
                  </span>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex-between space-below">
          <div className="filters">
            <div className="filter-scraps">
              {filterScraps}
              {filters.length ? (
                <span
                  className="filter-scrap filter-scrap-light"
                  onClick={() => setFilters([])}
                >
                  CLEAR ALL
                </span>
              ) : (
                <span></span>
              )}
            </div>
          </div>
          <div className="tx-search">
            <input
              type="search"
              id="site-search"
              name="search"
              placeholder="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <table className="tx-list">
          <thead>
            <tr className="tx-head-col">
              <th width="150px">
                <div onClick={sortHandler}>
                  Name{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="400px">
                <div onClick={sortHandler}>
                  Description{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="150px">
                <div onClick={sortHandler}>
                  Group{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="100px">
                <div onClick={sortHandler}>
                  Level{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="100px">
                <div onClick={sortHandler}>
                  Points{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="100px">
                <div onClick={sortHandler}>
                  Completed{" "}
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
        <div className="tx-navlinks">
          <TableFooter />
        </div>
      </div>
    </main>
  );
};

export default Tasks;
