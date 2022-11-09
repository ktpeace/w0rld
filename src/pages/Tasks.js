// todo
// on click on a column, sort table by that column ↑↓
// selected filters with X's at top are on bg of ripped paper, maybe with typewriter-style font
// useState of logged in & level to check whether can sort by active/retired
// grey or color task on hover
// make overflow be on 'next'
// add a "clear all" for filters
// colors beside groups to be round and look like gems in glass buttons (use images marbled/gem stuff not colors)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tasks } from "../data/tasks-data";
import { groups } from "../data/groups-data";
import pixie from "../images/pixie-avatar.jpeg";
import { type } from "@testing-library/user-event/dist/type";

const Tasks = () => {
  const [groupFilter, setGroupFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sorter, setSorter] = useState(null);
  const [sortVal, setSortVal] = useState("");
  // const [searchClicked, setSearchClicked] = useState(false);

  const dummyDataMapper = tasks.map((task) => {
    return (
      <tr
        key={task.name}
        status={task.status}
        name={task.name}
        description={task.description}
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
        <td className="tx-desc">{task.description}</td>
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
    return Object.values(item.props)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const sortHandler = (e) => {
    const text = e.currentTarget.innerText;
    const arrow = text[text.length - 1];
    const header = text.slice(0, text.length - 2);
    const allArrows = document.getElementsByClassName("arrow");
    console.log(allArrows);
    for (let i = 0; i < allArrows.length; i++) {
      allArrows[i].innerText = "↕";
    }
    // allArrows.forEach((span) => (span.innerText = "↕"));
    if (arrow === "↕") {
      setSorter("↓");
      setSortVal(header.toLowerCase());
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↓</span>`;
      // sort data descending by header
    } else if (arrow === "↓") {
      setSorter("↑");
      setSortVal(header.toLowerCase());
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↑</span>`;
      // sort data ascending by header
    } else if (arrow === "↑") {
      setSorter(null);
      setSortVal("");
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↕</span>`;
      // remove sort
    }
  };

  let tableData;

  if (searchInput.length === 0) {
    if (sorter) {
      console.log(masterFilter[0].props);
      const isNum =
        sortVal === "level" || sortVal === "points" || sortVal === "completed";
      if (sorter === "↓") {
        if (isNum) {
          tableData = masterFilter.sort(
            (a, b) => a.props[sortVal] - b.props[sortVal]
          );
        } else {
          tableData = masterFilter.sort((a, b) =>
            a.props[sortVal].localeCompare(b.props[sortVal])
          );
        }
      } else {
        if (isNum) {
          tableData = masterFilter.sort(
            (a, b) => b.props[sortVal] - a.props[sortVal]
          );
        } else {
          tableData = masterFilter.sort((a, b) =>
            b.props[sortVal].localeCompare(a.props[sortVal])
          );
        }
      }
    } else {
      tableData = masterFilter;
    }
  } else {
    if (sorter) {
      tableData = searchHandler.sort((a, b) =>
        a.props[sortVal].localeCompare(b.props[sortVal])
      );
    } else {
      tableData = searchHandler;
    }
  }

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
                <div className="filter-color status-filter-color"></div>
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
                <div className="filter-color status-filter-color"></div>
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
                <div className="filter-color status-filter-color"></div>
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
          <thead>
            <tr className="tx-head-col">
              <th width="150px">
                <div onClick={(e) => sortHandler(e)}>
                  Name{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="400px">
                <div onClick={(e) => sortHandler(e)}>
                  Description{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="150px">
                <div onClick={(e) => sortHandler(e)}>
                  Group{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="100px">
                <div onClick={(e) => sortHandler(e)}>
                  Level{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="100px">
                <div onClick={(e) => sortHandler(e)}>
                  Points{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
              <th width="100px">
                <div onClick={(e) => sortHandler(e)}>
                  Completed{" "}
                  <span title="sort" className="arrow">
                    ↕
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
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
