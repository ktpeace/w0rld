import React from "react";
import { Link } from "react-router-dom";
import SortHandler from "./SortHandler";
import {
  FilterClickHandler,
  FilterScraps,
  FilterByUserStatus,
  FilterTasks,
  SearchTasks,
} from "./FilterHandlers";

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
}) => {
  const rowsPerPage = 17;
  let totalPages = Math.ceil(sortedTasks.length / rowsPerPage);

  // MAP TABLE BY PAGE
  const DummyDataMapper = () => {
    let sortedTasksCopy = [...sortedTasks];
    if (!user || user.level < 3)
      sortedTasksCopy = FilterByUserStatus(sortedTasks);
    if (filters.length > 0) sortedTasksCopy = FilterTasks(sortedTasks, filters);
    if (searchInput)
      sortedTasksCopy = SearchTasks(sortedTasksCopy, searchInput);
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                onClick={(event) =>
                  FilterClickHandler(event, filters, setFilters)
                }
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
                  onClick={(event) =>
                    FilterClickHandler(event, filters, setFilters)
                  }
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
                  onClick={(event) =>
                    FilterClickHandler(event, filters, setFilters)
                  }
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
              <FilterScraps filters={filters} setFilters={setFilters} />
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
            <tr className="tx-head-col updates-text-light">
              <th width="150px">
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
              <th width="400px">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
                  Description{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="150px">
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
              <th width="100px">
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
              <th width="100px">
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
              <th width="100px">
                <div
                  onClick={(event) => {
                    SortHandler(event, sortedTasks, setSortedTasks);
                  }}
                >
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

export default TaskMapper;
