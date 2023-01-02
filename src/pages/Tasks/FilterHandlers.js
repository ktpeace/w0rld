// Set/remove filters on click
const FilterClickHandler = (event, filters, setFilters) => {
  const name = event.currentTarget.innerText;
  if (filters.includes(name)) {
    setFilters(filters.filter((filterName) => filterName !== name));
  } else {
    setFilters((prev) => [...prev, name]);
  }
};

// Add/remove filter semi-buttons
const FilterScraps = ({ filters, setFilters }) =>
  filters.map((name) => {
    return (
      <span
        className="filter-scrap filter-scrap-light"
        onClick={(event) => FilterClickHandler(event, filters, setFilters)}
        key={name}
      >
        {name}
      </span>
    );
  });

// Remove level 3+ filter (level check logic before function call in Tasks)
const FilterByUserStatus = (sortedTasks) => {
  return sortedTasks.filter((task) => task.status !== "Pretired");
};

// Apply filters to tasks
// this filter works by separating out groups + statuses so they can both apply at once. Could make them separate filter states from the start if the separation also becomes needed elsewhere
const FilterTasks = (taskArray, filters) => {
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

// Search tasks
const SearchTasks = (tasks, searchInput) => {
  return tasks.filter((task) => {
    return Object.values(task)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
};

export {
  FilterClickHandler,
  FilterScraps,
  FilterByUserStatus,
  FilterTasks,
  SearchTasks,
};
