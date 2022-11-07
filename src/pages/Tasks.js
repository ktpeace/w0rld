// todo
// on click on a column, sort table by that column
// filter options: group, & active/retired/pretired
// selected filters with X's at top are on bg of ripped paper, maybe with typewriter-style font
// useState of logged in & level to check whether can sort by active/retired
// grey or color task on hover
// make overflow be on 'next'
// colors beside groups to be round and look like gems in glass buttons (use images marbled/gem stuff not colors)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tasks } from "../data/tasks-data";
import { groups } from "../data/groups-data";
import pixie from "../images/pixie-avatar.jpeg";

const Tasks = () => {
  const [groupFilter, setGroupFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [searchClicked, setSearchClicked] = useState(false);

  const dummyDataMapper = tasks.map((task) => {
    return (
      <tr
        status={task.status}
        name={task.name}
        desc={task.desc}
        group={task.group}
        level={task.level}
        points={task.points}
        completed={task.completed}
      >
        <td className="tx-name-cell">
          <Link className="tx-name" to="/tasks/1">
            {task.name}
          </Link>
        </td>
        <td className="tx-desc">{task.desc}</td>
        <td className="tx-group">{task.group}</td>
        <td>{task.level}</td>
        <td>{task.points}</td>
        <td>{task.completed}</td>
      </tr>
    );
  });

  const groupFilterHandler = (e) => {
    const name = e.currentTarget.innerText;
    if (groupFilter.includes(name)) {
      setGroupFilter(groupFilter.filter((groupName) => groupName !== name));
    } else {
      setGroupFilter((prev) => [...prev, name]);
    }
  };

  const filterItems = groupFilter.map((name) => {
    return (
      <span className="filter-scrap" onClick={(e) => groupFilterHandler(e)}>
        {name}
      </span>
    );
  });

  const filterStatusItems = statusFilter.map((name) => {
    return (
      <span className="filter-scrap" onClick={(e) => statusFilterHandler(e)}>
        {name}
      </span>
    );
  });

  // useEffect(() => {

  // }, [groupFilter]);

  // useEffect(() => {
  //   setSearchClicked(false);
  // }, [searchInput]);

  const statusFilterHandler = (e) => {
    const status = e.currentTarget.innerText;
    console.log(status);
    if (statusFilter.includes(status)) {
      setStatusFilter(
        statusFilter.filter((statusName) => statusName !== status)
      );
    } else {
      setStatusFilter((prev) => [...prev, status]);
    }
  };

  const masterFilter = dummyDataMapper.filter((item) => {
    if (groupFilter.length > 0 && statusFilter.length > 0) {
      return (
        groupFilter.includes(item.props.children[2].props.children) &&
        statusFilter.includes(item.props.status)
      );
    } else if (groupFilter.length > 0) {
      return groupFilter.includes(item.props.children[2].props.children);
    } else if (statusFilter.length > 0) {
      return statusFilter.includes(item.props.status);
    } else {
      return dummyDataMapper;
    }
  });

  const searchHandler = masterFilter.filter((item) => {
    console.log(item);
    return Object.values(item.props)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  return (
    <main className="task-page add">
      <div className="filter-options">
        <div className="filter-box filter-groups">
          <h3>Filter by Group</h3>
          <ul className="filter-list">
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => groupFilterHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#000" }}
                ></div>
                <span
                  style={{
                    textDecoration: groupFilter.includes(
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
                onClick={(e) => groupFilterHandler(e)}
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
                    textDecoration: groupFilter.includes("U.A. Masters Course")
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
                onClick={(e) => groupFilterHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#660B09" }}
                ></div>
                <span
                  style={{
                    textDecoration: groupFilter.includes("S.N.I.D.E.")
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
                onClick={(e) => groupFilterHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#EAB547" }}
                ></div>
                <span
                  style={{
                    textDecoration: groupFilter.includes("Journeymen")
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
                onClick={(e) => groupFilterHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#007549" }}
                ></div>
                <span
                  style={{
                    textDecoration: groupFilter.includes("Analog")
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
                onClick={(e) => groupFilterHandler(e)}
              >
                <div
                  className="filter-color"
                  style={{ backgroundColor: "#4D1568" }}
                ></div>
                <span
                  style={{
                    textDecoration: groupFilter.includes("Gestalt")
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
        <div className="filter-box filter-status">
          <h3>Filter by Status</h3>
          <ul className="filter-list">
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => statusFilterHandler(e)}
              >
                <div className="filter-color"></div>
                <span
                  style={{
                    textDecoration: statusFilter.includes("Active")
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
                onClick={(e) => statusFilterHandler(e)}
              >
                <div className="filter-color"></div>
                <span
                  style={{
                    textDecoration: statusFilter.includes("Retired")
                      ? "underline"
                      : "none",
                  }}
                >
                  Retired
                </span>
              </div>
            </li>
            <li className="filter-li">
              <div
                className="filter-li-group"
                onClick={(e) => statusFilterHandler(e)}
              >
                <div className="filter-color"></div>
                <span
                  style={{
                    textDecoration: statusFilter.includes("Pretired")
                      ? "underline"
                      : "none",
                  }}
                >
                  Pretired
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="flex-between space-below">
          <div className="filters">
            <div className="filter-scraps">
              {filterItems}
              {filterStatusItems}
            </div>
          </div>
          <div className="tx-search">
            <input
              type="search"
              id="site-search"
              name="search"
              placeholder="search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {/* <div
              className="search-button"
            >
              search
            </div> */}
          </div>
        </div>
        <table className="tx-list">
          <tr className="tx-head-col">
            <th width="150px">Name</th>
            <th width="400px">Description</th>
            <th width="150px">Group</th>
            <th width="100px">Level</th>
            <th width="100px">Points</th>
            <th width="100px">Completed</th>
          </tr>
          {searchInput.length === 0 ? masterFilter : searchHandler}
        </table>
        <div className="tx-navlinks">
          <Link>Next</Link>
          <Link>Last</Link>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
