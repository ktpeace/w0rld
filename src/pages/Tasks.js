// todo
// fix how filters apply after pagination
// make default sort by date
// useState of logged in & level to check whether can sort by active/retired
// selected filters with X's at top are on bg of ripped paper, maybe with typewriter-style font
// colors beside groups to be round and look like gems in glass buttons (use images marbled/gem stuff not colors)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tasks } from "../data/tasks-data";
// import { groups } from "../data/groups-data";
// import pixie from "../images/pixie-avatar.jpeg";

const Tasks = () => {
  const [groupFilter, setGroupFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sorter, setSorter] = useState(null);
  const [sortVal, setSortVal] = useState("");
  const [tableRange, setTableRange] = useState([]);

  // PAGINATION
  const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  const useTable = (data, page, rowsPerPage) => {
    const [slice, setSlice] = useState([]);

    useEffect(() => {
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);
      const slice = sliceData(data, page, rowsPerPage);
      setSlice([...slice]);
    }, [data, setTableRange, page, setSlice]);

    return { slice, range: tableRange };
  };

  const [page, setPage] = useState(1);
  const { slice } = useTable(tasks, page, 20);

  const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
      if (slice.length < 1 && page !== 1) {
        setPage(page - 1);
      }
    }, [slice, page, setPage]);
    return (
      <div className="tx-footer">
        {range.map((el, index) => (
          <button
            key={index}
            className="tx-footer-button"
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      </div>
    );
  };

  // RAW TABLE MAPPING (PRE-FILTERING/SEARCHING)
  const dummyDataMapper = slice.map((task) => {
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
        className="tx-row"
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

  // FILTERING
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

  const clearAllFilters = () => {
    setGroupFilter([]);
    setStatusFilter([]);
  };

  // SEARCHING
  const searchHandler = masterFilter.filter((item) => {
    return Object.values(item.props)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  // SORTING (SETTING ARROWS)
  const sortHandler = (e) => {
    const text = e.currentTarget.innerText;
    const arrow = text[text.length - 1];
    const header = text.slice(0, text.length - 2);
    const allArrows = document.getElementsByClassName("arrow");
    console.log(allArrows);
    for (let i = 0; i < allArrows.length; i++) {
      allArrows[i].innerText = "↕";
    }
    if (arrow === "↕") {
      // sort data descending by header
      setSorter("↓");
      setSortVal(header.toLowerCase());
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↓</span>`;
    } else if (arrow === "↓") {
      // sort data ascending by header
      setSorter("↑");
      setSortVal(header.toLowerCase());
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↑</span>`;
    } else if (arrow === "↑") {
      // remove sort
      setSorter(null);
      setSortVal("");
      e.currentTarget.innerHTML = `${header} <span title="sort" class="arrow">↕</span>`;
    }
  };

  // SORTING
  let tableData;

  if (searchInput.length === 0) {
    if (sorter) {
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
              {groupFilter.length ? (
                <span className="filter-scrap" onClick={clearAllFilters}>
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
          <TableFooter
            range={tableRange}
            slice={slice}
            setPage={setPage}
            page={page}
          ></TableFooter>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
