import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { tasks } from "../../data/tasks-data";
// import { DarkModeContext } from "../../components/DarkModeContext";
// import { UserContext } from "../../components/UserContext";

// remove/apply dark mode to all elements on toggle
// control all the dark/light styles in one CSS thing
// search
// filter by group
// filter by status
// filter by search text
// remove filters on logout
// clear all filters on clear click

// STATUS: Table doesn't use searchedTasks data
// Work out the entire logic around sorted/searched/filtered

const Tasks = () => {
  console.log("Tasks");
  // const { darkMode } = useContext(DarkModeContext);
  // const { user } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState([1]);
  const [searchInput, setSearchInput] = useState("");
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [sortedTasks, setSortedTasks] = useState(currentTasks);
  // const [filteredTasks, setFilteredTasks] = useState(currentTasks);
  const [searchedTasks, setSearchedTasks] = useState(currentTasks);
  const rowsPerPage = 19;
  const totalPages = Math.ceil(currentTasks.length / rowsPerPage);
  let pageSlice = currentTasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // SEARCHING
  function searchHandler(e) {
    setSearchInput(e.target.value);
    if (searchInput) {
      setSearchedTasks((prev) =>
        prev.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        })
      );
    }
  }

  // SORTING 1/2 DATA SORTING
  // if all filters/sorts/searches are in one spot how to revert just one
  function sortTasks(value, direction) {
    value = value.toLowerCase();
    let currentTasksCopy = [...currentTasks];
    const isNum =
      value === "level" || value === "points" || value === "completed";
    if (direction === "↓") {
      if (isNum) {
        currentTasksCopy.sort((a, b) => a[value] - b[value]);
      } else {
        currentTasksCopy.sort((a, b) => a[value].localeCompare(b[value]));
      }
    } else if (direction === "↑") {
      if (isNum) {
        currentTasksCopy.sort((a, b) => b[value] - a[value]);
      } else {
        currentTasksCopy.sort((a, b) => b[value].localeCompare(a[value]));
      }
    } else {
      // the below needs to revert to searched + filtered tasks
      currentTasksCopy = tasks;
    }
    setSortedTasks(currentTasksCopy);
    setCurrentTasks(currentTasksCopy);
  }

  // SORTING 2/2 SETTING ARROWS
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

  // PAGINATION 1/2 TABLE MAPPING
  const DummyDataMapper = () =>
    pageSlice.map((task) => {
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

  // PAGINATION 2/2 PAGE NUMBER BUTTONS
  const TableFooter = () => {
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="tx-footer">
        {allPages.map((num, index) => (
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

  function placeholderFunction() {}

  // MAIN JSX
  return (
    <main className="task-page add">
      <div className="filter-options">
        <div className="filter-box filter-box-light filter-groups">
          <h3>Filter by Group</h3>
          <ul className="filter-list">
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#000" }}
                ></div>
                <span>University of Aesthematics</span>
              </div>
            </li>
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div
                  className="filter-color"
                  style={{
                    backgroundColor: "#000",
                    border: "3px solid #BA4C00",
                  }}
                ></div>
                <span>U.A. Masters Course</span>
              </div>
            </li>
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#660B09" }}
                ></div>
                <span>S.N.I.D.E.</span>
              </div>
            </li>
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#EAB547" }}
                ></div>
                <span>Journeymen</span>
              </div>
            </li>
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#007549" }}
                ></div>
                <span>Analog</span>
              </div>
            </li>
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#4D1568" }}
                ></div>
                <span>Gestalt</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="filter-box filter-box-light filter-status">
          <h3>Filter by Status</h3>
          <ul className="filter-list">
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div className="filter-color status-filter-color"></div>
                <span>Active</span>
              </div>
            </li>
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div className="filter-color status-filter-color"></div>
                <span>Retired</span>
              </div>
            </li>
            {/* {isLoggedIn && userLevel >= 3 ? ( */}
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div className="filter-color status-filter-color"></div>
                <span>Pretired</span>
              </div>
            </li>
            {/* ) : null} */}
            {/* {isLoggedIn ? ( */}
            <li className="filter-li">
              <div className="filter-li-group" onClick={placeholderFunction}>
                <div className="filter-color status-filter-color"></div>
                <span>Accepted</span>
              </div>
            </li>
            {/* ) : null} */}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex-between space-below">
          <div className="filters">
            <div className="filter-scraps"></div>
          </div>
          <div className="tx-search">
            <input
              type="search"
              id="site-search"
              name="search"
              placeholder="search"
              onChange={(e) => searchHandler(e)}
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
